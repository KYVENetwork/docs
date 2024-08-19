---
sidebar_position: 4
---

# Join the network

After your node is configured it need to sync the latest state and connect to the network.
We support two ways of syncing your chain.

## Get genesis file

Download the `genesis.json` file and copy it over to the config directory: `~/.kyve/config/genesis.json`. This is a genesis file with the chain-id and genesis account balances.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">

Download the mainnet genesis file (5.2 MB)

```shell
wget https://raw.githubusercontent.com/KYVENetwork/networks/main/kyve-1/genesis.json
```

verify the correctness of the genesis configuration via

```shell
echo "1dc3ec916f49ef8c221851566aca12a3f914b23afb3ab35067fc8a8d5f59c2ee  genesis.json" | sha256sum -c
```

and move the genesis file to the config directory

```shell
mv genesis.json ~/.kyve/config/
```

  </TabItem>
  <TabItem value="kaon" label="Kaon">

Download the Kaon genesis file (55 KB)

```bash
wget https://raw.githubusercontent.com/KYVENetwork/networks/main/kaon-1/genesis.json
```

verify the correctness of the genesis configuration via

```shell
echo "3532166eb1605057f633ff577b4fc3e57a6dddc46498c5bc6f2f4e8ab0c756b8  genesis.json" | sha256sum -c
```

and move the genesis file to the config directory

```shell
mv genesis.json ~/.kyve/config/
```

  </TabItem>
  <TabItem value="korellia" label="Korellia">

Download the Korellia genesis file (207 KB)

```bash
wget https://files.kyve.network/korellia-2/genesis.json
```

verify the correctness of the genesis configuration via

```shell
echo "c9c05363d5c535a1b2a9ff51ec63c878fad26e081f1fecf1d011a92dbbeeabbf  genesis.json" | sha256sum -c
```

and move the genesis file to the config directory

```shell
mv genesis.json ~/.kyve/config/
```

  </TabItem>
</Tabs>

## Syncing the network

:::tip
We strongly recommend setting up Cosmovisor and Systemd as a supervisor.
:::

### State-Sync with KSYNC

