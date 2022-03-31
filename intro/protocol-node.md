---
title: Running a protocol node
order: 3
parent:
  title: Introduction
  order: 1
---

# Running a protocol node

### Requirements

Wallets

- A [Keplr](https://keplr.app) wallet with $KYVE. (You can claim some [here](https://app.kyve.network/faucet))
- An [Arweave](https://arweave.org/) keyfile with some funds. (You can claim some [here](https://faucet.arweave.net/))

Minimum hardware requirements

- 1vCPU
- 4GB RAM
- 1GB DISK

```
sudo apt update
sudo apt install zip -y
```

### Claim some $KYVE

Before continuing, make sure that you have the [Keplr](https://keplr.app) wallet installed in your browser. Head over to the [KYVE app](https://app.kyve.network) and make sure to connect your wallet (this automatically adds and switches to the KYVE network).

Go to the faucet tab and claim some tokens via one of three faucets. The wheel is the easiest option.

### Manually build the binaries

Clone the EVM repository and make sure your are on branch `main`. Now run the following command to install dependencies and build the binaries

```
yarn install
yarn build:binaries
```

> Note: In the future we will add Docker support and release the prebuilt binaries to GitHub

### Verify that your binary has been built correctly

The step above should have created a directory called `out` with three binaries. Now execute the correct binary that matches your operating system using the following command (example is on a MacOS machine)

```
./out/evm-macos --help
```

If everything is set up correctly you should see the following

```
Usage: @kyve/evm [options]

Options:
  --name <string>           The identifier name of the node. [optional, default = auto generated]
  -p, --poolId <number>     The id of the pool you want to run on.
  -m, --mnemonic <string>   Your mnemonic of your account.
  -k, --keyfile <string>    The path to your Arweave keyfile.
  -n, --network <string>    The chain id of the network. [optional, default = beta] (default: "beta")
  -sp, --space <number>     The size of disk space in bytes the node is allowed to use. [optional, default = 1000000000 (1 GB)] (default: "1000000000")
  -b, --batchSize <number>  The batch size of fetching items from datasource. For synchronous fetching enter 1. [optional, default = 1] (default: "1")
  --metrics                 Run Prometheus metrics server. [optional, default = false] (default: false)
  -v, --verbose             Run node in verbose mode. [optional, default = false] (default: false)
  --version                 output the version number
  -h, --help                display help for command
```

### Run your node

To run your node, copy your Arweave keyfile into your working directory and fetch the mnemonic from Keplr.

Run the following command with the same binary as above

```
./out/evm-macos -p 0 -m "your mnemonic in here ..." -k ./arweave.json -n beta
```

If your node has started correctly, it should print some logs and idle while it waits for you to stake some $KYVE

```
2022-03-31 11:02:16.289  INFO  🚀 Starting node ...

        Node name     = spotty-tomato-marmoset
        Address       = kyve1ungug8m2cuk7rtslvnlkuql2elyve6ed0s3vgn
        Pool Id       = 1
        Cache height  = 0
        @kyve/core    = v0.2.2
        @kyve/evm     = v0.2.0

2022-03-31 11:02:16.291  DEBUG Attempting to fetch pool state.
2022-03-31 11:02:16.568  INFO  💻 Running node on runtime @kyve/evm.
2022-03-31 11:02:16.572  INFO  ⏱  Pool version requirements met
2022-03-31 11:02:16.573  INFO  ✅ Fetched pool state
2022-03-31 11:02:16.573  DEBUG Attempting to verify node.
2022-03-31 11:02:16.574  INFO  🔍  Node is running as a validator.

2022-03-31 11:02:16.575  INFO  ⚡️ Starting new proposal
2022-03-31 11:02:17.123  INFO  🧐 Selected as VALIDATOR
2022-03-31 11:02:17.512  DEBUG Waiting for new proposal ...
```
