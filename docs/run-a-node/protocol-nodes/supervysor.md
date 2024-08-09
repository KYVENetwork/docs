---
sidebar_position: 4
---

<p align="center">
  <img style={{borderRadius: '10px'}} src="/img/supervysor/banner.png" />
</p>

<p align="center">
<strong>Run your KYVE Protocol node as efficient as possible</strong>
</p>

## Requirements

The supervysor manages the process of the data source node. First of all, it should be ensured that this node can run successfully, which can be tested by trying to sync the first `~1,000` blocks. In addition, to successfully participate in a KYVE data pool, it is necessary to create a protocol validator and join a data pool. Further information can be found [**here**](/docs/run-a-node/protocol-nodes/overview.md).

Make sure your Go version is at least ```1.20```.

## Installation


import SupervysorLatestVersion from '/src/components/supervysor/LatestSupervysorVersion';

To install the latest version <strong><SupervysorLatestVersion /></strong> of the supervysor, run the following command:

```bash
go install github.com/KYVENetwork/supervysor/cmd/supervysor@latest
```

To install a specific version, run:

```bash
go install github.com/KYVENetwork/supervysor/cmd/supervysor@vX.X.X
```

To verify the installation simply run `supervysor version`. To build from source visit the repository on [GitHub](https://github.com/KYVENetwork/supervysor).

## What is the supervysor?
Participating in a KYVE data pool such as CosmosHub or Osmosis requires running two nodes: the KYVE protocol node and the data source node (e.g., full node of CosmosHub, Osmosis, etc.). However, running these full nodes in parallel can result in high storage requirements (approximately >10TB for Osmosis), leading to increased operational costs and inefficient resource utilization. This inefficiency arises because the node begins synchronizing from the start, even though it only requires storage for a certain range of blocks. Additionally, the node lacks information about the progress of the KYVE pool and the already validated data, making pruning impractical when running a node as a KYVE data source.

However, if the synchronization process is halted, the node cannot fulfill its responsibilities as data source effectively. To overcome this challenge, the supervysor is introduced as a solution. The supervysor manages the data source node process based on the requirements of a KYVE data pool. It ensures that the node synchronizes only up to the necessary extent and continues to provide data even when the synchronization process is paused.

By implementing the supervysor, the synchronization process is optimized, reducing unnecessary storage usage and operational costs. The node can focus on synchronizing up to the required point, thus efficiently utilizing resources while fulfilling its role as a data source for the KYVE pool.

## Usage

To use the supervysor, you first need to initialize it:

```bash
supervysor init
--binary     string   'path to chain binaries (e.g. ~/go/bin/osmosisd)'
--pool-id    int      'KYVE pool-id'
--seeds      string   'seeds for the node to connect'
```

This command creates a config file at ```~/.supervysor/config.toml``` which is editable and required to start the supervysor.

:::info
Seed nodes are required to manage the syncing state of the node. You can also pass more than one seed by separating them with a comma. 
:::

To start the supervysor after the successful initialisation, run the following command:

```bash
supervysor start
```

Then, the supervysor starts the chain binaries or Cosmovisor to manage the syncing process depending on the required data of the KYVE pool.

:::info
Make sure to **always** reinitialize after using another supervysor version.
:::

## Examples

### 1. Run a Cosmovisor Osmosis node with the supervysor

To run an Osmosis node with the Cosmovisor you have to download and set up the correct binaries. You can see a more detailed
introduction [here](/docs/run-a-node/protocol-nodes/pools/osmosis/run_osmosis_node.md).

Verify the correct installation and setup with the successful start of the node syncing `~2,000` blocks:

```bash
cosmovisor run start [flags]
```

With your node being able to run using Cosmovisor, you can stop the process and install the supervysor to start optimize this process for KYVE purposes. After the [installation](#installation), you can initialize the supervysor with the following command:

```bash
supervysor init \
--binary '/root/go/bin/cosmovisor' \
--pool-id 1 \
--seeds '6bcdbcfd5d2c6ba58460f10dbcfde58278212833@osmosis.artifact-staking.io:26656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:12556'
```

After the successful initialization you can start your node with:

```bash
supervysor start
```

The supervysor then will start an Osmosis node as data source for the pool with the ID 1 of the Mainnet.

### 2. Run an Archway node on Testnet Kaon with the supervysor

To run an Archway node on Testnet Kaon you have to download and set up the correct binaries. You can see a more detailed
introduction [here](/docs/run-a-node/protocol-nodes/pools/archway/run-archway-node.md).

Verify the correct installation and setup with the successful start of the node syncing `~2,000` blocks:

```bash
./archwayd start [flags]
```

With your node being able to run using Cosmovisor, you can stop the process and install the supervysor to start optimize this process for KYVE purposes. After the [installation](#installation), you can initialize the supervysor with the following command:

```bash
supervysor init \
--binary '~/bin/archwayd' \
--pool-id 2 \
--chain-id 'kaon-1' \
--seeds '3ba7bf08f00e228026177e9cdc027f6ef6eb2b39@35.232.234.58:26656,b308dda41e4db2ee00852d91846f981c49943d46@161.97.96.91:46656'
```

After the successful initialization you can start your node with:

```bash
supervysor start --flags="--x-crisis-skip-assert-invariants"
```

The supervysor then will start an Osmosis node as data source for the pool with the ID 1 of the Mainnet.


## Settings

### Overwrite default home path

The supervysor uses by default the default home path of the binary. If the home directory lies
under another path, the `init` command takes the `--home` flag in order to overwrite the default path:

```bash
supervysor init [...] --home="/usr/alice/.osmosis"
```

### Overwrite default config path

The supervysor uses by default the path `~/.supervysor` to create the required config file. If the config file should be written
or lies under another path, the `init` and the `start` command take the `--config` flag in order to overwrite the default path.

#### Write the config file to custom path:

```bash
supervysor init [...] --config="/usr/alice/.supervysor/config.toml"
```

#### Use a custom path when starting the supervysor:

```bash
supervysor start --config="/usr/alice/.supervysor/config.toml"
```

### Pass flags to node binary
When starting the node binary with the supervysor, sometimes it's required to provide flags for further configuration. 
To achieve this, `--flags` can be used when starting the supervysor:

```bash
supervysor start --flags="--x-crisis-skip-assert-invariants"
```

#### More arguments

```bash
supervysor start --flags="--x-crisis-skip-assert-invariants --abci='grpc'"
```

### Custom pruning interval
It is possible to use a custom pruning interval with the flag `--pruning-interval` in hours:
```bash
supervysor init [...] --pruning-interval=8
```

However, the specified pruning interval shouldn't be lower than 6 hours to ensure that the node always have enough time to find peers in order to continue syncing before the pool catches up.


### Metrics

You can enable useful Prometheus metrics through the `--metrics` flag when running the `init` command. By default, it's exposed on port `26660` and you can specify a custom port with `--metrics-port`:

```bash
supervysor init [...] --metrics --metrics-port=25500
```

### Overwrite KYVE endpoints

The supervysor retrieves the pool data from the KYVE blockchain. By default, it uses the following
endpoints:

- **Mainnet (`kyve-1`)**: https://api.kyve.network
- **Testnet (`kaon-1`)**: https://api.kaon.kyve.network
- **Devnet (`korellia-2`)**: https://api.korellia.kyve.network

These can be overwritten (more can be comma separated string) by adding the flag `--endpoints`:

```bash
supervysor init [...] --endpoints="<endpoint-1>,<endpoint-2>"
```

:::tip
You can find all official KYVE chain endpoints [here](/learn/networks).
:::

## Contribution & Low-level technical documentation

You can find the source code of the supervysor, together with contribution guidelines and a detailed technical
documentation in the README of the supervysor's repository **[here](https://github.com/KYVENetwork/supervysor)**.

