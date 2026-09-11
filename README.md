# FederationCoin explorer (mempool fork)

AGPL-3.0-or-later fork of [Retropex/mempool](https://github.com/Retropex/mempool) (itself from [mempool/mempool](https://github.com/mempool/mempool)) that supports **FederationCoin**.

Corresponding source for what you run: [github.com/FederationCoin/mempool](https://github.com/FederationCoin/mempool). Keep this tree public if you host a modified instance (AGPL network clause). See [LICENSE](LICENSE) for upstream copyright. This fork does **not** use Mempool Holdings trademarks (mempool.space, logos, Mempool Accelerator, Mempool Enterprise, and the other marks listed in LICENSE).

Not Bitcoin. Not a CBDC. Experimental. No price promise. Not legal, tax, or securities advice. Product voice: [federationcoin.org](https://federationcoin.org).

## Networks

**Testnet is the public chain.** Point this explorer at `federationcoind -testnet`.

| | Testnet (use this) | Dummy MAIN (placeholder, not launched) |
| --- | --- | --- |
| RPC | 35332 | 4094 |
| P2P | 35333 | 4095 |
| Bech32 HRP | `tfcn` | `fcn` |

Dummy MAIN identity in the UI is **not launched**. Ports, genesis, and magic on default main are placeholders and will change at announcement. Do not mine default main as if it went live. Do not paste captured launch MAIN values into this repo.

Address lookup needs an Electrum/electrs server later. The default Docker stack uses `MEMPOOL_BACKEND=none` (blocks and mempool via RPC only).

## Run

Build and run **this** tree. Do not use mempool.space, Mempool Enterprise, or `ghcr.io/retropex` as the product image.

- Docker: [`docker/`](./docker/) (default RPC **35332**, `MEMPOOL_NETWORK=testnet`)
- Manual: [`backend/`](./backend/) and [`frontend/`](./frontend/)

The node this talks to is Knots-based FederationCoin, branch `29.x-federationcoin`: [github.com/FederationCoin/FederationCoin](https://github.com/FederationCoin/FederationCoin/tree/29.x-federationcoin).
