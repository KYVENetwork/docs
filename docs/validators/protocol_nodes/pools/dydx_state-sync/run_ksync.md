---
sidebar_position: 3
---

# Run KSYNC

KSYNC will provide the snapshot of an dYdX Node, which will act as the source for the KYVE protocol validator and is **required**.

## Install dYdX node

The dYdX binary with the version `v1.0.1` has to be installed.

You can follow the official installation instructions [here](https://docs.dydxprotocol.exchange/validators/running_full_node) or download the binary directly from [here](https://github.com/dydxprotocol/v4-chain/releases/tag/protocol%2Fv1.0.1).

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

### Upgrades

To upgrade the `dydxprotocold` binary successfully, it is required to change the used binary manually.
Therefore, just start the KSYNC process with the upgraded `dydxprotocold` binary after it exited automatically.

**Cosmovisor** is not supported yet, but an upgrade handler like this will be added soon.

## Install KSYNC

### Install with Go (recommended)

To install the required version of `ksync`, run the following command:

```bash
go install github.com/KYVENetwork/ksync/cmd/ksync@v1.1.1
```

Run `ksync version` to verify the installation.

### Install from source

You can also install from source by pulling the ksync repository and switching to the correct version and building
as follows:

```bash
git clone git@github.com:KYVENetwork/ksync.git
cd ksync
git checkout tags/v1.1.1
make ksync
```

This will build ksync in `/build` directory. Afterwards, you may want to put it into your machine's PATH like
as follows:

```bash
cp build/ksync ~/go/bin/ksync
```

## Start KSYNC

This command is essential for running as a protocol node in a _state-sync_ pool since this will serve the snapshots to the
protocol node. Basically, KSYNC will sync the blocks with _block-sync_ and waits for the ABCI app to create the snapshots,
once created they are exposed over a REST API server which the protocol node can then query.

To start with default settings serve the snapshots with:

```bash
ksync serve-snapshots --binary="/path/to/dydxprotocold" --home="/path/to/.dydxprotocol" --chain-id=kaon-1 --block-pool-id=8 --snapshot-pool-id=9 --engine=cometbft
```

:::caution
You can only run this command when the corresponding KYVE data snapshot-pool has been created.
:::

Once you see that KSYNC is syncing blocks you can open `http://localhost:7878/list_snapshots`. In the beginning it should
return an empty array, but after the first snapshot height is reached (check the interval in the data pool settings) you
should see a first snapshot object in the response.

:::caution
**Software upgrades** of the data source node have to be performed manually. Therefore, you only need to switch the `dydxprotocold` binaries (after the node exited automatically at an upgrade height) in order to restart KSYNC.
:::

### Changing snapshot api server port

You can change the snapshot api server port with the flag `--snapshot-port=<port>`

### Enabling metrics server and manage port

You can enable a metrics server running by default on `http://localhost:8080/metrics` by add the flag `--metrics`.
Furthermore, can you change the port of the metrics server by adding the flag `--metrics-port=<port>`

### Manage pruning

By default, pruning is enabled. That means that all blocks, states and snapshots prior to the snapshot pool height
are automatically, deleted, saving a lot of disk space. If you want to disable it add the flag `--pruning=false`
