#!/bin/sh
# Public explorer is a single host. Do not query the Retropex
# nodeNNN.{fmt,va1,fra,tk7}.mempool.space grid.
# Do not use origin.mempool.federationcoin.org (CloudFront origin, HTTP, not public).
set -eu

URL="https://mempool.federationcoin.org/api/v1/blocks/tip/height"
BODY=$(curl -fsS "$URL") || {
  echo "failed to fetch $URL" >&2
  exit 1
}

# Fail if the body is not a non-negative integer.
case "$BODY" in
  ''|*[!0-9]*)
    echo "tip height is not a non-negative integer: $BODY" >&2
    exit 1
    ;;
esac

echo "tip height (mempool.federationcoin.org): $BODY"

# Retropex multi-region grid -- not used:
# BASE_HEIGHT=$(curl -sk https://node202.tk7.mempool.space/api/v1/blocks/tip/height)
# for LOCATION in fmt va1 fra tk7; do
#   for NODE in 201 202 203 204 205 206; do
#     NODE_HEIGHT=$(curl -sk https://node$NODE.$LOCATION.mempool.space/api/v1/blocks/tip/height)
#     ...
#   done
# done
