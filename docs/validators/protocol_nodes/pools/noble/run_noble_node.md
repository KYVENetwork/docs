---
sidebar_position: 3
---

# Run an Noble node

The Noble Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Noble node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install Noble full node

The Noble binary with the version `v1.0.0` has to be installed.

You can follow the official installation instructions [here](https://docs.nobleassets.xyz/network/running) or build from source [here](https://github.com/noble-assets/noble/releases/tag/v1.0.0).

:::danger
If you are building from source please use the specified go version in the go.mod file, else there is the danger of receiving vote slashes.

**v1.0.0 -> go19**<br/>
**v2.0.0 -> go19**<br/>
**v3.0.0 -> go19**<br/>
**v3.1.0 -> go19**<br/>
**v4.0.1 -> go21**
:::

The recommended upgrade history can be found here: https://docs.nobleassets.xyz/network/upgrades

You can verify the successful installation with

```
./nobled version
1.0.0
```

After the successful installation, you need to set up the nobled config. First choose a moniker and initialize everything:

```bash
./nobled init <your-moniker> --chain-id noble-1
```

To download and setup the genesis file execute the following command:

```bash
wget https://raw.githubusercontent.com/strangelove-ventures/noble-networks/main/mainnet/noble-1/genesis.json -O ~/.noble/config/genesis.json
```

To enable the start of the syncing process, a seed node needs to be added into

`~/.noble/config/config.toml`

```toml
seeds = "20e1000e88125698264454a884812746c2eb4807@seeds.lavenderfive.com:21590"
```

:::info
You can also add persistent_peers from Polkachu to ensure that you will actually find peers where you can sync with the network: https://polkachu.com/live_peers/noble
:::

### Configuration

Due to the size of the `block_results` response, it is **required** to set the following in your `~/.noble/config/config.toml`:

```toml
timeout_broadcast_tx_commit = "120s"
```

For efficient pruning, the following settings are recommended to decrease the disk usage:

`~/.noble/config/config.toml`

```toml
[tx_index]

indexer = "null"
```

`~/.noble/config/app.toml`

```toml
pruning = "everything"

index-events = [""]
```

Finally, the node can be started:

```bash
./nobled start --x-crisis-skip-assert-invariants
```

:::caution
To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>
:::

To start the Noble node with the cosmovisor, run:

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
