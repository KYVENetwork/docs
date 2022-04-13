---
title: Running a protocol node
order: 3
parent:
  title: Introduction
  order: 1
---

# Running a protocol node

The Protocol-nodes are the backbone of a KYVE pool. They are responsible
for collecting data from a data source, bundling and uploading them to Arweave and verifying it. This enables KYVE
to store any data stream decentralized and permanently.

### Requirements

Wallets

- A [Keplr](https://keplr.app) wallet with $KYVE. (You can claim some [here](https://app.kyve.network/faucet))
- An [Arweave](https://arweave.org/) keyfile with some AR. (You can claim some [here](https://faucet.arweave.net/))

Minimum hardware requirements

- 1vCPU
- 4GB RAM
- 1GB DISK

### Get some $KYVE

Before continuing, make sure that you have the [Keplr](https://keplr.app) wallet installed in your browser. Head over to the [KYVE app](https://app.kyve.network) and make sure to connect your wallet (this automatically adds and switches to the KYVE network).

Go to the faucet tab and claim some tokens via one of three faucets. The wheel is the easiest option.

::: warning
**IMPORTANT**: Make sure that you are on the correct app URL `https://app.kyve.network`
:::

### Choose a pool

Before you can run a protocol node you have to choose a pool you want to join. You can find an overview of all pools
in the KYVE app [here](https://app.kyve.network/). Once you have chosen a pool you have to remember the pool id and the
pool runtime for later. You can find this information right below the pool name once you have clicked on a pool in the overview. In this example we have chosen the first pool with the pool id `0` and the runtime `@kyve/evm`.

### Verify that you can claim a validator slot

Due to a limited number of validator slots in each pool only the nodes with the highest stake can claim
a validator slot. You can only claim a validator slot if you have **more than the minimum staking amount**.

To check the minimum staking amount you can click on the tab `Validators` once you have selected a pool. There you should see something like this:

![minimum stake](/minimum_stake.png)

In this case all validator slots are occupied, but since the minimum staking amount is 300 $KYVE you just need to have more than 300 to claim a slot. If the minimum staking amount is zero you just have to have more than zero $KYVE.

::: warning
**IMPORTANT**: If you don't have more $KYVE than the minimum staking amount you can not continue!
:::

### Get the prebuilt binaries (recommended)

For our case, the prebuilt binaries every operating system can be downloaded [here](https://github.com/KYVENetwork/evm/releases).

In general, you can get the binaries by clicking on the `Become a validator` button and following the steps until you're on the section `Get node binaries`.

![become validator](/become_validator.png)

Once you're there click the button `KYVE node` which should lead you to the github repository.

![protocol binaries](/protocol_binaries.png)

Once you're on releases you can download the latest binary for your operating system. In our case we download the `evm-macos.zip` and unzip it locally.

![protocol binary download](/protocol_binary_download.png)

When you have downloaded and unzipped the binary correctly you can proceed to [how to verify your binary](/intro/protocol-node.md#verify-that-your-binary-has-been-built-correctly)

### Manually build the binaries

Since we want to run a protocol node on a `@kyve/evm` runtime pool we have to clone the correct repository. In our
case clone the [EVM repository](https://github.com/KYVENetwork/evm) and make sure your are on branch `main`.

```bash
git clone https://github.com/KYVENetwork/evm.git
cd evm
```

Now run the following commands to install dependencies and build the binaries

```bash
yarn install
yarn build:binaries
```

Once the binaries have been build you should see three binaries (one for every operating system) in the `out` directory.

### Verify that your binary has been built correctly

Execute the binary using the following command to see the available options (example is on a MacOS machine)

```bash
./evm-macos --help
```

If everything is set up correctly you should see the following

```
Usage: @kyve/evm [options]

Options:
  --name <string>              The identifier name of the node. [optional, default = auto generated]
  -p, --poolId <number>        The id of the pool you want to run on.
  -m, --mnemonic <string>      Your mnemonic of your account.
  -k, --keyfile <string>       The path to your Arweave keyfile.
  -s, --initialStake <number>  Your initial stake the node should start with. Flag is ignored node is already staked [unit = $KYVE].
  -n, --network <string>       The chain id of the network. [optional, default = korellia] (default: "alpha")
  -sp, --space <number>        The size of disk space in bytes the node is allowed to use. [optional, default = 1000000000 (1 GB)] (default: "1000000000")
  -b, --batchSize <number>     The batch size of fetching items from datasource. For synchronous fetching enter 1. [optional, default = 1]
  --metrics                    Run Prometheus metrics server. [optional, default = false] (default: false)
  -v, --verbose                Run node in verbose mode. [optional, default = false] (default: false)
  --version                    output the version number
  -h, --help                   display help for command
```

### Start your node

To run your node, copy your Arweave keyfile into your working directory and fetch the mnemonic from Keplr.
Here it is important that you enter the correct `--poolId`, your `--mnemonic` and your desired `--initialStake`.
In our case, we initially stake 10,000 $KYVE to ensure that we get a validator slot.

Run the following command with the same binary as above

```bash
./evm-macos --poolId 0 --mnemonic "your mnemonic in here ..." --initialStake 10000 --keyfile ./arweave.json --network korellia
```

If your node has started correctly, it should print some logs like this:

```
2022-04-07 14:43:18.673  INFO  Starting node ...

2022-04-07 14:43:18.676  INFO  Name               = cute-maroon-pinniped
2022-04-07 14:43:18.736  INFO  Address            = kyve1zpmetvqgeuh6ua4q5cnajay6u4uhuuvnjt85m7
2022-04-07 14:43:18.737  INFO  Pool Id            = 0
2022-04-07 14:43:18.737  INFO  @kyve/core         = v1.0.2
2022-04-07 14:43:18.738  INFO  @kyve/evm          = v1.0.1

2022-04-07 14:43:18.739  DEBUG Attempting to fetch pool state.
2022-04-07 14:43:19.059  INFO  Running node on runtime @kyve/evm.
2022-04-07 14:43:19.064  INFO  Pool version requirements met
2022-04-07 14:43:19.066  INFO  Fetched pool state
2022-04-07 14:43:19.172  DEBUG Staking 100.0000 $KYVE ...
2022-04-07 14:43:19.883  DEBUG Transaction = FA101B41873129D16937947ED1460F48A8EFD693B9CD7F12E65F221B5B7C9556
2022-04-07 14:43:26.243  INFO  Successfully staked 100.0000 $KYVE
2022-04-07 14:43:26.246  INFO  Running node with a stake of 100.0000 $KYVE

2022-04-07 14:43:26.247  INFO  Joining KYVE network ...

2022-04-07 14:43:26.370  DEBUG Attempting to verify node.
2022-04-07 14:43:26.371  INFO  Node is running as a validator.

2022-04-07 14:43:26.374  INFO  Starting new proposal
2022-04-07 14:43:26.377  INFO  Cached to height = 0
2022-04-07 14:43:26.489  INFO  Selected as VALIDATOR
2022-04-07 14:43:26.608  INFO  Validating bundle sYNwr1BttK_WmIkjXJILjjcn60IHSX64QpBqi2fCyuU
2022-04-07 14:43:26.776  DEBUG Downloading bundle from Arweave ...
2022-04-07 14:43:27.648  DEBUG Successfully downloaded bundle from Arweave

...
```

### Verify node stake

When you look at your node logs you should then see that the node is starting to verify bundles.

After you have successfully staked you should see your address in the Pool validators table.

![verify stake](/verify_stake.png)

Also, you can now manage your stake through the app under `Manage stake`.
