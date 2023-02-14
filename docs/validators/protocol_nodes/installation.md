---
sidebar_position: 3
---

# Installation

This chapter will deal with the installation process of KYSOR (the Cosmovisor of KYVE protocol nodes) and the setup of it in order to run on a storage pool.

## Install KYSOR

Get the latest release of the KYSOR binaries [here](https://github.com/KYVENetwork/kyvejs/releases?q=kysor&expanded=true)

Once you have the latest version for you operating system simply
pull them down:

```bash
wget https://github.com/KYVENetwork/kyvejs/releases/download/%40kyve%2Fkysor%40$VERSION/kysor-linux-x64.zip
```

After that simply decompress it and give the executable correct access roles:

```bash
unzip kysor-linux-x64.zip
```

```bash
mv kysor-linux-x64 kysor
```

```bash
chmod 700 kysor
```

To verify that the KYSOR runs successfully just run

```bash
./kysor version
```

## Initialize KYSOR

After the successful installation of KYSOR it now needs to be initialized. Depending on the network you want to join a different
configuration needs to be passed to the init options.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="kysor_init">
  <TabItem value="korellia" label="Korellia">
    Since Korellia is a testnet it is actually recommended to enable autodownload because many upgrades are performed.

```bash
./kysor init \
--chain-id 'korellia' \
--rpc 'https://rpc.korellia.kyve.network' \
--rest 'https://api.korellia.kyve.network '\
--auto-download-binaries
```

  </TabItem>
  <TabItem value="kaon" label="Kaon">
    Since Kaon is a testnet it is actually recommended to enable autodownload because many upgrades are performed.

```bash
./kysor init \
--chain-id 'kaon-1' \
--rpc 'https://rpc-eu-1.kaon.kyve.network' \
--rest 'https://api-eu-1.kaon.kyve.network'
```

  </TabItem>
  <TabItem value="mainnet" label="Mainnet">
    Coming Soon!
  </TabItem>
</Tabs>

Once you have initialized KYSOR you can verify the successful initialization by printing out the home directory:

```bash
ls ~/.kysor
```

There should be a `config.toml` file where the configurations you just defined are saved. You can change those at any time if you want.

## Create valaccount

Now that KYSOR is initalized we move on to the next step. For every pool you run on a _valaccount_ has to be created. In our example, we want to run on the Moonbeam pool with Pool Id `0`. A new valaccount with a new mnemonic can be created in the following way:

```bash
./kysor valaccounts create \
--name 'moonbeam' \
--pool 0 \
--storage-priv "$(cat path/to/arweave.json)" \
--metrics
```

This will create a `moonbeam.toml` file under the kysor home directory in `~/.kysor/valaccounts/` where all the other valaccounts are stored. There you can view your valaccount config.

If you want to create a valaccount from an existing mnemonic just add the `--recover` flag like this:

```bash
./kysor valaccounts create \
--name moonbeam \
--pool 0 \
--storage-priv "$(cat path/to/arweave.json)" \
--metrics \
--recover
```

This will prompt you to enter the mnemonic you want to import. More help on how to manage valaccounts can be found with `./kysor valaccounts --help`

:::danger
**ATTENTION**: Since the valaccount config files store the valaccount's mnemonic and the wallet keyfile for the storage provider you should **never** share this file with anyone.
:::

Loosing the mnemonic of the valaccount can cause a timeout slash. If a third party ever gets hold of the mnemonic an upload slash can be the worst case since they have control over the vote and upload behaviour of the node. Loosing the private keyfile of the storage provider means loosing your funds.

## Install pool binaries

In the last step of the installation process of KYSOR the actual pool runtime
binaries need to be installed in KYSOR.

### General KYSOR directory structure

Knowing where KYSOR saves it's logs and binaries can be helpful. The example below shows the following setup: The KYSOR runs on two pools with pool id `0` and `2`. Pool `2` is still running on version `0.8.6` while pool `0` has already upgraded from `1.8.6` to `1.8.7`

```
.kysor
├── config.toml
├── logs
│   └── 2022-09-29T08:38:24.513Z.log
│   └── 2022-09-29T09:29:22.219Z.log
├── upgrades
│   ├── pool-0
│   |   ├── 1.8.6
│   |   |   ├── bin
│   |   |   │   └── kyve-linux-x64
│   |   |   ├── cache
|   |   |   │   ├── 234.json
|   |   |   │   └── ...
│   |   |   └── logs
│   |   |       ├── 2022-09-29T08:23:02.003Z.log
│   |   |       └── 2022-09-29T08:23:24.953Z.log
│   |   └── 1.8.7
│   |       ├── bin
│   |       │   └── kyve-linux-x64
│   |       ├── cache
|   |       │   ├── 567.json
|   |       │   └── ...
│   |       └── logs
│   |           └── 2022-09-29T08:23:24.953Z.log
│   └── pool-2
│       └── 0.8.6
│           ├── bin
│           │   └── kyve-linux-x64
│           ├── cache
|           │   ├── 3847.json
|           │   └── ...
│           └── logs
│               └── 2022-09-29T08:23:02.003Z.log
└── valaccounts
    ├── moonbeam.toml
    └── celo.toml
```

Here the following directories have the following reason:

- `.kysor` - KYSOR home directory, created with init command
- `config.toml` - general KYSOR config, created with init command
- `logs` - logs folder containing KYSOR log files. Each log file is a run from start to end where the date is the starting date
- `upgrades` - most important directory, contains all the binaries for every pool
- `upgrades/pool-$id` - holds every binary of every installed version of the specified pool
- `upgrades/pool-$id/$version` - acts as a home directory for a specific binary, contains binary cache, logs and actual protocol node binary
- `upgrades/pool-$id/$version/bin` - holds actual node binary
- `upgrades/pool-$id/$version/cache` - contains cached data relevant for the protocol node
- `upgrades/pool-$id/$version/logs` - logs folder for the protocol node of that version and pool. Each log file is a run from start to end where the date is the starting date
- `valaccounts` - contains all the valaccount config files with which the KYSOR can run on a pool

### Binary installation

<Tabs groupId="kysor_init">
  <TabItem value="korellia" label="Korellia">
    If you have autodownload enabled on KYSOR you don't need to install the binaries manually since they are downloaded and installed automatically. In this case you can proceed to the next step. If you have disabled autodownload simply follow the guide on the mainnet configuration.
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    Since autodownload should be disabled for security reasons on the Kaon network you have to install the correct binaries manually on the KYSOR. In order to fetch the correct binary head back to the pool you chose and look at the <code>runtime</code> and at the <code>runtime version</code>. With this information you can head to the binary <a href="https://github.com/KYVENetwork/kyvejs/releases">releases</a> and get the correct binary.
    Once you have found the correct release create the required folders where the binary should be placed:<br/><br/>

```bash
mkdir -p ~/.kysor/upgrades/pool-$POOL_ID/$VERSION/bin
```

```bash
cd ~/.kysor/upgrades/pool-$POOL_ID/$VERSION/bin
```

```bash
wget https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2F$RUNTIME%40$VERSION/kyve-linux-x64.zip
```

```bash
unzip kyve-linux-x64.zip
```

```bash
rm kyve-linux-x64.zip
```

To verify the version and the runtime of the binary simply call the version command:

```bash
./kyve-linux-x64 version
```

When the runtime and the version matches the KYSOR is ready.
</TabItem>
<TabItem value="mainnet" label="Mainnet">
Coming Soon!
</TabItem>
</Tabs>
