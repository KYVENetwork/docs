# Beta Network

The beta network contains the most recent developed features and is expected to have errors.
Basic knowledge about cosmos-sdk and linux servers is highly recommended.

## Major Change: Interpool security

The biggest difference to the current korellia network is the feature of interpool-security.
From now on, there is only one staker entry per address. And a staker can join multiple pools. Joining multiple pools means more rewards, but this comes also with the danger of being more vulnerable to slashes.

![interpool security](https://cdn.discordapp.com/attachments/889827445132374036/1016716774122733628/interpool_security.png)

## Explorer and Website

- [explorer.beta.kyve.network](https://explorer.beta.kyve.network/kyve-betanet/staking)
- [kyve-beta.netlify.app/#/](https://kyve-beta.netlify.app/#/)

For $KYVE ask in the Discord-Beta testers channels.

## Setting up a chain node

The process of setting up a beta node is similar to the general guide
[here](/validators/chain-node.md). However, less disk space is required, as
the network does not have that many transactions and is resettet here and then.

### 1. Obtaining binaries

```bash
wget https://nc2.breithecker.de/s/BY4Lzj8TAQzgJZm/download/chain_linux_amd64.tar.gz
tar -xvzf chain_linux_amd64.tar.gz

# The [moniker] is a human-readable name for your node
./chaind init [moniker] --chain-id kyve-beta
```

Other architectures:

- linux/arm64: [https://kyve-beta.s3.eu-central-1.amazonaws.com/genesis/chain_linux_arm64.tar.gz](https://kyve-beta.s3.eu-central-1.amazonaws.com/genesis/chain_linux_arm64.tar.gz)
- darwin/amd64: [https://kyve-beta.s3.eu-central-1.amazonaws.com/genesis/chain_darwin_amd64.tar.gz](https://kyve-beta.s3.eu-central-1.amazonaws.com/genesis/chain_darwin_amd64.tar.gz)

Obtain the genesis:

```bash
wget https://kyve-beta.s3.eu-central-1.amazonaws.com/genesis/genesis-v0.7.0-beta.json
# move to the chain-node directory
mv genesis-v0.7.0-beta.json ~/.kyve/config/genesis.json
```

Start the chain

```bash
./chaind start --p2p.persistent_peers="410bf0cb2cdb9a6e159c14b9d01531b9ecb1edd4@3.70.26.46:26656"
```

### 2. Cosmovisor, Systemd and Validators

The setup of cosmovisor and systemd is the same as described [here](/validators/chain-node.md#setup-cosmovisor)
and [here](/validators/chain-node.md#setting-up-deamon-service).

For [Becoming a validator](../validators/chain-node.md#becoming-a-validator) keep in mind to use the correct chain-id `kyve-beta`.

## Setting up protocol nodes

### 1. Create the validator

In order to create your validator visit the beta KYVE app [kyve-beta.netlify.app/#/validators](https://kyve-beta.netlify.app/#/validators) and click on `Become a validator`.

There you can choose your preferred `self delegation` which is the same as `stake` before. The self delegation determines the probability of creating bundles and therefore earning rewards. If the validator misbehaves the self delegation will get partially slashed.
Others can also delegate to you. This will improve your probability of earning more rewards. To attract them, you can change your commission under `Manage Commission` on your validator page. If the validator misbehaves those delegators will get slashed, too.

After the validator got created you can view your validator in detail by clicking on it. If you want to change your moniker, website and even your logo you can do that by clicking on `Manage Validator` and then on `Manage Metadata`

### 2. Run protocol nodes

Running a protocol node can be done in 3 ways, we recommend running the node with Option 1.

#### Option 1: Run with KYSOR (recommended)

**Running nodes with KYSOR has the following benefits:**

- Only use **one** program to run on **every** pool
- Not installing and compiling protocol binaries **manually** for every pool
- Getting the new upgrade binaries during a pool upgrade **automatically** and therefore **don't risk timeout slashes**
- Make running protocol nodes **standardized** and **easier**

**Installation**

Get the latest release of the KYSOR binaries

```bash
wget https://kyve-beta.s3.eu-central-1.amazonaws.com/kysor/kysor-linux-x64.zip
unzip kysor-linux-x64.zip
mv kysor-linux-x64 kysor
chmod +x kysor
```

Available KYSOR binaries

```
linux-arm64 -> https://kyve-beta.s3.eu-central-1.amazonaws.com/kysor/kysor-linux-arm64.zip
linux-x64   -> https://kyve-beta.s3.eu-central-1.amazonaws.com/kysor/kysor-linux-x64.zip
macos-x64   -> https://kyve-beta.s3.eu-central-1.amazonaws.com/kysor/kysor-macos-x64.zip
```

**Initialize KYSOR**

Once you have successfully downloaded the KYSOR binary you have to initialize it.

When you init the KYSOR you need to specify the network you should run on and if the KYSOR should automatically download and execute the binaries for you. Since we are in beta testnet
we would recommend initializing with the following properties:

```bash
./kysor init --network beta --auto-download-binaries
```

This command creates a `config.toml` under the following directory: `$HOME/.kysor/`. You can edit this file if you wish to change the network or the auto download.

::: warning
**IMPORTANT**: Since we are in testnet it is okay to leave auto download on, but once KYVE is in mainnet we would highly recommend turning auto download off and compiling the upgrade binaries yourself. You can find more information below for how to upgrade with KYSOR manually.
:::

**Create your first valaccount**

Now that KYSOR is initalized we move on to the next step. For every pool you run on a _valaccount_ has to be created. In our example, we want to run on the Moonbeam pool with Pool Id `0`. A new valaccount with a new mnemonic can be created in the following way:

```bash
./kysor valaccounts create \
--name moonbeam \
--pool 0 \
--storage-priv "$(cat path/to/arweave.json)" \
--verbose \
--metrics
```

This will create a `moonbeam.toml` file under the kysor home directory in `$HOME/.kysor/valaccounts/`. There you can view your valaccount config.

If you want to create a valaccount from an existing mnemonic just add the `--recover` flag like this:

```bash
./kysor valaccounts create \
--name moonbeam \
--pool 0 \
--storage-priv "$(cat path/to/arweave.json)" \
--verbose \
--metrics \
--recover
```

This will prompt you to enter the mnemonic you want to import. More help on how to manage valaccounts can be found with `./kysor valaccounts --help`

::: warning
**INFORMATION**: Of course multiple valaccounts can be created for each pool. We would recommend naming the valaccounts after the pool you want to run with this account on like in this case `moonbeam` for example. These names are just used locally for config management. Also if you have multiple valaccounts running on the same machine you are required to change the port of the metrics server (if enabled of course) so the don't overlap.
:::

**Run the KYSOR**

After you have created the required valaccounts you can simply start running the KYSOR with the following command:

```bash
./kysor start --valaccount moonbeam
```

When KYSOR is running, you can proceed with step 3.

**Run the KYSOR without auto download**

If you want to run the KYSOR without auto download enabled like it would be recommended in mainnet just set the property `autoDownloadBinaries` to false in the `$HOME/.kysor/config.toml`. After that you should restart the KYSOR to make changes available.

Before an upgrade you are then required to prebuild the upgrade binaries **yourself** and place them in the correct path. Once you have the upgrade binary compiled move them to the following directory **before** the upgrade:

```bash
mv kyve-upgrade-binary $HOME/.kysor/upgrades/pool-$pool/$version/bin
```

$POOL is the pool id where the binary should run on. For example for the Moonbeam pool with pool id `0` and upgrade version `1.9.0` you should move the upgrade binary to the following folder:

```bash
mv kyve-moonbeam-binary $HOME/.kysor/upgrades/pool-0/1.9.0/bin/
```

The upgrade binaries of each version in beta will be available here: [github.com/KYVENetwork/node/releases](https://github.com/KYVENetwork/node/releases)

**General KYSOR directory structure**

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
|   |   |   │   └── 234.json
|   |   |   │   └── ...
│   |   |   └── logs
│   |   |       ├── 2022-09-29T08:23:02.003Z.log
│   |   |       └── 2022-09-29T08:23:24.953Z.log
│   |   └── 1.8.7
│   |       ├── bin
│   |       │   └── kyve-linux-x64
│   |       ├── cache
|   |       │   └── 567.json
|   |       │   └── ...
│   |       └── logs
│   |           └── 2022-09-29T08:23:24.953Z.log
│   └── pool-2
│       └── 0.8.6
│           ├── bin
│           │   └── kyve-linux-x64
│           ├── cache
|           │   └── 3847.json
|           │   └── ...
│           └── logs
│               └── 2022-09-29T08:23:02.003Z.log
└── valaccounts
    └── moonbeam.toml
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

**Run KYSOR with systemd**

For the daemon service root-privileges are required during the setup. Create a service file. $USER is the Linux user which runs the process. Replace it before you copy the command.

Since the KYSOR can run on multiple pools on one machine we would recommend naming the daemon service after the valaccount name and with a `d` appending to it. With that you can create multiple service files and control each of them. This example shows the service file for our valaccount `moonbeam`

```bash
tee <<EOF > /dev/null /etc/systemd/system/moonbeamd.service
[Unit]
Description=KYVE Protocol-Node moonbeam daemon
After=network-online.target

[Service]
User=$USER
ExecStart=/home/$USER/kysor start --valaccount moonbeam
Restart=on-failure
RestartSec=3
LimitNOFILE=infinity
EOF
```

Start the daemon

```bash
sudo systemctl enable moonbeamd
sudo systemctl start moonbeamd
```

It can be stopped using

```
sudo systemctl stop moonbeamd
```

You can see its logs with

```
sudo journalctl -u moonbeamd -f
```

#### Option 2: Run prebuild binaries (not recommended)

You can download the current protocol node binaries here: [github.com/KYVENetwork/node/releases](https://github.com/KYVENetwork/node/releases)

For example, if we want to run on the Moonbeam pool with Pool Id _0_ we can do the following:

```bash
wget todo
unzip kyve-linux-x64.zip
chmod +x kyve-linux-x64
```

To run the protocol node the following command needs to be executed:

```bash
./kyve-linux-x64 start
--pool 0 \
--valaccount "your mnemonic ..."
--storage-priv "$(cat path/to/arweave.json)" \
--network beta \
--verbose \
--metrics \
```

The valaccount has to be created prior to this step. The easiest way is to just create it with Keplr or Cosmostation wallet and then export it.

The logs and the cache files are generated in the current directory. You can specify the home directory with the optional flag _--home_.

The prometheus metrics server runs default on port 8080, you can overwrite that with the optional flag _--metrics-port_

#### Option 3: Compile binaries yourself and run manually (not recommended)

For compiling the node protocol binaries yourself you can clone the KYVE monorepo here [github.com/KYVENetwork/node](https://github.com/KYVENetwork/node).

To build the evm binaries execute the following commands:

```bash
git clone git@github.com:KYVENetwork/node.git
cd node

yarn install
yarn setup

cd integrations/evm
yarn build:binaries
```

After that the binaries should be available under the following path: `/integrations/evm/out/*`

### 3. Finally join a pool with a valaccount

After the node is running you can finally join the pool with your valaccount.

If the node is starting for the first time, you should something like this in the logs:

```
2022-09-28 06:37:46.536  INFO  Valaccount kyve1psw3gt65hg3jzt3hqhayg6r7j42330nf49pyvc has not joined the pool with id 0 yet
2022-09-28 06:37:46.539  INFO  Visit https://app.kyve.network/#/pools/0 and add join the pool with the following information:

2022-09-28 06:37:46.540  INFO  Valaddress:    kyve1psw3gt65hg3jzt3hqhayg6r7j42330nf49pyvc
2022-09-28 06:37:46.541  INFO  Valname:       xenacious-amethyst-penguin

2022-09-28 06:37:46.541  INFO  The node will not continue until the account is authorized
```

With this information (`Valaddress` and `Valname`) you can head over the the KYVE app and join the pool.

Now that the node is already running it just needs the authorization from it's main validator account in order to run for this validator and generate rewards. For that visit your validator page and click on `Join existing pool`.

A dialog should open where you should select the pool you want to join (here Moonbeam). After that enter the Valaddress that needs to be authorized and the Valname, which just serves as a security that the node has actually been started. (If you join a pool without having the node running you are in danger of receiving a timeout slash because once you join a pool you are expected to validate and upload data).

For the last option you can do a one time transfer so that the valaccount has some $KYVE to pay for transaction fees. We would recommend sending 1000 $KYVE for the start. Make sure that the valaccount always has enough $KYVE to pay for the fees, otherwise you are again in danger of receiving a timeout slash.

Once you have joined the pool the node should continue in about ~10 seconds. After that you are successfully participating in a pool.

### 4. Join multiple pools if you want to increase your rewards

This step is optional, but the more pools you participate in the higher the rewards. If you want to join another pool just repeat the steps from point 4. You can see all the pools you are participating in in your validator page.

::: warning
**WARNING**: But beware, joining for example a second pool might double your rewards, but it would also double the danger of getting slashed.
:::
