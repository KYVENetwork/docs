---
sidebar_position: 3
---

# For KYVE Protocol Validators
This section includes all commands used by KYVE Protocol Validators to participate in _state-sync_ data pools.

## SERVE-SNAPSHOTS

This command is essential for running as a protocol node in a _state-sync_ pool since this will serve the snapshots to the
protocol node. Basically, KSYNC will sync the blocks with _block-sync_ and waits for the ABCI app to create the snapshots,
once created they are exposed over a REST API server which the protocol node can then query.

To start with default settings serve the snapshots with:

```bash
ksync serve-snapshots --binary="/path/to/<binaryd>" --home="/path/to/.<home>" --snapshot-pool-id=<pool-id> --block-pool-id=<pool-id>
```

Once you see that KSYNC is syncing blocks you can open `https://localhost:7878/list_snapshots`. In the beginning it should
return an empty array, but after the first snapshot height is reached (check the interval in the data pool settings) you
should see a first snapshot object in the response.

### Changing snapshot api server port

You can change the snapshot api server port with the flag `--snapshot-port=<port>`

### Enabling metrics server and manage port

You can enable a metrics server running by default on `http://localhost:8080/metrics` by add the flag `--metrics`.
Furthermore, can you change the port of the metrics server by adding the flag `--metrics-port=<port>`

### Manage pruning

By default, pruning is enabled. That means that all blocks, states and snapshots prior to the snapshot pool height
are automatically, deleted, saving a lot of disk space. If you want to disable it add the flag `--pruning=false`

