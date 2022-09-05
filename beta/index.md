# Beta Network

The beta network contains the most recent developed features and is expected to have errors.
Basic knowledge about cosmos-sdk and linux servers is highly recommended.

### Major Change: Interpool security
The biggest difference to the current korellia network is the feature of interpool-security.
From now on, there is only one staker entry per address. And a staker can join multiple pools. 


### Explorer and Website
- [explorer.beta.kyve.network](https://explorer.beta.kyve.network/kyve-betanet/staking)
- [app.beta.kyve.network](https://app.beta.kyve.network/)

For $KYVE ask in the Discord-Beta testers channels. 

### Setting up a chain node

The process of setting up a beta node is similar to the general guide
[here](/validators/chain-node.md). However, less disk space is required, as
the network does not have that many transactions and is resettet here and then.

#### Obtaining binaries
```bash
wget TODO
tar -xvzf chain_linux_amd64.tar.gz

# The [moniker] is a human-readable name for your node
./chaind init [moniker] --chain-id kyve-beta
```

Obtain the genesis:
```bash
wget https://github.com/KYVENetwork/chain/releases/download/v0.0.1/genesis.json
# move to the chain-node directory
mv genesis.json ~/.kyve/config/genesis.json
```

Start the chain
```bash
./chaind start --p2p.persistent_peers TODO
```


#### Cosmovisor, Systemd and Validators
The setup of cosmovisor and systemd is the same as described [here](/validators/chain-nodemd#setup-cosmovisor)
and [here](validators/chain-node.md#setting-up-deamon-service).

For [Becoming a validator](validators/chain-node.md#becoming-a-validator) keep in mind to use the correct chain-id `kyve-beta`.

### Setting up protocol nodes
_Work in progress_
