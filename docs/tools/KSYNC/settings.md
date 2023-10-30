---
sidebar_position: 4
---

# Settings

## Backups

Even with the right setup and careful maintenance, it's possible to encounter app-hash errors or other unexpected problems that can lead to node collisions and resyncs from Genesis. Especially when you're dealing with syncing an archival node, it's a good idea to create periodic backups of the node's data.

KSYNC offers precisely this option for creating backups. There are two different methods to utilize this:

### 1. BLOCK-SYNC-Backups

With _block-sync_, nodes can be synced by KSYNC from any height up to the latest height available by the storage pool.
Backups can be created automatically at an interval, with the following parameters:

```bash
--home                 string   'home directory of the node (e.g. ~/.osmosisd)'
--backup-interval      int      'block interval to write backups of data directory (set 0 to disable backups)'
--backup-keep-recent   int      'number of latest backups to be keep (0 to keep all backups)'
--backup-compression   string   'compression type used for backups ("tar.gz","zip"), if not compression given the backup will be stored uncompressed'
--backup-dest          string   'path where backups should be stored [default = ~/.ksync/backups]'
```

When the specified `backup-interval` is reached (`height % backup-interval = 0`), KSYNC temporarily pauses the sync process and creates a backup.
These backups are duplicates of the node's data directory (e.g. `~/.osmosisd/data`). If compression is enabled (e.g. using `--backup-compression="tar.gz"`), the backup is compressed and the original uncompressed version is deleted after successful compression in a parallel process.

#### Usage

Because backups are disabled by default, it's only required to set `backup-interval`, whereas the other flags are optional.
Since the creation of a backup takes steadily longer as the data size grows, it is recommended to choose an interval of more than `20000` blocks.

Example command to run _block-sync_ with compressed backups:

```bash
ksync block-sync --binary="/path/to/<binaryd>" --home="/path/to/.<home>" --block-pool-id=<pool-id> --target-height=<height>
  --backup-interval=50000 --backup-compression="tar.gz"
```

### 2. Backup-Command

The backup functionality can of course also be used with a standalone command. In this case everything runs in one process
where the following flags can be used:

```bash
--home                 string   'home directory of the node (e.g. ~/.osmosisd)'
--backup-keep-recent   int      'number of latest backups to be keep (0 to keep all backups)'
--backup-compression   string   'compression type used for backups ("tar.gz","zip"), if not compression given the backup will be stored uncompressed'
--backup-dest          string   'path where backups should be stored [default = ~/.ksync/backups]'
```

#### Usage

```bash
ksync backup --home="/Users/christopher/.osmosisd" --compression="tar.gz"
```

## Overwrite default endpoints

KSYNC retrieves data from different sources, including a KYVE chain and a storage provider endpoint. Depending on the specified `chain-id`, the default KYVE **chain endpoints** are:

-   **Mainnet (`kyve-1`)**: https://api-eu-1.kyve.network
-   **Testnet (`kaon-1`)**: https://api-eu-1.kaon.kyve.network
-   **Devnet (`korellia`)**: https://api.korellia.kyve.network

Whereas the default **storage provider endpoints** are:

-   **Arweave (`1`)**: https://arweave.net
-   **Irys (previously Bundlr) (`2`)**: https://irys.xyz
-   **KYVE Storage Provider (`3`)**: https://storage.kyve.network _(shouldn't be overwritten)_

For several reasons, you can overwrite the default endpoints with your preferred ones. For this purpose, only add the following flags to all commands that are using the listed endpoints:

```bash
--chain-rest   string      overwrite KYVE chain rest endpoint
--storage-rest string      overwrite storage provider rest endpoint
```

### Example

Use the KYVE chain US endpoint to _block_sync_ your Osmosis node:

```bash
ksync block-sync --chain-rest="https://api-us-1.kyve.network" --binary="/Users/alice/osmosisd" --home="/Users/alice/.osmosisd" --block-pool-id=1 --target-height=42000
```

## Metrics

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
