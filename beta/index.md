# Beta Network

The beta network contains the most recent developed features and is expected to have errors.
Basic knowledge about cosmos-sdk and linux servers is highly recommended.

### Major Change: Interpool security

The biggest difference to the current Korellia network is the feature of interpool-security.
From now on, there is only one staker entry per address. And a staker can join multiple pools. Joining multiple pools means more rewards, but this comes also with the danger of being more vulnerable to slashes.

![interpool security](https://cdn.discordapp.com/attachments/889827445132374036/1016716774122733628/interpool_security.png)

### Explorer and Website

- [explorer.beta.kyve.network](https://explorer.beta.kyve.network/kyve-betanet/staking)
- [kyve-beta.netlify.app/#/](https://kyve-beta.netlify.app/#/)

For $KYVE ask in the Discord beta-testers channels.

### Setting up a chain node

The process of setting up a beta node is similar to the general guide
[here](/validators/chain-node.md). However, less disk space is required, as
the network does not have that many transactions and is resettet here and then.

#### Obtaining the beta binaries

```bash
wget https://nc2.breithecker.de/s/BY4Lzj8TAQzgJZm/download/chain_linux_amd64.tar.gz
tar -xvzf chain_linux_amd64.tar.gz

# The [moniker] is a human-readable name for your node
./chaind init [moniker] --chain-id kyve-beta
```

Obtain the beta genesis:

```bash
wget https://nc2.breithecker.de/s/z3bDsQk8D6snyWA/download/genesis-v0.7.0-beta.json
# move to the chain-node directory
mv genesis-v0.7.0-beta.json ~/.kyve/config/genesis.json
```

Start the chain

```bash
./chaind start --p2p.persistent_peers="410bf0cb2cdb9a6e159c14b9d01531b9ecb1edd4@3.70.26.46:26656"
```

#### Cosmovisor, Systemd and Validators

The setup of cosmovisor and systemd is the same as described [here](/validators/chain-node.md#setup-cosmovisor)
and [here](validators/chain-node.md#setting-up-deamon-service).

For [Becoming a validator](validators/chain-node.md#becoming-a-validator) keep in mind to use the correct chain-id `kyve-beta`.

### Setting up protocol nodes

#### 1. Create the validator

In order to create your validator visit the beta KYVE app [kyve-beta.netlify.app/#/validators](https://kyve-beta.netlify.app/#/validators) and click on `Become a validator`.

There you can choose your preferred `self delegation` which is the same as `stake` before. The self delegation determines the probability of creating bundles and therefore earning rewards. If the validator misbehaves the self delegation will get partially slashed.
Others can also delegate to you. This will improve your probability of earning more rewards. To attract them, you can change your commission under `Manage Commission` on your validator page. If the validator misbehaves those delegators will get slashed, too.

After the validator got created you can view your validator in detail by clicking on it. If you want to change your moniker, website and even your logo you can do that by clicking on `Manage Validator` and then on `Manage Metadata`

#### 2. Get and build the protocol node binaries

After successfully creating the validator the protocol node binaries have to be build and prepared. The current development repository is available here [github.com/KYVENetwork/node](https://github.com/KYVENetwork/node). For the beta network only pools
with the evm runtime will be available, so this tutorial will only focus on building the evm binaries.

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

#### 3. Add the arweave.json keyfile to the file backend

It is also required to have an Arweave account in order to save data on Arweave. The keyfile needs to be added to the file backend. This can also be done with the binary CLI in the following way:

```bash
./out/kyve-linux wallets add "my_first_wallet" "$(cat /path/to/arweave.json)"
```

The command saves the content of your `arweave.json` keyfile into the encrypted file backend. More information about the wallet CLI can be found with `./out/kyve-macos wallets -h`

#### 4. Create a valaccount

With the new Interpool-Security feature a single validator can join multiple pools. For every pool a validator wants to join he needs a `Valaccount`. A valaccount just consists of a separate KYVE address, which is just used to run one protocol node on one pool with the authorization of the main validator account. A valaccount address, or in short a `Valaddress` can be created with the help of the binary CLI in the following way:

```bash
./out/kyve-linux valaccounts create "my-first-valaccount"
```

This command generates a complete new and random valaddress for you and saves in an encrypted file backend. More information on the valaccount CLI can be found with `./out/kyve-macos valaccounts -h`

#### 5. Start the binary on the pool you want to join

In our example we want to join the Moonbeam Pool. For that you only need to know the Pool Id which can be found by clicking on a pool. In our case the Pool Id of Moonbeam is `0`. We also want to check if the self delegation is higher than the minimum self delegation of the pool in order to join. This is important, because pools still have limited slots (50).

If the following information is clear the protocol binary can be started with the following command:

```bash
./out/kyve-linux start --pool 0 --account my-first-valaccount --wallet my_first_wallet --network beta --verbose
```

This will start the node and should produce the following logs:

```bash
2022-09-06 13:53:09.136  INFO  Valaccount my-first-valaccount has not joined the pool with id 0 yet
2022-09-06 13:53:09.138  INFO  Visit https://app.kyve.network/#/pools/0 and add join the pool with the following information:

2022-09-06 13:53:09.139  INFO  Valaddress:    kyve1qkqjus0hg0qnhz97jzmljx8aaghj0zkne2d24q
2022-09-06 13:53:09.140  INFO  Valname:       considerable-red-guineafowl

2022-09-06 13:53:09.140  INFO  The node will not continue until the account is authorized
```

It will pause on the first startup because as the last step it needs to be authorized from the main validator account to run for it.

#### 6. Finally join a pool with a valaccount

Now that the node is already running it just needs the authorization from its main validator account in order to run for this validator and generate rewards. For that visit your validator page and click on `Join existing pool`.

A dialog should open where you should select the pool you want to join (here Moonbeam). After that enter the Valaddress that needs to be authorized and the Valname, which just serves as a security that the node has actually been started. (If you join a pool without having the node running you are in danger of receiving a timeout slash because once you join a pool you are expected to validate and upload data). For the last option you can do a one time transfer so that the valaccount has some $KYVE to pay for transaction fees. We would recommend sending 1000 $KYVE for the start. Make sure that the valaccount always has enough $KYVE to pay for the fees, otherwise you are again in danger of receiving a timeout slash.

Once you have joined the pool the node should continue in about ~10 seconds. After that you are successfully participating in a pool.

#### 7. Join other pools if you want to increase your rewards

This step is optional, but the more pools you participate in the higher the rewards. If you want to join another pool just repeat the steps from point 4. You can see all the pools you are participating in your validator page.

But beware, joining for example a second pool might double your rewards, but it would also double the danger of getting slashed.
