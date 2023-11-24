---
sidebar_position: 2
---

# Usage

Depending on what you want to achieve with KSYNC there are three sync modes available. A quick summary of what they do
and when to use them can be found below:

|                                 | Description                                                                                                                                     | Recommendation                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| [**BLOCK-SYNC**](#block-sync)   | Syncs blocks from the node's current height up to a specified target height.                                                                    | Generally recommended for archival node runners, who want to have a full node containing all blocks.                                 |
| [**STATE-SYNC**](#state-sync)   | Applies a state-sync snapshot to the node. After the snapshot is applied, the node can continue block-syncing from the applied snapshot height. | Generally recommended for new node runners, who want to join a network in minutes without wanting to sync the entire blockchain.     |
| [**HEIGHT-SYNC**](#height-sync) | Finds the quickest way out of state-sync and height-sync to get to the specified target height.                                                 | Generally recommended for users who want to check out a historical state within minutes at the specified target height for analysis. |

### Limitations

Because KSYNC uses the blocks and snapshots archived by the KYVE storage pools you first have to check if those pools
are available in the first place for your desired chain and block height.

Depending on the KYVE network, you can find all available data pools here:

- **Mainnet (KYVE)**: https://app.kyve.network/#/pools
- **Testnet (Kaon)**: https://app.kaon.kyve.network/#/pools
- **Devnet (Korellia)**: https://app.korellia.kyve.network/#/pools

Depending on the sync mode you use, the data pools need to run on the following runtimes:

- **block-sync**: `@kyvejs/tendermint` or `@kyvejs/tendermint-bsync`
- **state-sync**: `@kyvejs/tendermint-ssync`
- **height-sync**: `@kyvejs/tendermint` or `@kyvejs/tendermint-bsync` and `@kyvejs/tendermint-ssync`

## BLOCK-SYNC

### Syncing to latest available height

Depending on your current node height (can be also 0 if you start syncing from genesis) you can sync up to the latest
height available by the storage pool. KSYNC will automatically exit once that height is reached.

```bash
ksync block-sync --binary="/path/to/<binaryd>" --block-pool-id=<pool-id>
```

### Syncing to specified target height

Depending on your current node height (can be also 0 if you start syncing from genesis) you can sync up to your desired
target height. KSYNC will automatically exit once that height is reached.

```bash
ksync block-sync --binary="/path/to/<binaryd>" --block-pool-id=<pool-id> --target-height=<height>
```

### Example

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
ksync block-sync --binary="/Users/alice/osmosisd" --block-pool-id=1 --target-height=42000
```

## STATE-SYNC

### Syncing to latest available snapshot height

You can _state-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to the latest available snapshot archived by the pool with the following command. If the storage pool has synced with the live
height this can be used to rapidly join this network.

```bash
ksync state-sync --binary="/path/to/<binaryd>" --snapshot-pool-id=<pool-id>
```

### Syncing to specified snapshot height

You can _state-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to your desired target height. The target height has to be the exact height of the archived snapshot. If the specified
height can not be found it prints out the nearest available snapshot height you can use.

```bash
ksync state-sync --binary="/path/to/<binaryd>" --snapshot-pool-id=<pool-id> --target-height=<height>
```

### Example

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

## HEIGHT-SYNC

### Syncing to latest available block height

You can _height-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to the latest available height. This is especially useful for joining a new network if the user wants to join as quick as
possible.

```bash
ksync height-sync --binary="/path/to/<binaryd>" --snapshot-pool-id=<pool-id> --block-pool-id=<pool-id>
```

### Syncing to specified target height

You can _height-sync_ a node if it has no height (either node has to be just initialized or reset with `ksync unsafe-reset-all`)
to your desired target height. The target height can be any height (but the block data pool must have archived it), then
it will use available _state-sync_ snapshots and _block-sync_ to get to the target height as quickly as possible

```bash
ksync height-sync --binary="/path/to/<binaryd>" --snapshot-pool-id=<pool-id> --block-pool-id=<pool-id> --target-height=<height>
```

### Example

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
ksync height-sync --binary="/path/to/archwayd" --source="archway" --target-height=135000
```
