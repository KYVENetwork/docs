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
wget https://nc2.breithecker.de/s/BY4Lzj8TAQzgJZm/download/chain_linux_amd64.tar.gz
tar -xvzf chain_linux_amd64.tar.gz

# The [moniker] is a human-readable name for your node
./chaind init [moniker] --chain-id kyve-beta
```

Obtain the genesis:
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
_Work in progress_
