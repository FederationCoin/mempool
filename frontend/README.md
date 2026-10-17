# FederationCoin explorer frontend

Angular UI for the FederationCoin mempool fork. Pair it with the [backend](../backend/) in this repository. Do not proxy https://mempool.space; that is a different chain and a trademarked product.

Jump to a section:
- [Local frontend + local backend](#local-frontend--local-backend)
- [Build](#build)
- [Translations](#translations)

## Local frontend + local backend

Set up the [backend](../backend/) first (testnet RPC **35332**).

Use Node.js 20.x and npm 9.x or newer.

```
cd frontend
npm install
npm run config:defaults:mempool
npm run serve
```

The UI is at http://localhost:4200/ and talks to your local backend. Default network is **testnet** (`ROOT_NETWORK=testnet`). Dummy MAIN is labeled placeholder at `/mainnet` and is not launched.

Cypress still has Bitcoin-era example addresses in `cypress/`. Do not skip those files; they are not the v1 gate until there is a live FederationCoin explorer with real history.

## Build

```
cd frontend
npm install
npm run build
```

Put `dist/` on a web server. Sample nginx files are in this repository; operating nginx/TLS is out of scope.

## Translations

Upstream Transifex project still has Bitcoin-era copy. This fork only changes English chrome (title, banner, ticker GFCN). Do not treat remaining “Bitcoin” FAQ strings as FederationCoin docs.
