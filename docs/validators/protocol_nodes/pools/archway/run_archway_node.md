---
sidebar_position: 3
---

# Run an Archway node

The Archway Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Archway node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install Archway full node

The Archway binary with the version `v1.0.0` has to be installed.

You can follow the official installation instructions [here](https://docs.archway.io/validators/running-a-node/join-a-network/sync-from-genesis) or download the binary directly from [here](https://github.com/archway-network/archway/releases/tag/v1.0.0).

You can verify the successful installation with

```
./archwayd version
1.0.0
```

After the successful installation, you need to set up the archwayd config. First choose a moniker and initialize everything:

```bash
./archwayd init <your-moniker> --chain-id archway-1
```

To download and setup the genesis file execute the following command:

```bash
wget -qO- https://github.com/archway-network/networks/raw/main/archway/genesis/genesis.json.gz | zcat > ~/.archway/config/genesis.json
```

To enable the start of the syncing process, a seed node needs to be added into

`~/.archway/config/config.toml`

```toml
seeds = "3ba7bf08f00e228026177e9cdc027f6ef6eb2b39@35.232.234.58:26656"
```

:::info
You can also add persistent_peers from Polkachu to ensure that you will actually find peers where you can sync with the network: https://polkachu.com/live_peers/archway
:::

### Configuration
Due to the size of the `block_results` response, it is __required__ to set the following in your `~/.archway/config/config.toml`:

```toml
timeout_broadcast_tx_commit = "120s"
```

For efficient pruning, the following settings are recommended to decrease the disk usage:

`~/.archway/config/config.toml`

```toml
[tx_index]

indexer = "null"
```

`~/.archway/config/app.toml`

```toml
pruning = "everything"

index-events = [""]
```

Finally, the node can be started:

```bash
./archwayd start --x-crisis-skip-assert-invariants
```

:::caution
To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>. How to set it up can be found [here](https://docs.archway.io/validators/running-a-node/cosmovisor).
:::

To start the Archway node with the cosmovisor, run:

```bash
cosmovisor run start --x-crisis-skip-assert-invariants
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