---
sidebar_position: 3
---

# Run a dYdX node

The dYdX Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the dYdX node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install dYdX full node

The dYdX binary with the version `v1.0.1` has to be installed.

You can follow the official installation instructions [here](https://docs.dydx.exchange/validators/running_full_node) or download the binary directly from [here](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv1.0.1).

:::danger
If you are building from source please use the specified go version in the go.mod file, else there is the danger of receiving vote slashes.

**For dydxprotocold v1.0.1 it is go21**
:::

You can verify the successful installation with

```
./dydxprotocold version
1.0.1
```

After the successful installation, you need to set up the dydxprotocold config. First choose a moniker and initialize everything:

```bash
./dydxprotocold init <your-moniker> --chain-id dydx-mainnet-1
```

To download and setup the genesis file execute the following command:

```bash
wget -qO- genesis.json https://snapshots.polkachu.com/genesis/dydx/genesis.json | zcat > ~/.dydxprotocol/config/genesis.json
```

To enable the start of the syncing process, a seed node needs to be added into

`~/.dydxprotocol/config/config.toml`

```toml
seeds = "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:23856"
```

### Configuration

Due to the size of the `block_results` response, it is **required** to set the following in your `~/.dydxprotocol/config/config.toml`:

```toml
timeout_broadcast_tx_commit = "120s"
```

For efficient pruning, the following settings are recommended to decrease the disk usage:

`~/.dydxprotocol/config/config.toml`

```toml
[tx_index]

indexer = "null"
```

`~/.dydxprotocol/config/app.toml`

```toml
pruning = "everything"

index-events = [""]
```

Finally, the node can be started:

```bash
./dydxprotocold start --x-crisis-skip-assert-invariants --non-validating-full-node=true
```

:::caution
To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>. How to set it up can be found [here](https://docs.cosmos.network/main/build/tooling/cosmovisor).
:::

To start the dYdX node with the cosmovisor, run:

```bash
cosmovisor run start --x-crisis-skip-assert-invariants --non-validating-full-node=true
```

## Verifying the completed node setup

After the successful start of the node you have to sync blocks until the latest summary of the pool is reached. For example
if the latest pool summary is 1,000,000 you can check if the node has synced the blocks until
that height with:

```bash
curl http://localhost:26657/block?height=1000000
```

If it returns a valid block response you can continue with starting the actual KYVE protocol validator
and start participating in the validation and archival process.

:::info
To save storage space you can start pruning blocks manually after they have been archived
by the pool since after that they are not needed anymore.
:::
