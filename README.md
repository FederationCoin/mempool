# FederationCoin explorer

Block explorer for FederationCoin. AGPL-3.0-or-later. Experimental. No price promise. Not legal, tax, or securities advice. Product voice: [federationcoin.org](https://federationcoin.org).

This fork does **not** use Mempool Holdings trademarks (mempool.space, logos, Mempool Accelerator, Mempool Enterprise, and the other marks listed in [LICENSE](LICENSE)).

## For users

Public explorer: [mempool.federationcoin.org](https://mempool.federationcoin.org). **Testnet is the public chain.** Point a self-hosted instance at `federationcoind -testnet`.

| | Testnet (use this) | Dummy MAIN (placeholder, not launched) |
| --- | --- | --- |
| RPC | 35332 | 4094 |
| P2P | 35333 | 4095 |
| Bech32 HRP | `tfcn` | `fcn` |

Dummy MAIN in the UI is **not launched**. Do not mine default main as if it went live. Address lookup needs an Electrum/electrs server later; the default Docker stack uses `MEMPOOL_BACKEND=none` (blocks and mempool via RPC only).

If you host a modified instance, keep this tree public (AGPL network clause). Corresponding source: [github.com/FederationCoin/mempool](https://github.com/FederationCoin/mempool).

Build and run **this** tree. Do not use mempool.space, Mempool Enterprise, or `ghcr.io/retropex` as the product image.

- Docker: [`docker/`](./docker/) (default RPC **35332**, `MEMPOOL_NETWORK=testnet`)
- Manual: [`backend/`](./backend/) and [`frontend/`](./frontend/)

## For developers

Forked from [Retropex/mempool](https://github.com/Retropex/mempool) (itself from [mempool/mempool](https://github.com/mempool/mempool)). Origin is `git@github.com:FederationCoin/mempool.git`. Mainline is `federationcoin`. GitHub is detached from that fork; **never push** `upstream` (`Retropex/mempool`) or mempool/mempool.

The node this talks to is [FederationCoin/FederationCoin](https://github.com/FederationCoin/FederationCoin) on `29.x-federationcoin`. Runtime images go only to **private Amazon ECR**, not Docker Hub / GHCR / `public.ecr.aws`.

### Clone and build

See [`docker/README.md`](docker/README.md) for compose against `federationcoind -testnet`. Frontend and backend still carry their own READMEs for the npm toolchain.

### Branching

Work on a branch off `federationcoin`. Open a same-repo pull request; a human merges. Do not push straight to mainline. Current work branch: `get-to-mainnet`.

### Release

Frontend and backend `package.json` versions are independent of git tags. Explorer ship path today is private ECR + SSM compose, not a GitHub Release. No `npm publish`. Process: [golive notes](https://github.com/ldelarua/workspace-FederationCoin/blob/master/docs/golive-notes.md).

### Quality

Code quality checks and metrics will be added over time.
