---
sidebar_position: 3
---

# Run an Celestia node

The Celestia Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Celestia node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install Celestia full node

The Celestia binary with the version `v1.7.0` has to be installed.

You can follow the official installation instructions [here](https://docs.celestia.org/nodes/consensus-node) or build from source [here](https://github.com/celestiaorg/celestia-app/releases/tag/v1.7.0).

:::danger
If you are building from source please use the specified go version in the go.mod file, else there is the danger of receiving vote slashes.

**v1.7.0 -> go22**
:::

You can verify the successful installation with

```
./celestia-appd version
1.7.0
```

After the successful installation, you need to set up the celestia-appd config. First choose a moniker and initialize everything:

```bash
./celestia-appd init <your-moniker> --chain-id celestia
```

To download and setup the genesis file execute the following command:

```bash
wget https://raw.githubusercontent.com/celestiaorg/networks/master/celestia/genesis.json -O ~/.celestia-app/config/genesis.json
```

To enable the start of the syncing process, a seed node needs to be added into

`~/.celestia-app/config/config.toml`

```toml
seeds = "6de4ce5baa9d2bed33c0c53b9518b907cfaab33b@65.108.128.201:11656"
```

:::info
You can also add persistent_peers from Polkachu to ensure that you will actually find peers where you can sync with the network: https://polkachu.com/live_peers/celestia
:::

### Configuration

By default, Celestia disabled the storage of block results, therefore it is **required** to set the following in your `~/.celestia-app/config/config.toml`:

```toml
abci_discard_abci_responses = false
```

Due to the size of the `block_results` response, it is **required** to set the following in your `~/.celestia-app/config/config.toml`:

```toml
timeout_broadcast_tx_commit = "120s"
```

For efficient pruning, the following settings are recommended to decrease the disk usage:

`~/.celestia-app/config/config.toml`

```toml
[tx_index]

indexer = "null"
```

`~/.celestia-app/config/app.toml`

```toml
pruning = "everything"

index-events = [""]
```

Finally, the node can be started:

```bash
./celestia-appd start --x-crisis-skip-assert-invariants
```

:::caution
To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>
:::

To start the Celestia node with the cosmovisor, run:

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
