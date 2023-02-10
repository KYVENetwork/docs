# Running a Protocol-Node

The protocol nodes are the backbone of a KYVE pool. They are responsible
for collecting data from a data source, bundling and uploading them to Arweave and verifying it. This enables KYVE
to store any data stream decentralized and permanently.

## Requirements

Wallets

- A [Keplr](https://keplr.app) or [Cosmostation](https://www.cosmostation.io/) wallet with $KYVE. (You can claim some [here](https://app.kyve.network/#/faucet))
- An [Arweave](https://arweave.org/) keyfile with some AR. (You can claim some [here](https://faucet.arweave.net/))

Minimum hardware requirements

- 1vCPU
- 4GB RAM
- 1GB DISK

## Get some $KYVE

Before continuing, make sure that you have the [Keplr](https://keplr.app) or [Cosmostation](https://www.cosmostation.io/) wallet installed in your browser. Head over to the [KYVE app](https://app.kyve.network) and make sure to connect your wallet (this automatically adds and switches to the KYVE network).

Go to the faucet tab and claim some tokens via one of three faucets. The wheel is the easiest option.

:::caution
**IMPORTANT**: Make sure that you are on the correct app URL `https://app.kyve.network`
:::

## Choose a pool

Before you can run a protocol node you have to choose a pool you want to join. You can find an overview of all pools
in the KYVE app [here](https://app.kyve.network/#/pools).

![pools](/img/pools.png)

Here you can already see some options. Since in this example the `Bitcoin` pool is paused due to the lack of funds
it would be smarter to join the other active pools. Other metrics can be also added to your decision in which pool
you want to participate. Example metrics could be for example the amount of slashes which occured in the pool (can be found when you click on `pool` then `metrics`).

Once you have chosen a pool you have to remember the pool id and the
pool runtime for later which can be both found when you click on the pool overview. In this example we have chosen the first pool with the pool id `0` and the runtime `@kyve/evm`.

![pool overview](/img/pool_overview.png)

## Verify that you can claim a validator slot

Due to a limited number of validator slots in each pool only the nodes with the highest delegation can claim
a validator slot. You can only claim a validator slot if you have **more than the minimum delegation amount**.

To check the minimum delegation amount you can click on the tab `Validators` once you have selected a pool. There you should see something like this:

![min delegation](/img/min_delegation.png)

In this case all there are still 9 free validator slots so you just have to have more than 0 $KYVE of delegation
in your validator in order to participate. If the slots would be full and the minimum delegation would be for example
300 $KYVE, you have to have **more** than 300 $KYVE delegated in your validator.

:::caution
**INFORMATION**: It does not matter if you archieve the required delegation amount by self delegation or
external delegation, the total delegation into your validator account matters.
:::

:::caution
**IMPORTANT**: If you don't have more $KYVE than the minimum delegation amount you can not continue!
:::

## Create a storage provider wallet

Depending on which storage provider to pool runs on you have to setup a wallet with which you can upload
data with. Currently, there are two available storagep providers:

- [Arweave](https://arweave.org)
- [Bundlr](https://bundlr.network/)

On the pool overview, it is clearly listed which storage provider a pool uses.

### Setting up an Arweave wallet

Arweave is a truly decentralized, permanent data storage solution.

In order to setup an Arweave wallet you need a keyfile which will be the private key of Arweave.
You can get one with some additional funds from the official Arweave faucet (https://faucet.arweave.net/).
Because this amount won't be enough to let validators run for a longer time you have to get some additional
$AR. You can exchange them on common exchanges. We would recommend an amount of ~1 AR which is more than enough.

In order to read in the wallet simply add the flag `--storage-priv "$(cat /path/to/arweave.json)"` later once
the node gets started.

### Setting up a Bundlr wallet

Bundlr is a layer 2 solution for Arweave, bundling transactions and therefore making it much more scalable
with garanteed transaction finality.

In order to setup a Bundlr wallet follow the exact same steps as in **Setting up an Arweave wallet**. After
completing the above steps the easiest way to setup the bundlr wallet is to install the Bundlr CLI:

```bash
npm install -g @bundlr-network/client
```

In order to fund the bundlr node simply execute the following, where arweave.json is your Arweave keyfile
which holds some funds:

```bash
$ bundlr fund 1000000000000 -h https://node1.bundlr.network -w arweave.json -c arweave

> ? Confirmation: send 1000000000000 Winston to dev.bundlr.network (35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo)?
> Y / N y
> Funding receipt:
> Amount: 1000000000000 with Fee: 1379016 to 35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo
> ID: 7cI6jpfpx6A2z8F5AoVHvZn9Az_BWPgvKzBCoE5w07A
```

In this example we funded Bundlr with 1 $AR which should be more than enough. After about ~30 mins
you can view your balance with:

```bash
$ bundlr balance 35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo -h https://node1.bundlr.network -c arweave

> Balance: 1000000000000 Winston (1AR)
```

In order to withdraw your funds from Bundlr simply execute:

```bash
$ bundlr withdraw 500000000000 -h https://node1.bundlr.network -w arweave.json -c arweave

> ? Confirmation: withdraw 500000000000 winston from node1.bundlr.network (35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo)?
> Y / N y
> Withdrawal request for 500000000000 winston successful
> Transaction ID: xcmxJmHyNS502fzqiT66rNeIOSldKGDWR8XsL9auDfs with network fee 1379016 for a total cost of 2858032
```

In order to read in the wallet simply add the flag `--storage-priv "$(cat /path/to/arweave.json)"` later once
the node gets started.

More information about the Bundlr CLI can be found [here](https://docs.bundlr.network/docs/client/cli)

## Create a Validator account

With a pool you can join now and a well funded storage provider account you can finally create your validator account which will hold all of your self delegation. The first step is to connect your wallet to the KYVE app.

:::caution
**IMPORTANT**: We would highly recommend creating the valaccount from a cold wallet like a Ledger since
this wallet will hold all of your delegation and rewards. If you loose that wallet you loose all of your stake.
You just need to connect this wallet to the app in order to create the account or claim your rewards later.
:::

Once you have a wallet connected to the app you have to enable the `Expert mode`. This mode allows you to create a validator account with the currently connected
wallet. You can find the expert mode button in the drawer on the left right at the bottom.

![expert mode](/img/expert_mode.png)

With expert mode enabled you can now head over to the `Validators` page and click on the top right to
create a Validator.

![create validator](/img/create_validator.png)

If the validator was successfully created you should have been routed to your dedicated validator page were
you can see all the information about your validator including other delegations and performance metrics.

## 2. Run protocol nodes

Running a protocol node can be done in 3 ways, we recommend running the node with Option 1.

### Option 1: Run with KYSOR (recommended)

**Running nodes with KYSOR has the following benefits:**

- Only use **one** program to run on **every** pool
- Not installing and compiling protocol binaries **manually** for every pool
- Getting the new upgrade binaries during a pool upgrade **automatically** and therefore **don't risk timeout slashes**
- Make running protocol nodes **standardized** and **easier**

**Installation**

Get the latest release of the KYSOR binaries [here](https://github.com/KYVENetwork/kyvejs/releases?q=kysor&expanded=true)

```bash
wget https://github.com/KYVENetwork/kyvejs/releases/download/%40kyve%2Fkysor%40$VERSION/kysor-linux-x64.zip
```

```bash
unzip kysor-linux-x64.zip
```

```bash
mv kysor-linux-x64 kysor
```

```bash
chmod 700 kysor
```

Available KYSOR binaries for platforms:

linux-arm64

```bash
wget https://github.com/KYVENetwork/kyvejs/releases/download/%40kyve%2Fkysor%401.0.0-beta.1/kysor-linux-arm64.zip
```

linux-x64

```bash
wget https://github.com/KYVENetwork/kyvejs/releases/download/%40kyve%2Fkysor%401.0.0-beta.1/kysor-linux-x64.zip
```

macos-x64

```bash
wget https://github.com/KYVENetwork/kyvejs/releases/download/%40kyve%2Fkysor%401.0.0-beta.1/kysor-macos-x64.zip
```

To verify that the KYSOR runs successfully just run

```bash
./kysor version
```

**Initialize KYSOR**

Once you have successfully downloaded the KYSOR binary you have to initialize it.

When you init the KYSOR you need to specify the network you should run on and if the KYSOR should automatically download and execute the binaries for you. Since we are in korellia testnet
we would recommend initializing with the following properties:

```bash
./kysor init --chain-id korellia --rpc https://rpc.korellia.kyve.network/ --rest https://api.korellia.kyve.network/ --auto-download-binaries
```

This command creates a `config.toml` under the following directory: `$HOME/.kysor/`. You can edit this file if you wish to change the chain Id or the auto download feature.

:::caution
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

:::caution
**INFORMATION**: Of course multiple valaccounts can be created for each pool. We would recommend naming the valaccounts after the pool you want to run with this account on like in this case `moonbeam` for example. These names are just used locally for config management. Also if you have multiple valaccounts running on the same machine you are required to change the port of the metrics server (if enabled of course) so the don't overlap.
:::

**Run the KYSOR**

After you have created the required valaccounts you can simply start running the KYSOR with the following command:

```bash
./kysor start --valaccount moonbeam
```

When KYSOR is running, you can proceed with step 3.

You can also start the process in debug mode by adding the `--debug` flag like this:

```bash
./kysor start --valaccount moonbeam --debug
```

**Run KYSOR on multiple pools**

If you want to run KYSOR with multiple pools you only have to edit one configuration in the valaccounts. The Protocol Nodes starts a metrics prometheus server if the option `metrics` is enabled. On default the metrics server is available under the following endpoint: `http://localhost:8080/metrics`. If you start on multiple pools those servers would collide because of the same port. You can solve this by editing the valaccounts config toml and specifying a different port for each valaccount.

**Run the KYSOR without auto download**

If you want to run the KYSOR without auto download enabled like it would be recommended in mainnet just set the property `autoDownloadBinaries` to false in the `$HOME/.kysor/config.toml`. After that you should restart the KYSOR to make changes available.

Before an upgrade you are then required to prebuild the upgrade binaries **yourself** and place them in the correct path. Once you have the upgrade binary compiled move them to the following directory **before** the upgrade:

```bash
mv kyve-upgrade-binary $HOME/.kysor/upgrades/pool-$POOL/$VERSION/bin
```

$POOL is the pool id where the binary should run on. For example for the Moonbeam pool with pool id `0` and upgrade version `1.0.0-beta.6` you should move the upgrade binary to the following folder:

```bash
mv kyve-moonbeam-binary $HOME/.kysor/upgrades/pool-0/1.0.0-beta.6/bin/
```

The upgrade binaries of each version in korellia will be available here: [github.com/KYVENetwork/kyvejs/releases](https://github.com/KYVENetwork/kyvejs/releases)

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

### Option 2: Run prebuild binaries

You can download the current protocol node binaries here: [github.com/KYVENetwork/kyvejs/releases](https://github.com/KYVENetwork/kyvejs/releases)

For example, if we want to run on the Moonbeam pool with Pool Id _0_ we can do the following:

```bash
wget todo
unzip kyve-linux-x64.zip
chmod 700 kyve-linux-x64
```

In order to pass secrets like the valaccount mnemonic or the private key file of the storage provider we export them to the environment.
This can be done in the following way:

```bash
export VALACCOUNT_MOONBEAM="your mnemonic ..."
export STORAGE_PRIV_MOONBEAM="$(cat path/to/arweave.json)"
```

To run the protocol node the following command needs to be executed:

```bash
./kyve-linux-x64 start
--pool 0 \
--valaccount VALACCOUNT_MOONBEAM
--storage-priv STORAGE_PRIV_MOONBEAM \
--chain-id "korellia" \
--metrics
```

The valaccount has to be created prior to this step. The easiest way is to just create it with Keplr or Cosmostation wallet and then export it.

The logs and the cache files are generated in the current directory. You can specify the home directory with the optional flag _--home_.

The prometheus metrics server runs default on port 8080, you can overwrite that with the optional flag _--metrics-port_

### Option 3: Compile binaries yourself and run manually

For compiling the node protocol binaries yourself you can clone the KYVE monorepo here [github.com/KYVENetwork/kyvejs](https://github.com/KYVENetwork/kyvejs).

To build the evm binaries execute the following commands:

```bash
git clone git@github.com:KYVENetwork/kyvejs.git
cd kyvejs

yarn install
yarn setup

cd integrations/evm
yarn build:binaries
```

After that the binaries should be available under the following path: `/integrations/evm/out/*`

## 3. Finally join a pool with a valaccount

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

For the last option you can do a one time transfer so that the valaccount has some $KYVE to pay for transaction fees. We would recommend sending 100 $KYVE for the start which typically lasts for about 1 month. Make sure that the valaccount always has enough $KYVE to pay for the fees, otherwise you are again in danger of receiving a timeout slash.

Once you have joined the pool the node should continue in about ~10 seconds. After that you are successfully participating in a pool.

## 4. Join multiple pools if you want to increase your rewards

This step is optional, but the more pools you participate in the higher the rewards. If you want to join another pool just repeat the steps from point 4. You can see all the pools you are participating in your validator page.

:::caution
**WARNING**: But beware, joining for example a second pool might double your rewards, but it would also double the danger of getting slashed.
:::