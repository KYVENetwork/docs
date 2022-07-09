---
title: Running a chain node
order: 4
parent:
  title: Introduction
  order: 1
---

# Running a Chain-Node

The Chain-Nodes are the backbone of KYVE. The chain layer is a
completely sovereign [Proof of Stake](https://en.wikipedia.org/wiki/Proof_of_stake)
blockchain build with [Ignite](https://ignite.com/). This
blockchain is run by independent nodes we call _Chain-Nodes_
since they're running on the chain level. The native currency
of the KYVE chain is [$KYVE](/basics/kyve.md), it secures the chain
and allows chain nodes to stake and other users to delegate into them.

#### Requirements

Minimum requirements

- 2vCPU
- 2GB RAM (plus 8GB SWAP during chain-upgrades)
- 150GB DISK

The disk requirements will keep on expanding over time: the 150GB figure was valid
on May 7th 2022 but it will not stay that way forever. Consider giving 2 to 3 times
that amount in order to avoid having to resize your volumes too quickly.

## Genesis Installation

::: warning
**IMPORTANT**:
This guide assumes a GNU/Linux amd64 system.
:::

During the time, chain-upgrades occur but the blockchains stays the same.
Therefore, it is necessary to process older blocks with the appropriate version.
We use Cosmovisor to handle automatic upgrades. The setup is explained after
the initial setup.

In the genesis setup the node will be fully configured. After that one needs to configure
the Cosmovisor.

#### Obtaining the binaries

We provide prebuilt binaries on the chain [GitHub repo](https://github.com/KYVENetwork/chain/releases/tag/v0.0.1).
Please refer to the [Readme](https://github.com/KYVENetwork/chain) for instructions on how to build them.

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

Start the chain the first time:

```bash
./chaind start --p2p.seeds=02dd2c26948ea758a25d3dbc91744f8897681652@3.73.27.185:26656
```

The node should now be starting to sync the chain. If it doesn't, you can always look
for other peers [here](https://rpc.korellia.kyve.network/net_info) and use it with
the `p2p.persistent_peers` param, for example:

```bash
---p2p.persistent_peers 70556c82352b9919fb6f339b9da0ebc587e9148c@3.68.232.117:26656
```

::: warning
**IMPORTANT**:
The node can be stopped with `ctrl + c`. You do not need to wait for it to sync. Setting up a daemon service is explained later in this chapter.
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

The build instructions can be found [here](https://github.com/cosmos/cosmos-sdk/tree/master/cosmovisor),
but we do provide the [Linux binary](https://github.com/KYVENetwork/chain/releases/download/v0.0.1/cosmovisor_linux_amd64) for convenience purposes.

```bash
wget https://github.com/KYVENetwork/chain/releases/download/v0.0.1/cosmovisor_linux_amd64 && \
mv cosmovisor_linux_amd64 cosmovisor && \
chmod +x cosmovisor
```

Setup the directory

```bash
mkdir -p ~/.kyve/cosmovisor/genesis/bin/ && \
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

Start Cosmovisor

```bash
./cosmovisor start
```

Cosmovisor can be stopped with `strg + C`. Setting up a daemon service is explained later in this chapter.

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

The `$UPGRADE_NAME` will be the name of the tag of the commit. And is also specified in the governance proposal.

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
sudo systemctl enable kyved
sudo systemctl start kyved
```

It can be stopped using

```bash
sudo systemctl stop kyved
```

You can see its logs with

```bash
journalctl -u kyved
```

## Becoming a validator

To become a validator you need [$KYVE](/basics/kyve.md).
There are currently 100 validator slots, if all slots are taken
you need to stake more than the lowest one in the list to take its place.

Make sure your node is fully synced and configured correctly.

Create a key or import an existing one

```shell
./chaind keys add [your-key-name]
# or
./chaind keys add [your-key-name] --recover
# It then asks for the mnemonic
```

Make sure you have enough balance in your wallet.

Become a validator by submitting the `create-validator` transaction to the network.
You need to substitute `[amount]`, `[moniker]` and `[your-key-name]`

```
./chaind tx staking create-validator --yes \
 --amount [amount]tkyve \
 --moniker [moniker] \
 --commission-rate "0.10" \
 --commission-max-rate "0.20" \
 --commission-max-change-rate "0.01" \
 --min-self-delegation "1" \
 --pubkey "$(./chaind tendermint show-validator)" \
 --from [your-key-name] \
 --chain-id korellia
```

Learn your _valoper_ address

```
./chaind keys show [your-key-name] -a --bech val
```

Delegate additional stake

```
./chaind tx staking delegate [VALOPER_ADDRESS] [STAKE_AMOUNT]tkyve --from [your-key-name] --chain-id korellia
```

Unjail

```
./chaind tx slashing unjail --chain-id korellia --from [your-key-name]
```
