---
sidebar_position: 8
title: KSYNC
---

<h1 class="hide">
# KSYNC
</h1>

<p align="center">
  <img style={{borderRadius: '10px'}} src="/img/ksync/ksync.png" />
</p>

<p align="center">
<strong>Rapidly sync validated blocks and snapshots from KYVE to every Tendermint based Blockchain Application</strong>
</p>

## Installation

import KSYNCLatestVersion from '/src/components/ksync/LatestVersion';

To install the latest version <strong><KSYNCLatestVersion /></strong> of KSYNC, run the following command:

```bash
go install github.com/KYVENetwork/ksync/cmd/ksync@latest
```

To verify the installation simply run `ksync version`. To build from source visit the repository on [GitHub](https://github.com/KYVENetwork/ksync).

## What is KSYNC?

KSYNC is a tool capable of syncing blocks and state-sync snapshots from the decentralized KYVE data lake directly into Cosmos blockchain nodes. With KSYNC Cosmos validators don't need to wait for peers in order to block-sync and they don't need to search for trusted app hashes if they want to state-sync. Furthermore, state-syncing to historical heights up to genesis are possible.

## Why KSYNC?

<div style={{display: 'flex',alignItems:'start'}}>
  <div>
    <p>
      There is no incentive to keep historical blockchain data in Cosmos, therefore finding
      peers with historical blocks is difficult.
      Furthermore state-sync snapshots, which promise syncs in minutes, sometimes simply do not work due to other nodes not having them enabled or p2p connections breaking. Additionally it is only possible to state-sync to the current live height.
    </p>
    <ul>
      <li>
        KSYNC can <strong>block-sync cosmos chains from genesis up to live height</strong>, which might be the only option for archival node runners in the future since historical blocks are harder each day to come by.
      </li>
      <li>
        KSYNC can <strong>state-sync cosmos chains from genesis up to live height</strong> for certain intervals (usually not bigger than 10,000). State-syncing from historical heights was impossible before and could only be accomplished with centralized providers having huge backups of the entire data directory.
      </li>
      <li>
        KSYNC can <strong>checkout any blockheight from genesis up to live height within minutes</strong> with height-sync (combination of state- and block-sync). This was only possible with huge efforts and resources before.
      </li>
    </ul>

  </div>
  <img width="40%" style={{borderRadius: '10px',marginLeft: '20px',objectFit: 'scale-down', maxWidth: '350px'}} src="/img/ksync/overview.png" />
</div>

## Usage

Depending on what you want to achieve with KSYNC there are three sync modes available. A quick summary of what they do
and when to use them can be found below:

|                                 | Description                                                                                                                                     | Recommendation                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [**BLOCK-SYNC**](#block-sync)   | Syncs blocks from the node's current height up to a specified target height.                                                                    | Generally recommended for archival node runners, who want to have a full node containing all blocks.                                 |
| [**STATE-SYNC**](#state-sync)   | Applies a state-sync snapshot to the node. After the snapshot is applied, the node can continue block-syncing from the applied snapshot height. | Generally recommended for new node runners, who want to join a network in minutes without wanting to sync the entire blockchain.     |
| [**HEIGHT-SYNC**](#height-sync) | Finds the quickest way out of state-sync and height-sync to get to the specified target height.                                                 | Generally recommended for users who want to check out a historical state within minutes at the specified target height for analysis. |

### Check availability

In order to use KSYNC, the data has to be made available by KYVE in the first place. To get an overview
of all supported sources simply run:

```bash
ksync info
```

This provides an overview of all chains that are supported by KSYNC using the validated Mainnet data.
The listed source name can be used as `--source=<source-name>` in several commands.

To get an overview of all supported chains using the validated data of the KYVE Testnet Kaon, simply run:

```bash
ksync info --chain-id="kaon-1"
```

### BLOCK-SYNC

#### Syncing to latest available height

Depending on your current node height (can be also 0 if you start syncing from genesis) you can sync up to the latest
height available by the storage pool. KSYNC will automatically exit once that height is reached.

```bash
ksync block-sync --binary="/path/to/<binaryd>" --source=<source-name>
```

#### Syncing to specified target height

Depending on your current node height (can be also 0 if you start syncing from genesis) you can sync up to your desired
target height. KSYNC will automatically exit once that height is reached.

```bash
ksync block-sync --binary="/path/to/<binaryd>" --source=<source-name> --target-height=<height>
```

#### Example

Use _block-sync_ to sync your Osmosis node with validated KYVE data to height `42,000`:

To _block-sync_ Osmosis you have to download and set up the correct Osmosis binary. To sync from genesis the version `v3.1.0` has
to be used. You can download them [here](https://github.com/osmosis-labs/osmosis/releases/tag/v3.1.0) or build them from source: [https://github.com/osmosis-labs/osmosis](https://github.com/osmosis-labs/osmosis)

Verify installation with:

```bash
./osmosisd version
3.1.0
```

After the installation, init the config:

```bash
./osmosisd init <your-moniker> --chain-id osmosis-1
```

Download the genesis:

```bash
wget -O ~/.osmosisd/config/genesis.json https://github.com/osmosis-labs/networks/raw/main/osmosis-1/genesis.json
```

Now that the binary is properly installed, KSYNC can already be started:

```bash
ksync block-sync --binary="/path/to/osmosisd" --source="osmosis" --target-height=42000
```

### STATE-SYNC

#### Syncing to latest available snapshot height

You can _state-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to the latest available snapshot archived by the pool with the following command. If the storage pool has synced with the live
height this can be used to rapidly join this network.

```bash
ksync state-sync --binary="/path/to/<binaryd>" --source=<source-name>
```

#### Syncing to specified snapshot height

You can _state-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to your desired target height. The target height has to be the exact height of the archived snapshot. If the specified
height can not be found it prints out the nearest available snapshot height you can use.

```bash
ksync state-sync --binary="/path/to/<binaryd>" --source=<source-name> --target-height=<height>
```

#### Example

Use _state-sync_ to sync your Archway node with validated KYVE data to height `135,000`:

To _state-sync_ Archway you have to download and set up the correct Archway binary. To sync from genesis the version `v1.0.1` has
to be used. You can download them [here](https://github.com/archway-network/archway/releases/tag/v1.0.1) or build them from source: [https://github.com/archway-network/archway](https://github.com/archway-network/archway)

Verify installation with:

```bash
./archwayd version
1.0.1
```

After the installation, init the config:

```bash
./archwayd init <your-moniker> --chain-id archway-1
```

Download the genesis:

```bash
wget -qO- https://github.com/archway-network/networks/raw/main/archway/genesis/genesis.json.gz | zcat > ~/.archway/config/genesis.json
```

Now that the binary is properly installed, KSYNC can already be started:

```bash
ksync state-sync --binary="/path/to/archwayd" --source="archway" --target-height=135000
```

### HEIGHT-SYNC

#### Syncing to latest available block height

You can _height-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to the latest available height. This is especially useful for joining a new network if the user wants to join as quick as
possible.

```bash
ksync height-sync --binary="/path/to/<binaryd>" --source=<source-name>
```

#### Syncing to specified target height

You can _height-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to your desired target height. The target height can be any height (but the block data pool must have archived it), then
it will use available _state-sync_ snapshots and _block-sync_ to get to the target height as quickly as possible

```bash
ksync height-sync --binary="/path/to/<binaryd>" --source=<source-name> --target-height=<height>
```

#### Example

Use _height-sync_ to sync your Archway node with validated KYVE data to height `249,238`:

To _height-sync_ Archway you have to download and set up the correct Archway binary. To sync from genesis the version `v1.0.1` has
to be used. You can download them [here](https://github.com/archway-network/archway/releases/tag/v1.0.1) or build them from source: [https://github.com/archway-network/archway](https://github.com/archway-network/archway)

Verify installation with:

```bash
./archwayd version
1.0.1
```

After the installation, init the config:

```bash
./archwayd init <your-moniker> --chain-id archway-1
```

Download the genesis:

```bash
wget -qO- https://github.com/archway-network/networks/raw/main/archway/genesis/genesis.json.gz | zcat > ~/.archway/config/genesis.json
```

Now that the binary is properly installed, KSYNC can already be started:

```bash
ksync state-sync --binary="/path/to/archwayd" --source="archway" --target-height=249238
```

## Settings

### Metrics

You can enable useful metrics through the `--metrics` flag for all syncing commands. By default, it's exposed on `http://localhost:8080/metrics` and you can specify a custom port with `--metrics-port`.

The exposed metrics include the following information:

```json
{
  "latest_block_hash": "A6C59D5F7487B95B32B71EB97F8FE0EE7BE7B512044FC53B6C4A706594167AF9",
  "latest_app_hash": "6BF3787314EC5C1B8FF08334193A31EF562CFE6700C3E6B604C31FD053F7FAF4",
  "latest_block_height": "180",
  "latest_block_time": "2021-06-18T22:03:40.861352885Z",
  "earliest_block_hash": "C8DC787FAAE0941EF05C75C3AECCF04B85DFB1D4A8D054A463F323B0D9459719",
  "earliest_app_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
  "earliest_block_height": "1",
  "earliest_block_time": "2021-06-18T17:00:00Z",
  "catching_up": true
}
```

### Overwrite default home

KSYNC uses by default the default home path of the binary. If the home directory lies
under another path, every command takes the `--home` path, in order to overwrite the default path.

#### Example

Use another home path for the binary:

```bash
ksync block-sync --binary="/path/to/osmosisd" --home="/my/custom/home/.osmosis" --source="osmosis" --target-height=42000
```

### Overwrite chain endpoint

KSYNC retrieves the metadata including checksums from the KYVE blockchain. By default, KSYNC uses the following
endpoints:

- **Mainnet (`kyve-1`)**: https://api-eu-1.kyve.network
- **Testnet (`kaon-1`)**: https://api-eu-1.kaon.kyve.network
- **Devnet (`korellia-2`)**: https://api.korellia.kyve.network

These can be changed by adding the flag `--chain-rest`.

:::tip
You can find all official KYVE chain endpoints [here](/introduction/networks).
:::

#### Example

Use the endpoint of your own KYVE node:

```bash
ksync block-sync --binary="/path/to/osmosisd" --chain-rest="https://api-us-1.kyve.network" --source="osmosis" --target-height=42000
```

### Overwrite storage provider endpoint

For KSYNC to actually sync blocks and snapshots the data has to be retrieved from the storage provider. By default,
KSYNC uses the following endpoints:

- **Arweave (`1`)**: https://arweave.net
- **Bundlr (`2`)**: https://arweave.net
- **KYVE Storage Provider (`3`)**: https://storage.kyve.network _(shouldn't be overwritten)_

These can be changed by adding the flag `--storage-rest`.

:::tip
You can check which storage providers KSYNC uses by visiting KYVE webapp. There the storage provider is listed for each pool.
:::

#### Example

Use another gateway for Bundlr:

```bash
ksync block-sync --binary="/path/to/osmosisd" --storage-rest="https://gateway.irys.xyz" --source="osmosis" --target-height=42000
```

### Overwrite Pool IDs

To use specific Pool IDs for any kind of syncing process, replace `--source=<source-name>` with `block-pool-id=<id>` and/or `--snapshot-pool-id=<id>`.

#### Example

Use Archway Pool IDs for HEIGHT-SYNC:

```bash
ksync height-sync --binary="/path/to/archwayd" --block-pool-id=2 --snapshot-pool-id=4
```

### Backups

Even with the right setup and careful maintenance, it's possible to encounter app-hash errors or other unexpected problems that can lead to node collisions and resyncs from Genesis. Especially when you're dealing with syncing an archival node, it's a good idea to create periodic backups of the node's data.

KSYNC offers precisely this option for creating backups, which is generally recommended for archival node runners using block-sync. There are two different methods to utilize this:

#### 1. BLOCK-SYNC-Backups

With _block-sync_, nodes can be synced by KSYNC from any height up to the latest height available by the storage pool.
Backups can be created automatically at an interval, with the following parameters:

```bash
--binary               string   'path to binary (e.g. ~/osmosisd)'
--backup-interval      int      'block interval to write backups of data directory (set 0 to disable backups)'
--backup-keep-recent   int      'number of latest backups to be keep (0 to keep all backups)'
--backup-compression   string   'compression type used for backups ("tar.gz","zip"), if not compression given the backup will be stored uncompressed'
--backup-dest          string   'path where backups should be stored [default = ~/.ksync/backups]'
```

When the specified `backup-interval` is reached (`height % backup-interval = 0`), KSYNC temporarily pauses the sync process and creates a backup.
These backups are duplicates of the node's data directory (e.g. `~/.osmosisd/data`). If compression is enabled (e.g. using `--backup-compression="tar.gz"`), the backup is compressed and the original uncompressed version is deleted after successful compression in a parallel process.

##### Usage

Because backups are disabled by default, it's only required to set `backup-interval`, whereas the other flags are optional.
Since the creation of a backup takes steadily longer as the data size grows, it is recommended to choose an interval of more than `20000` blocks.

Example command to run _block-sync_ with compressed backups:

```bash
ksync block-sync --binary="/path/to/<binaryd>" --source=<source-name> --target-height=<height>
  --backup-interval=50000 --backup-compression="tar.gz"
```

#### 2. Backup-Command

The backup functionality can of course also be used with a standalone command. In this case everything runs in one process
where the following flags can be used:

```bash
--binary               string   'path to binary (e.g. ~/osmosisd)'
--backup-keep-recent   int      'number of latest backups to be keep (0 to keep all backups)'
--backup-compression   string   'compression type used for backups ("tar.gz","zip"), if not compression given the backup will be stored uncompressed'
--backup-dest          string   'path where backups should be stored [default = ~/.ksync/backups]'
```

##### Usage

```bash
ksync backup --binary="/path/to/osmosisd" --compression="tar.gz"
```

## For KYVE Protocol Validators

This section includes all commands used by KYVE Protocol Validators to participate in _state-sync_ data pools.

:::info
If you are not a KYVE protocol validator or do not intend to run as a KYVE protocol validator you can skip this section
:::

### SERVE-SNAPSHOTS

This command is essential for running as a protocol node in a _state-sync_ pool since this will serve the snapshots to the
protocol node. Basically, KSYNC will sync the blocks with _block-sync_ and waits for the ABCI app to create the snapshots,
once created they are exposed over a REST API server which the protocol node can then query.

To start with default settings serve the snapshots with:

```bash
ksync serve-snapshots --binary="/path/to/<binaryd>" --source=<source-name>
```

Once you see that KSYNC is syncing blocks you can open `https://localhost:7878/list_snapshots`. In the beginning it should
return an empty array, but after the first snapshot height is reached (check the interval in the data pool settings) you
should see a first snapshot object in the response.

#### Changing snapshot api server port

You can change the snapshot api server port with the flag `--snapshot-port=<port>`

#### Enabling metrics server and manage port

You can enable a metrics server running by default on `http://localhost:8080/metrics` by add the flag `--metrics`.
Furthermore, can you change the port of the metrics server by adding the flag `--metrics-port=<port>`

#### Manage pruning

By default, pruning is enabled. That means that all blocks, states and snapshots prior to the snapshot pool height
are automatically, deleted, saving a lot of disk space. If you want to disable it add the flag `--pruning=false`.

:::tip
If you want to keep all of your snapshots but still want to prune everything else you can run with `--pruning` and
`--keep-snapshots`
:::
