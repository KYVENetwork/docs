---
sidebar_position: 2
---

# Usage

To use the supervysor, you first need to initialize it:

```bash
supervysor init
--binary-path         string   'path to chain binaries (e.g. ~/go/bin/osmosisd)'
--chain-id            string   'KYVE chain-id'
--home-path           string   'path to home directory (e.g. ~/.osmosisd)'
--metrics             string   'exposing Prometheus metrics ("true" or "false")'
--pool-id             int      'KYVE pool-id'
--seeds               string   'seeds for the node to connect'
--pruning-interval    int      'block-pruning interval (hours) (default 24)'
--fallback-endpoints  string   'additional endpoints to query KYVE pool height [optional]'
```

This command creates a config file at ```~/.supervysor/config.toml``` which is editable and required to start the supervysor.

To start the supervysor after the successful initialisation, run the following command:

```bash
supervysor start
```

Then the supervysor starts the chain binaries or cosmovisor to manage the syncing process depending on the required data of the KYVE pool.

:::info
Make sure to **always** reinitialize after using another supervysor version.
:::