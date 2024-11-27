---
sidebar_position: 3
---

# Requirements

Before you can run a protocol validator on any pool, there are some basic requirements that have to be met, ranging from simple hardware specs to owning a certain amount of \$KYVE and other currencies.

## Supported OS

We officially support macOS and Linux in the following architectures:

- `macos-x64`
- `linux-x64`
- `linux-arm64`

## Minimum Hardware Requirements

To run the protocol node the following hardware requirements are needed. Please note that the source node will have additional hardware requirements.

- 1 or more physical CPU cores
- 2 GB RAM
- 32 GB DISK
- 1mbps network bandwidth

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
data with. Currently, there the following storage providers are available:

- [Arweave](https://arweave.org)
- [Irys](https://irys.xyz)
- [Turbo](https://ardrive.io/turbo-bundler/)

On the pool overview, it is clearly listed which storage provider a pool uses.

### Setting up an Arweave Wallet

Arweave is a truly decentralized, permanent data storage solution.

In order to setup an Arweave wallet which is also required if you want to setup an Irys wallet you need a keyfile which will be the private key of Arweave.
You can generate an Arweave wallet [here](https://arweave.app/). You can exchange $AR on common exchanges. We would recommend an amount of ~1 AR which is more than enough for a few weeks or even months.

Store the keyfile in a secure location you will need it again later in the installation process.

### Setting up an Irys Wallet

Irys is a layer 2 solution for Arweave, bundling transactions and therefore making it much more scalable
with guaranteed transaction finality.

In order to setup an Irys wallet follow the exact same steps as in **Setting up an Arweave wallet**. After
completing the above steps the easiest way to setup the Irys wallet is to install the Irys CLI
(depending on your setup, you may need to use the sudo command).

```bash
npm i -g @irys/sdk
sudo npm i -g @irys/sdk
```

In order to fund the Irys node simply execute the following, where `arweave.json` is your Arweave keyfile
which holds some funds:

:::caution
**IMPORTANT**: Always use `https://node1.irys.xyz` as the host to fund your irys account since KYVE uses this by default
:::

```bash
$ irys fund 1000000000000 -h https://node1.irys.xyz -w arweave.json -t arweave

> ? Confirmation: send 1000000000000 Winston to dev.irys.network (35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo)?
> Y / N y
> Funding receipt:
> Amount: 1000000000000 with Fee: 1379016 to 35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo
> ID: 7cI6jpfpx6A2z8F5AoVHvZn9Az_BWPgvKzBCoE5w07A
```

In this example we funded Irys with 1 $AR which should be more than enough. After about ~30 minutes
you can view your balance with:

```bash
$ irys balance 35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo -h https://node1.irys.xyz -t arweave

> Balance: 1000000000000 Winston (1AR)
```

In order to withdraw your funds from Irys simply execute:

```bash
$ irys withdraw 500000000000 -h https://node1.irys.xyz -w arweave.json -t arweave

> ? Confirmation: withdraw 500000000000 winston from node1.irys.network (35jqt51H71Tf4YmZfoGvN9FLw62a4aPnLgZa9KLdwLo)?
> Y / N y
> Withdrawal request for 500000000000 winston successful
> Transaction ID: xcmxJmHyNS502fzqiT66rNeIOSldKGDWR8XsL9auDfs with network fee 1379016 for a total cost of 2858032
```

More information about the Irys CLI can be found [here](https://docs.irys.xyz/developer-docs/cli).

Store the keyfile in a secure location you will need it again later in the installation process.

### Setting up a Turbo Wallet

Turbo is a layer 2 solution for Arweave, bundling transactions and therefore making it much more scalable
with guaranteed transaction finality. An additional benefit of using the Turbo storage solution is that
certain coins like \$KYVE can also be used for funding which minimizes the complexity of operating KYVE
protocol nodes.

:::info
To migrate from Irys to Turbo if you are using Kysor simply replace the `storagePriv` value with the
Turbo mnemonic in your `.kysor/valaccounts/<valaccount>.toml` file and restart.
:::

Since it is possible to pay with $KYVE directly from your KYVE account to pay for storage fees you
first have to decide what wallet you want to use for that. We recommend setting up a completely new KYVE wallet
dedicated only for Storage fees. You can then use this wallet for all the protocol nodes on the different
pools you are in. This has the benefit that you can monitor your expenses more easily and don’t need to
fund multiple wallets for each pool all the time. If you do not provide a wallet the protocol node by
default will use the valaccount, in this case no value `–-storage-priv` has to be set.

In case you want to use a single KYVE wallet to pay for storage you have to provide the mnemonic either
at the binary start command if you don’t use KYSOR with `–storage-priv “your mnemonic …”` or in the
`valaccount.toml` if you use KYSOR. An example `valaccount.toml` could look like this:

```toml
pool = 2
valaccount = "your valaccount mnemonic …"
storagePriv = "your storage mnemonic …"
requestBackoff = "50"
cache = "jsonfile"
metrics = true
metricsPort = "8080"
```

After you have set up your KYVE wallet you can install the Turbo SDK in order to top up your wallet so
you are able to pay for storage fees. First install it with the following commands:

```bash
npm i -g @ardrive/turbo-sdk
yarn global add @ardrive/turbo-sdk
```

In order to upload with Turbo you need to fund your account with \$KYVE, of course you can also still
fund with \$AR if that is preferred.

You always receive credits after funding which are in value equal to $AR. You can preview the conversions
before funding with:

```bash
$ turbo price --value 300 --type kyve

> Current price estimate for 300 kyve is ~0.239517454785 Credits
```

:::caution
**IMPORTANT**: \$KYVE can not be defunded again, so only fund the amount that you actually need!
:::

Example of funding 300 \$KYVE:

```bash
$ turbo crypto-fund --value 300 --token kyve --mnemonic "your_mnemonic"

> Transaction details:
>
>   Amount: 300 kyve
>   Target: kyve1clmuh5sjw73784lg0gnf4p07qefzrtk78an698
>   Credits received: 0.240351511231
>   Credit recipient: kyve1z6huufuclqd8h349wgkd4mu8wfvq8k30tskra0
>   Network fees: (Gas fees apply)
>
> This payment is non-refundable.  Proceed with transaction?
```

Once your transaction was successful you can verify it with checking your credit balance:

```bash
$ turbo balance --address kyve1z6huufuclqd8h349wgkd4mu8wfvq8k30tskra0

> Turbo Balance for Native Address "kyve1z6huufuclqd8h349wgkd4mu8wfvq8k30tskra0"
> Credits: 0.241308174763
```

More information about the Turbo CLI can be found [here](https://github.com/ardriveapp/turbo-sdk?tab=readme-ov-file).

Store the mnemonic in a secure location you will need it again later in the installation process.
