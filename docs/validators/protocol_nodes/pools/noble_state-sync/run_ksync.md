---
sidebar_position: 3
---

# Run KSYNC

KSYNC will provide the snapshot of an Noble Node, which will act as the source for the KYVE protocol validator and is **required**.

## Install Noble node

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

### Upgrades

To upgrade the `nobled` binary successfully, it is required to change the used binary manually.
Therefore, just start the KSYNC process with the upgraded `nobled` binary after it exited automatically.

**Cosmovisor** is not supported yet, but an upgrade handler like this will be added soon.

## Install KSYNC

### Install with Go (recommended)

To install the required version of `ksync`, run the following command:

```bash
go install github.com/KYVENetwork/ksync/cmd/ksync@latest
```

Run `ksync version` to verify the installation.

### Install from source

You can also install from source by pulling the ksync repository and switching to the correct version and building
as follows:

```bash
git clone git@github.com:KYVENetwork/ksync.git
cd ksync
git checkout tags/v1.4.0
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
ksync serve-snapshots --binary="/path/to/nobled" --home="/path/to/.noble" --source=noble
```

:::caution
You can only run this command when the corresponding KYVE data snapshot-pool has been created.
:::

Once you see that KSYNC is syncing blocks you can open `http://localhost:7878/list_snapshots`. In the beginning it should
return an empty array, but after the first snapshot height is reached (check the interval in the data pool settings) you
should see a first snapshot object in the response.

:::caution
**Software upgrades** of the data source node have to be performed manually. Therefore, you only need to switch the `nobled` binaries (after the node exited automatically at an upgrade height) in order to restart KSYNC.
:::

### Changing snapshot api server port

You can change the snapshot api server port with the flag `--snapshot-port=<port>`

### Enabling metrics server and manage port

You can enable a metrics server running by default on `http://localhost:8080/metrics` by add the flag `--metrics`.
Furthermore, can you change the port of the metrics server by adding the flag `--metrics-port=<port>`

### Manage pruning

By default, pruning is enabled. That means that all blocks, states and snapshots prior to the snapshot pool height
are automatically, deleted, saving a lot of disk space. If you want to disable it add the flag `--pruning=false`
