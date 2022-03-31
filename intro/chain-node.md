---
title: Running a chain node
order: 2
parent:
  title: Introduction
  order: 1
---

# Running a chain node

### Requirements

Minimum requirements

- 3vCPU
- 4GB RAM
- 80GB DISK

```
sudo apt update
sudo apt install zip -y
```

## Manual Installation

### Download binaries

```
mkdir kyvebinary && cd kyvebinary
wget https://nc.breithecker.de/index.php/s/wKMRSZy3goxnaHT/download/kyve_beta-2022-03-30.zip
unzip kyve_beta-2022-03-30.zip
tar -xvf  chain_linux_amd64.tar.gz
sudo mv chaind kyved
sudo mv kyved /usr/bin/
kyved init <node_name>
mv genesis.json ~/.kyve/config/
cd .. && rm -rf kyvebinary
```

### Check the kyved version

```
kyved version
```

you should see: `latest-1211bcef`

### Create keys and save all info

```
kyved keys add validator
```

### Go to Discord faucet and get some $KYVE

_The wallet address you will use is the wallet we created in the previous step_

```
!faucet send <your_kyve_address>
```

### Configuration setup

Set seeds to your config

```
wget https://raw.githubusercontent.com/Errorist79/seeds/main/seeds.txt -O $HOME/.kyve/config/seeds.txt
sed -i.bak 's/seeds = \"\"/seeds = \"'$(cat $HOME/.kyve/config/seeds.txt)'\"/g' $HOME/.kyve/config/config.toml
```

### Create systemd

```
sudo tee <<EOF >/dev/null /etc/systemd/system/kyved.service
[Unit]
Description=Kyved Cosmos daemon
After=network-online.target

[Service]
User=$USER
ExecStart=/usr/bin/kyved start
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

cat /etc/systemd/system/kyved.service
sudo systemctl enable kyved
```

### Start services

```
sudo systemctl daemon-reload
sudo systemctl restart kyved
```

### Check logs

```
# change log settings and check logs

sed -i 's/#Storage=auto/Storage=persistent/g' /etc/systemd/journald.conf
sudo systemctl restart systemd-journald

journalctl -u kyved.service -f -n 100
```

### Set environments and create validator

Set environments

Replace **“YOUR_MONİKER”** with your node name.

```
echo export CHAIN_ID=kyve-beta >> $HOME/.profile
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
kyved tx staking delegate {VALOPER_ADDRESS} {STAKE_AMOUNT}tkyve --from validator --chain-id kyve-beta
```

Unjail

```
kyved tx slashing unjail  --chain-id kyve-beta --from validator
```
