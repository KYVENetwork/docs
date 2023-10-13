---
sidebar_position: 3
---

# Run an Archway node

The Archway Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Archway node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install Archway full node

The Archway binary with the version `v1.0.0` has to be installed. There are two ways to install and run the binary:

### 1. Install Archway Binary manually
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
wget -qO- https://github.com/archway-network/networks/raw/main/archway-1/genesis/genesis.json.gz | zcat > ~/.archway/config/genesis.json
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
./archway start --x-crisis-skip-assert-invariants
```

:::caution
To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>. How to set it up can be found [here](https://docs.archway.io/validators/running-a-node/cosmovisor).
:::

To start the Archway node with the cosmovisor, run:

```bash
cosmovisor run start --x-crisis-skip-assert-invariants
```

:::info
Regarding __SoftwareUpgrades__ of the node, we recommend the official [upgrade path](https://docs.axelar.dev/node/join-genesis#follow-the-upgrade-path) by Axelar
:::

### 2. Archway Docker Container

To get the latest Archway node image, run:

```bash
docker pull kyve/archway:latest
```

To start the node, simply run:

```bash
docker run --restart unless-stopped -p 0.0.0.0:26657:26657 kyve/archway --x-crisis-skip-assert-invariants
```

:::info
To prevent data loss, it is recommended to use a Docker volume in the running container.
:::

Example: 
```bash
# create the volume named archwayd and select an empty directory:
docker volume create --driver local \
    --opt type=none \
    --opt device=<path_to_empty_directory> \
    --opt o=bind \
    archwayd

# start the container and map the volume to the container
docker run -d --restart unless-stopped \
    -p 0.0.0.0:26657:26657 \
    -v archwayd:/root/.archway \
    kyve/archway --x-crisis-skip-assert-invariants
```

:::info
When creating the volume, you must ensure that the <path_to_empty_directory> folder is empty and writable by your docker service.
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

:::info
To save storage space you can start pruning blocks manually after they have been archived
by the pool since after that they are not needed anymore.
:::