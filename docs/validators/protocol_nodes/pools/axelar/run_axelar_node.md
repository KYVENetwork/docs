---
sidebar_position: 3
---

# Run an Axelar node

The Axelar Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Axelar node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install Axelar full node

The Axelar binary with the version `v0.13.6` has to be installed. There are two ways to install and run the binary:

### 1. Install Axelar Binary manually

You can follow the official installation instructions [here](https://docs.axelar.dev/node/join-genesis) or download the binary directly from [here](https://github.com/axelarnetwork/axelar-core/releases/tag/v0.13.6).

You can verify the successful installation with

```
./axelard version
0.13.6
```

After the successful installation, you need to set up the axelard config. First choose a moniker and initialize everything:

```bash
./axelard init <your-moniker> --chain-id axelar-dojo-1
```

To download and setup the genesis file execute the following command:

```bash
wget -qO- https://s3.eu-central-1.amazonaws.com/files.kyve.network/infrastructure/axelar/genesis.json.gz | zcat > ~/.axelar/config/genesis.json
```

To enable the start of the syncing process, a seed node needs to be added into

`~/.axelar/config/config.toml`

```toml
seeds = "ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:15156,3d67d0646cddcc203b41434aceea64ade22ba6fc@k8s-mainnet-axelarco-79b464ee93-f03cb16c57cf7cb2.elb.us-east-2.amazonaws.com:26656,609504b517f88f628e98d4a918ffc69e9654b451@65.108.192.147:26656,691101434ca4016b28e6a9943da2ad6838b80685@axelar-seed.pops.one:26656,44596cd8c8fd80be909a5968ac4ba6651d840b36@axelar-seed.validatrium.com:6969"
```

:::info
You can also add persistent_peers from Polkachu to ensure that you will actually find peers where you can sync with the network: https://polkachu.com/live_peers/axelar
:::

### Configuration

Due to the size of the `block_results` response, it is **required** to set the following in your `~/.axelar/config/config.toml`:

```toml
timeout_broadcast_tx_commit = "120s"
```

For efficient pruning, the following settings are recommended to decrease the disk usage:

`~/.axelar/config/config.toml`

```toml
[tx_index]

indexer = "null"
```

`~/.axelar/config/app.toml`

```toml
pruning = "everything"

index-events = [""]
```

Finally, the node can be started:

```bash
./axelar start --x-crisis-skip-assert-invariants
```

:::caution
**ATTENTION**: To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>. How to set it up can be found [here](https://docs.axelar.io/validators/running-a-node/cosmovisor).
:::

To start the Axelar node with the cosmovisor, run:

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
