---
title: Running a chain node
order: 2
parent:
  title: Introduction
  order: 1
---

# Running a Chain-Node

The Chain-Nodes are the backbone of KYVE. The chain layer is a 
completely sovereign [Proof of Stake](https://en.wikipedia.org/wiki/Proof_of_stake)
blockchain build with [Starport](https://starport.com/). This 
blockchain is run by independent nodes we call _Chain-Nodes_ 
since they're running on the chain level. The native currency 
of the KYVE chain is $[KYVE](/basics/kyve.md), it secures the chain 
and allows chain nodes to stake and other users to delegate into them.


#### Requirements

Minimum requirements

- 2vCPU
- 1GB RAM
- 80GB DISK

The guide uses GNU/Linux for the operating system.

## Genesis Installation

During the time, chain-upgrades occur but the blockchains stays the same.
Therefore, it is necessary to process older blocks with the appropriate version.
We use Cosmovisor the handle automatic upgrades. The setup is explained after
the initial setup.

In the genesis setup the node will be fully configured. After that one needs to configure
the Cosmovisor.

#### Obtaining the binaries

We provide prebuilt binaries on GitHub ([https://github.com/KYVENetwork/chain/releases/tag/v0.0.1](https://github.com/KYVENetwork/chain/releases/tag/v0.0.1))
For building the binaries we refer to the `Readme.md` in [https://github.com/KYVENetwork/chain](https://github.com/KYVENetwork/chain).

Assuming an amd64 Linux system:
```bash
wget https://github.com/KYVENetwork/chain/releases/download/v0.0.1/chain_linux_amd64.tar.gz
tar -xvzf chain_linux_amd64.tar.gz

# The [moniker] is a human-readable name for your node
./chaind init [moniker] --chain-id korellia
```

Obtain the genesis
```bash
wget https://github.com/KYVENetwork/chain/releases/download/v0.0.1/genesis.json
# move to the chain-node directory
mv genesis.json ~/.kyve/config/genesis.json
```

It is important to start with the oldest version `v0.0.1` (the genesis version).

Start the chain the first time
```bash
./chaind start --p2p.seeds=e56574f922ff41c68b80700266dfc9e01ecae383@18.156.198.41:26656
```

The node now starts to sync the blockchain.

::: warning
**IMPORTANT**:
The node can be stopped with `strg + C`. You do not need to wait for it to sync. Setting up a daemon service is explained later in this chapter.
:::


The seed only needs to be provided for the first startup.
It is then automatically saved to the address book.

The chain will start to sync until the first governance upgrade
proposal starts to occur. The Chain-Node will halt and probably print a
"CONSENSUS FAILURE" error. When this happens the next released binary
needs to be started.

To avoid replacing the binaries manually and allow automatic updates
we recommend setting up the Cosmovisor.

## Setup Cosmovisor

The Cosmovisor is a tool that listens to on-chain governance proposals
and automatically replaces the binary.

The build instructions can be found at [https://github.com/cosmos/cosmos-sdk/tree/master/cosmovisor](https://github.com/cosmos/cosmos-sdk/tree/master/cosmovisor)
For now we also provide the binary for linux at [https://github.com/KYVENetwork/chain/releases/download/v0.0.1/cosmovisor_linux_amd64](https://github.com/KYVENetwork/chain/releases/download/v0.0.1/cosmovisor_linux_amd64)

```bash
wget https://github.com/KYVENetwork/chain/releases/download/v0.0.1/cosmovisor_linux_amd64
mv cosmovisor_linux_amd64 cosmovisor
chmod +x cosmovisor
```

Setup the directory
```bash
mkdir -p ~/.kyve/cosmovisor/genesis/bin/
echo "{}" > ~/.kyve/cosmovisor/genesis/upgrade-info.json
```

Copy the binary from the first section to the Cosmovisor directory.
```bash
cp chaind ~/.kyve/cosmovisor/genesis/bin/chaind
```

Then export the following environment variables:

```bash
export DAEMON_HOME="$HOME/.kyve"
export DAEMON_NAME="chaind"

# optional on whether auto-download should be enabled
# for a simple node setup we recommend to leave this true
export DAEMON_ALLOW_DOWNLOAD_BINARIES="true"
```
::: warning
**IMPORTANT**: For production grade validator nodes it is highly recommended turning off auto download and downloading binaries manually instead.
:::

Start the Cosmovisor
```bash
./cosmovisor start
```

The Cosmovisor can be stopped with `strg + C`. Setting up a daemon service is explained later in this chapter.


#### Obtaining binaries manually

This is needed when `DAEMON_ALLOW_DOWNLOAD_BINARIES` is set to `false`.

When a new chain-upgrade proposal occurs, users have multiple days time to vote on it.
The upgrade-proposal specifies an exact block-height on which the upgrade will be performed.
When the proposal is up for vote the GitHub repository is already updated with the new tag and version.

Node-runners then have to check out the specific tag and build the binary on their on.
After that the binary needs to be copied to the Cosmovisor directory.

```bash
mv chaind ~/.kyve/cosmovisor/upgrades/$UPGRADE_NAME/bin/chaind
```
The `$UPGRADE_NAME` will be the name of the tag of the commit. And is also specified 
in the governance proposal.


## Setting up Deamon-service

For the daemon service root-privileges are required during the setup.

Create a service file.
$USER is the Linux user which runs the process. Replace it before you copy the command

```bash
tee <<EOF > /dev/null /etc/systemd/system/kyved.service
[Unit]
Description=KYVE Chain-Node daemon
After=network-online.target

[Service]
User=$USER
ExecStart=/home/$USER/cosmovisor start
Restart=on-failure
RestartSec=3
LimitNOFILE=infinity

Environment="DAEMON_HOME=/home/$USER/.kyve"
Environment="DAEMON_NAME=chaind"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=true"

[Install]
WantedBy=multi-user.target
EOF
```

Start the daemon
```bash
sudo systemctl start kyved
```


## Becoming a validator

_Will be added soon!_



<!-- ### Go to Discord faucet and get some $KYVE

_The wallet address you will use is the wallet we created in the previous step_

```
!faucet send <your_kyve_address>
```


### Set environments and create validator

Set environments

Replace **“YOUR_MONİKER”** with your node name.

```
echo export CHAIN_ID=kyve-korellia >> $HOME/.profile
echo export MONIKER=YOUR_MONİKER >> $HOME/.profile
source $HOME/.profile
```

Create validator

```
kyved tx staking create-validator --yes \
 --amount 19000000000tkyve \
 --moniker $MONIKER \
 --commission-rate "0.10" \
 --commission-max-rate "0.20" \
 --commission-max-change-rate "0.01" \
 --min-self-delegation "1" \
 --pubkey "$(kyved tendermint show-validator)" \
 --from validator \
 --chain-id $CHAIN_ID
```

## Additional commands

Stop the node:

```
systemctl stop kyved
```

Start the node:

```
systemctl start kyved
```

Check your balance

```
kyved q bank balances {ADDRESS}
```

Learn your _valoper_ address

```
kyved keys show validator -a --bech val
```

Delegate additional stake

```
kyved tx staking delegate {VALOPER_ADDRESS} {STAKE_AMOUNT}tkyve --from validator --chain-id kyve-korellia
```

Unjail

```
kyved tx slashing unjail  --chain-id kyve-korellia --from validator
``` -->
