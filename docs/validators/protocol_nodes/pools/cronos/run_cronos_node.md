---
sidebar_position: 3
---

# Run a Cronos node

The Cronos Full Node will act as the source for the KYVE protocol validator and is **required**. You can either run the Cronos node on the same machine with the KYVE protocol together (recommended) or on a seperate machine.

:::danger
Due to very specific requirements, an additional validation layer, accessibility as well as to prevent slashes, it is strongly recommended to run an independent data source node. API providers should be avoided and have already led to critical problems in the past.
:::

## Install Cronos full node

The Cronos binary with the version `v0.6.11` has to be installed.

You can follow the official installation instructions [here](https://docs.cronos.org/for-node-hosts/running-nodes/cronos-mainnet) or download the binary directly from [here](https://github.com/crypto-org-chain/cronos/releases/tag/v0.6.11).

:::danger
If you are building from source please use the specified go version in the go.mod file, else there is the danger of receiving vote slashes.

**For cronosd v0.6.11 it is go17**
:::

You can verify the successful installation with

```
./cronosd version
0.6.11
```

After the successful installation, you need to set up the cronosd config. First choose a moniker and initialize everything:

```bash
./cronosd init <your-moniker> --chain-id cronosmainnet_25-1
```

To download and setup the genesis file execute the following command:

```bash
wget -qO- https://raw.githubusercontent.com/crypto-org-chain/cronos-mainnet/master/cronosmainnet_25-1/genesis.json | zcat > ~/.cronos/config/genesis.json
```

To enable the start of the syncing process, a seed node needs to be added into

`~/.cronos/config/config.toml`

```toml
seeds = "0d5cf1394a1cfde28dc8f023567222abc0f47534@cronos-seed-0.crypto.org:26656,3032073adc06d710dd512240281637c1bd0c8a7b@cronos-seed-1.crypto.org:26656,04f43116b4c6c70054d9c2b7485383df5b1ed1da@cronos-seed-2.crypto.org:26656,337377dcda43d79c537d2c4d93ad3b698ce9452e@bd-cronos-mainnet-seed-node-01.bdnodes.net:26656"
```

### Configuration

Due to the size of the `block_results` response, it is **required** to set the following in your `~/.cronos/config/config.toml`:

```toml
timeout_broadcast_tx_commit = "120s"
```

For efficient pruning, the following settings are recommended to decrease the disk usage:

`~/.cronos/config/config.toml`

```toml
[tx_index]

indexer = "null"
```

`~/.cronos/config/app.toml`

```toml
pruning = "everything"

index-events = [""]
```

Finally, the node can be started:

```bash
./cronosd start --x-crisis-skip-assert-invariants
```

:::caution
To be able to perform upgrades automatically, it is recommended to use the <strong>cosmovisor</strong>. How to set it up can be found [here](https://docs.cosmos.network/main/build/tooling/cosmovisor).
:::

To start the Cronos node with the cosmovisor, run:

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
