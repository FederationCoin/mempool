#!/bin/sh
# Public explorer is a single host. Do not query the Retropex
# nodeNNN.{fmt,va1,fra,tk7}.mempool.space grid.
set -eu

URL="https://mempool.federationcoin.org/api/v1/backend-info"
BODY=$(curl -fsS "$URL") || {
  echo "failed to fetch $URL" >&2
  exit 1
}

echo "$BODY"

# git / backend fields when the JSON is object-shaped
if command -v jq >/dev/null 2>&1; then
  echo "$BODY" | jq '{gitCommit, hostname, version, lightning, backend}' || true
fi

# Retropex multi-region grid -- not used:
# for LOCATION in fmt va1 fra tk7; do
#   for NODE in 201 202 203 204 205 206; do
#     echo $(curl -sk https://node$NODE.$LOCATION.mempool.space/api/v1/backend-info)
#   done
# done
