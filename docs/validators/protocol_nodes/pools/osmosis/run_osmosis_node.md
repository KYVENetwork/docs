---
sidebar_position: 3
---

# Run an Osmosis node

The Osmosis Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Osmosis node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install Osmosis full node

The Osmosis binary with the version `v3.1.0` has to be installed. There are two ways to install and run the binary:

You can follow the official installation instructions [here](https://docs.osmosis.zone/networks/join-mainnet) or download the binary directly from [here](https://github.com/osmosis-labs/osmosis/releases/tag/v3.1.0).

You can verify the successful installation with

```
./osmosisd version
3.1.0
```

After the successful installation, you need to set up the osmosisd config. First choose a moniker and initialize everything:

```bash
./osmosisd init <your-moniker> --chain-id osmosis-1
```

To download and setup the genesis file execute the following command:

```bash
wget -O ~/.osmosisd/config/genesis.json https://github.com/osmosis-labs/networks/raw/main/osmosis-1/genesis.json
```

Peers can be added via this addrbook which can be retrieved here:

```bash
wget https://dl2.quicksync.io/json/addrbook.osmosis.json
mv addrbook.osmosis.json ~/.osmosisd/config/addrbook.json
chmod 666 ~/.osmosisd/config/addrbook.json
```

**TIP**: You can also add persistent_peers from Polkachu to ensure that you will actually find peers where you can sync with the network: https://polkachu.com/live_peers/osmosis

### Configuration
Due to the size of the `block_results` response, it is __required__ to set the following in your `~/.osmosisd/config/config.toml`:

```toml
timeout_broadcast_tx_commit = "120s"
```

For efficient pruning, the following settings are recommended to decrease the disk usage:

`~/.osmosisd/config/config.toml`

```toml
[tx_index]

indexer = "null"
```

`~/.osmosisd/config/app.toml`

```toml
pruning = "everything"

index-events = [""]
```

Finally, the node can be started:

```bash
./osmosisd start --x-crisis-skip-assert-invariants
```

:::caution
**ATTENTION**: To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>. How to set it up can be found [here](https://docs.osmosis.zone/networks/join-mainnet#set-up-cosmovisor).
:::

To start the Osmosis node with the cosmovisor, run:

```bash
cosmovisor run start --x-crisis-skip-assert-invariants
```

:::warning
**WARNING**: Because Osmosis had 3 hard forks (off-chain software upgrades), it's strongly recommended to disable binary downloads with `DAEMON_ALLOW_DOWNLOAD_BINARIES=false`. More information about managing the hard forks can be found [here](#managing-hard-forks)
:::


## Verifying the completed node setup

After the successful start of the node you have to sync blocks until the latest summary of the pool is reached. For example
if the latest pool summary is 1,000,000 you can check if the node has synced the blocks until
that height with:

```bash
curl http://localhost:26657/block?height=1000000
```

If it returns a valid block response you can continue with starting the actual KYVE protocol validator
and start participating in the validation and archival process.

**TIP**: to save storage space you can start pruning blocks manually after they have been archived
by the pool since after that they are not needed anymore.

## Managing hard forks

Osmosis had three software upgrades which were executed without submitting `SoftwareUpgrade` governance proposals. As a result, the cosmovisor does not recognize these necessary upgrades, which is why the node can no longer sync from a specific height. These hard forks occured at the following heights:

- [v5 to v6](https://www.mintscan.io/osmosis/proposals/103) at `2464000` 
- [v7 to v8](https://www.mintscan.io/osmosis/proposals/228) at `4402000` 
- [v9 to v10](https://github.com/osmosis-labs/osmosis/blob/main/networks/osmosis-1/upgrades/v10/guide.md) at `4713065`

To prevent longer syncing breaks or other issues, it's recommended to use the cosmovisor with already downloaded binaries. After that, you need to move 
- the `osmosisd` <strong>v6</strong> binary in the `upgrades/v5/bin` directory,
- the `osmosisd` <strong>v8</strong> binary in the `upgrades/v7/bin` directory and 
- the `osmosisd` <strong>v10</strong> binary in the `upgrades/v9/bin` directory.

