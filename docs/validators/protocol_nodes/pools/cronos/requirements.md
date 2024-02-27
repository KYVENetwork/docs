---
sidebar_position: 2
---

# Requirements

Before you can run protocol validators on the Cronos pool, there are some basic requirements that have to be met, ranging from simple hardware specs to owning a certain amount of \$KYVE and other currencies.

## Supported OS

We officially support macOS and Linux in the following architectures:

- `macos-x64`
- `linux-x64`
- `linux-arm64`

## Minimum Hardware Requirements

To run mainnet or testnet protocol validators, you will need a machine with the following minimum hardware requirements:

- 8 or more physical CPU cores
- At least 1.5 TB of disk storage
- At least 32 GB of memory (RAM)
- At least 100mbps network bandwidth

## Pool Delegation Requirements

### Verify if you have enough \$KYVE to participate

Due to a limited number of validator slots in each pool, only the nodes with the highest delegation can claim
a validator slot. You can only claim a validator slot if you have **more than the minimum delegation amount**.

To check the minimum delegation amount you can click on the tab `Validators` once you have selected a pool. There you should see something like this:

![min delegation](/img/min_delegation.png)

In this case, there are still 45 free validator slots, so you just have to have more than 0 \$KYVE of delegation in order to participate. If the slots would be full and the minimum delegation would be, for example,
300 \$KYVE, you have to have **more** than 300 \$KYVE delegated in your validator.

:::caution
**IMPORTANT**: If you don't have more \$KYVE than the minimum delegation amount, you can not continue
:::

## Storage Provider Requirements

Because a data pool is always archiving the data on a web3 storage provider, the protocol validator
must have access to a funded wallet in order to be able to actually upload data to those storage providers.

Depending on which storage provider the pool runs, on you have to setup a wallet with which you can upload
data with. Currently, there are two available storage providers:

- [Arweave](https://arweave.org)
- [Bundlr](https://bundlr.network/)

On the pool overview, it is clearly listed which storage provider a pool uses.

### Setting up an Arweave Wallet

Arweave is a truly decentralized, permanent data storage solution.

In order to setup an Arweave wallet which is also required if you want to setup a Bundlr wallet you need a keyfile which will be the private key of Arweave.
You can generate an Arweave wallet [here](https://arweave.app/). You can exchange $AR on common exchanges. We would recommend an amount of ~1 AR which is more than enough for a few weeks or even months.

Store the keyfile in a secure location you will need it again later in the installation process.

### Setting up a Bundlr Wallet

Bundlr is a layer 2 solution for Arweave, bundling transactions and therefore making it much more scalable
with guaranteed transaction finality.

In order to setup a Bundlr wallet follow the exact same steps as in **Setting up an Arweave wallet**. After
completing the above steps the easiest way to setup the Bundlr wallet is to install the Bundlr CLI:

```bash
npm install -g @bundlr-network/client
```

In order to fund the Bundlr node simply execute the following, where `arweave.json` is your Arweave keyfile
which holds some funds:

:::caution
**IMPORTANT**: Always use `https://node1.bundlr.network` as the host to fund your bundlr account since KYVE uses this by default
:::

```bash
$ bundlr fund 1000000000000 -h https://node1.bundlr.network -w arweave.json -c arweave

> ? Confirmation: send 1000000000000 Winston to dev.bundlr.network (35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo)?
> Y / N y
> Funding receipt:
> Amount: 1000000000000 with Fee: 1379016 to 35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo
> ID: 7cI6jpfpx6A2z8F5AoVHvZn9Az_BWPgvKzBCoE5w07A
```

In this example we funded Bundlr with 1 $AR which should be more than enough. After about ~30 minutes
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

More information about the Bundlr CLI can be found [here](https://docs.bundlr.network/docs/client/cli).

Store the keyfile in a secure location you will need it again later in the installation process.
