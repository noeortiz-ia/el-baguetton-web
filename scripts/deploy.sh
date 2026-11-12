#!/usr/bin/env bash
# Sube el sitio de El Baguetton Express (varias páginas) por FTP y verifica en vivo.
# Uso:
#   FTP_HOST=... FTP_USER=... FTP_PASS=... ./scripts/deploy.sh
# Requiere lftp. No guarda credenciales en disco.

set -euo pipefail

: "${FTP_HOST:?falta FTP_HOST}"
: "${FTP_USER:?falta FTP_USER}"
: "${FTP_PASS:?falta FTP_PASS}"

SITE_DIR="${SITE_DIR:-$HOME/Dev/elbaguetton-web}"
DOMAIN="${DOMAIN:-https://elbaguettonexpress.com.mx}"

cd "$SITE_DIR"

echo "== comprobando que la cuenta cae en el docroot"
listing=$(lftp -u "$FTP_USER","$FTP_PASS" "ftp://$FTP_HOST" \
  -e "set ftp:ssl-allow no; cls -1; bye" 2>&1 || true)
if ! printf '%s' "$listing" | grep -q 'index.html'; then
  echo "ERROR: la cuenta FTP no ve index.html; está encerrada en otra carpeta." >&2
  printf '%s\n' "$listing" >&2
  exit 1
fi

echo "== build"
npm run build

echo "== subiendo"
lftp -u "$FTP_USER","$FTP_PASS" "ftp://$FTP_HOST" -e "
set ftp:ssl-allow no; set net:timeout 30; set net:max-retries 3;
mirror -R --delete --verbose=0 dist/assets/ assets;
mirror -R --delete --verbose=0 dist/img/ img;
mirror -R --delete --verbose=0 dist/feed/ feed;
mirror -R --delete --verbose=0 dist/menu/ menu;
mirror -R --delete --verbose=0 dist/galeria/ galeria;
mirror -R --delete --verbose=0 dist/promociones/ promociones;
mirror -R --delete --verbose=0 dist/ubicacion/ ubicacion;
put dist/index.html -o index.html;
put dist/sitemap.xml -o sitemap.xml;
put dist/robots.txt -o robots.txt;
put dist/privacidad.html -o privacidad.html;
put dist/bg.mp4 -o bg.mp4;
put dist/bg-mobile.mp4 -o bg-mobile.mp4;
mput dist/favicon*.png dist/favicon.ico dist/apple-touch-icon.png;
bye"

echo "== verificando"
cb=$(date +%s)
local_js=$(grep -oE 'assets/(index|main)-[A-Za-z0-9_-]+\.js' dist/index.html | head -1 || true)
remote_js=$(curl -s "$DOMAIN/?cb=$cb" | grep -oE 'assets/(index|main)-[A-Za-z0-9_-]+\.js' | head -1 || true)
echo "bundle local:  ${local_js:-no encontrado}"
echo "bundle remoto: ${remote_js:-no encontrado}"
if [ -n "$local_js" ] && [ "$local_js" != "$remote_js" ]; then
  echo "AVISO: el bundle servido no coincide con el compilado"
fi

for ruta in "" menu/ promociones/ galeria/ ubicacion/ feed/meta-catalogo.csv feed/google-merchant.xml sitemap.xml; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "$DOMAIN/$ruta?cb=$cb")
  printf '%-28s %s\n' "/$ruta" "$code"
  [ "$code" = "200" ] || { echo "ERROR: /$ruta respondió $code" >&2; exit 1; }
done

echo "página declarada en /menu/: $(curl -s "$DOMAIN/menu/?cb=$cb" | grep -o '<body data-page="[^"]*"')"
echo "OK -> $DOMAIN"