:::info
Using KSYNC for state-syncing KYVE is only available for mainnet, if you wish to join Kaon or Korellia use traditional state-sync [here](/docs/run-a-node/chain-nodes/join-network.md#use-traditional-state-sync).
:::

Since KYVE has validated and archived all of its own state-sync snapshots on a 3,000 block interval those can be used
to bootstrap your KYVE node. For this the node-syncing tool [KSYNC](/access-data-sets/ksync/overview) can be used. To install
KSYNC run the following:

```
go install github.com/KYVENetwork/ksync/cmd/ksync@latest
```

You can verify the installation with `ksync version`. To state-sync to the latest available snapshot run the following:

:::warning
Please use the correct `kyved` binary version, you can find the correct version for each height [here](/docs/run-a-node/chain-nodes/installation.md#versions).
:::

```
ksync state-sync --binary /path/to/kyved --chain-id kaon-1 --source kyve
```

After the state-sync snapshot has been applied you can normally continue syncing blocks over the P2P network.

### Use traditional State-Sync

import Admonition from '@theme/Admonition';

State sync fetches a snapshot of a recent height and then only syncs the missing blocks
between the snapshot and the current height.
This is the preferred method as it's much faster. Usually minutes versus weeks.

However, one needs to trust the provided state-sync nodes. If you need full
trust you should sync from genesis.

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">

<Admonition type="info">
        <p>Make sure to use the current version of the chain for statesync. All releases can be found here: <a href="https://github.com/KYVENetwork/chain/releases">https://github.com/KYVENetwork/chain/releases</a>.
Go to <a href="https://explorer.kyve.network/kyve/gov">https://explorer.kyve.network/kyve/gov</a> and look for the latest SoftwareUpgrade Proposal to find the current version.</p>
</Admonition>

First, one needs to obtain a trusted height and hash of that height.
One can go to a blockexplorer and use the values provided there. For example block 86783 can be viewed at: <a href="https://www.mintscan.io/kyve/blocks/86783">
https://www.mintscan.io/kyve/blocks/86783 </a>

To enable state-sync edit <code>config.toml</code> under the section <code>[statesync]</code>

```toml
[statesync]
enable = true

# ...

rpc_servers = "https://rpc-cache.kyve.network:443,https://rpc-cache.kyve.network:443"
trust_height = 86783 # Replace with newer block
trust_hash = "DFE6A7EC8D3E3A55A3CA6DA2D9BFB776A5F52604EBED078DAC87775AEA5C3D75" # Replace with newer hash
```

After that start the node with

```bash
./kyved start
```

  </TabItem>
  <TabItem value="kaon" label="Kaon">

<Admonition type="info">
        <p>Make sure to use the current version of the chain for statesync. All releases can be found here: <a href="https://github.com/KYVENetwork/chain/releases">https://github.com/KYVENetwork/chain/releases</a>.
Go to <a href="https://explorer.kyve.network/kaon/gov">https://explorer.kyve.network/kaon/gov</a> and look for the latest SoftwareUpgrade Proposal to find the current version.</p>
</Admonition>

First, one needs to obtain a trusted height and hash of that height.
One can go to a blockexplorer and use the values provided there. For example block 325017 can be viewed at: <a href="https://testnet.mintscan.io/kyve-testnet/blocks/328549">
https://testnet.mintscan.io/kyve-testnet/blocks/325017 </a>

To enable state-sync edit <code>config.toml</code> under the section <code>[statesync]</code>

```toml
[statesync]
enable = true

# ...

rpc_servers = "https://rpc.kaon.kyve.network:443,https://rpc.kaon.kyve.network:443"
trust_height = 325017 # Replace with newer block
trust_hash = "6548AC5525F24CD09BADDBE3A143CC3D44D057F669EB72BDED9C4C7D62E85FDC" # Replace with newer hash
```

After that start the node with

```bash
./kyved start
```

  </TabItem>
  <TabItem value="korellia" label="Korellia">

<Admonition type="info">
        <p>Korellia versions are not open source and only prebuilt binaries are available.</p>
</Admonition>

The latest binaries can be found at the [Installtion](installation) instructions.

After that, one needs to obtain a trusted height and hash of that height.
One can go to a blockexplorer and use the values provided there. For example block 5121641 can be viewed at: <a href="https://explorer.kyve.network/korellia/blocks/5121641">
https://explorer.kyve.network/korellia/blocks/5121641 </a>

To enable state-sync edit <code>config.toml</code> under the section <code>[statesync]</code>

```toml
[statesync]
enable = true

# ...

rpc_servers = "https://rpc-cache.korellia.kyve.network:443,https://rpc-cache.korellia.kyve.network:443"
trust_height = 5121641 # Replace with newer block
trust_hash = "12B737A85692CBB606C83D763BED3992E158914DD584DCA100F4C6BEDFB9846D" # Replace with newer hash
```

After that start the node with

```bash
./kyved start
```

  </TabItem>
</Tabs>

### Sync from genesis with KSYNC

:::info
Using KSYNC for syncing KYVE from genesis is only available for mainnet, if you wish to sync Kaon or Korellia use the normal P2P sync [here](/docs/run-a-node/chain-nodes/join-network.md#sync-from-genesis).
:::

Since KYVE has validated and archived all of its own blocks and block results they can be used to sync the node instead of fetching them from the P2P network.
For this the node-syncing tool [KSYNC](/access-data-sets/ksync/overview) can be used. To install
KSYNC run the following:

```
go install github.com/KYVENetwork/ksync/cmd/ksync@latest
```

Since syncing the node from genesis can take weeks we strongly recommend setting up a systemd process which supervises the ksync process. Also since during the sync you will encounter multiple upgrades we also strongly recommend setting up Cosmovisor and preinstall all upgrade binaries. You can find information on setting up Cosmosvisor [here](/docs/run-a-node/chain-nodes/cosmovisor.md) and the systemd template below.

Create a file `/etc/systemd/system/ksync.service` with the following contents:

```
[Unit]
Description=ksync
After=network-online.target

[Service]
User=<your-user>
ExecStart=/<path-to-ksync>/ksync block-sync --binary <path-to-cosmovisor>/cosmovisor --chain-id kaon-1 --source=kyve -y
Restart=always
RestartSec=3
LimitNOFILE=4096
Environment="DAEMON_NAME=kyved"
Environment="DAEMON_HOME=/<path-to-kyve>/.kyve"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="DAEMON_RESTART_AFTER_UPGRADE=false"
Environment="DAEMON_LOG_BUFFER_SIZE=512"
Environment="UNSAFE_SKIP_BACKUP=true"

[Install]
WantedBy=multi-user.target
```

Make sure to replace &lt;your-user&gt;, &lt;path-to-ksync&gt;, &lt;path-to-kyve&gt; and &lt;path-to-cosmovisor&gt; with your values.

To start the process:

```shell
sudo systemctl enable ksync
sudo systemctl start ksync
```

It can be stopped using

```shell
sudo systemctl stop ksync
```

You can see its logs with

```shell
sudo journalctl -u ksync -f
```

### Sync from genesis

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">

<Admonition type="info">
        <p>For syncing from genesis you need chain binary version <b>v1.0.0</b></p>
</Admonition>

After the genesis file is downloaded the chain binary can be started with

```bash
./kyved start
```

  </TabItem>
  <TabItem value="kaon" label="Kaon">

<Admonition type="info">
        <p>For syncing from genesis you need chain binary version <b>v1.0.0-rc0</b></p>
</Admonition>

After the genesis file is downloaded the chain binary can be started with

```bash
./kyved start
```

  </TabItem>
  <TabItem value="korellia" label="Korellia">
    There is no official support for syncing Korellia from genesis.
    If you have a special requirement reach out to the team for more instructions. 
  </TabItem>
</Tabs>
