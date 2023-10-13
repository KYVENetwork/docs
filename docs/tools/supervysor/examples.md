---
sidebar_position: 3
---

# Examples

## 1. Run a Cosmovisor Osmosis node with the supervysor

To run an Osmosis node with the Cosmovisor you have to download and set up the correct binaries. You can see a more detailed
introduction [here](https://docs.osmosis.zone/networks/join-mainnet/).

Verify the correct installation and setup with the successful start of the node syncing ~ 2,000 blocks:

```bash
cosmovisor run start [flags]
```

With your node being able to run using Cosmovisor, you can stop the process and install the supervysor to start optimize this process for KYVE purposes. After the [installation](#installation), you can initialize the supervysor with the following command:

```bash
supervysor init \
--binary '/root/go/bin/cosmovisor' \
--chain-id 'kyve-1' \
--home '/root/.osmosisd' \
--pool-id 1 \
--seeds '6bcdbcfd5d2c6ba58460f10dbcfde58278212833@osmosis.artifact-staking.io:26656,ade4d8bc8cbe014af6ebdf3cb7b1e9ad36f412c0@seeds.polkachu.com:12556'
```

After the successful initialization you can start your node with:

```bash
supervysor start
```

The supervysor then will start an Osmosis node as data source for the pool with the ID 1 of the KYVE Mainnet.