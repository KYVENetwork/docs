---
sidebar_position: 4
---

# Run a validator

TODO: remove once this page has been refactored and split up into the other pages

## Get genesis file

Download the `genesis.json` file and copy it over to the config directory: `~/.kyve/config/genesis.json`. This is a genesis file with the chain-id and genesis account balances.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="korellia" label="Korellia">
    TODO
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    

```bash
wget https://raw.githubusercontent.com/KYVENetwork/networks/c59a8300bc10aa0e28834ecd61ec54c417e95acc/kaon-1/genesis.json
mv genesis.json ~/.kyve/config/
```
  </TabItem>
  <TabItem value="mainnet" label="Mainnet">
    Coming Soon
  </TabItem>
</Tabs>

(TODO: why does this fail for kaon genesis file?)

Then verify the correctness of the genesis configuration file:

```bash
./kyved validate-genesis
```

## Create validator

If you want to create a brand new key execute the following command:

```bash
./kyved keys add <key_name>
```

You can also important an existing mnemonic with the `--recover` flag:

```bash
./kyved keys add <key_name> --recover
```

To become a validator you need $KYVE. There are currently 100 validator slots, if all slots are taken you need to stake more than the lowest one in the list to take its place. Please make sure that you have enough balance in your wallet before you proceed.

<Tabs groupId="network">
  <TabItem value="korellia" label="Korellia">
    Please replace <code>&lt;amount&gt;</code>, <code>&lt;moniker&gt;</code> and <code>&lt;key_name&gt;</code> with your respected values

<br/><br/>

:::danger
**WARNING**: Please not that Korellia's base denom is "tkyve" and has 9 decimals.

```
1 $KYVE = 1000000000tkyve
```
:::

```bash
./kyved tx staking create-validator \
  --amount=<amount>tkyve \
  --pubkey=$(./kyved tendermint show-validator) \
  --moniker=<moniker> \
  --chain-id=korellia \
  --commission-rate="0.05" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --gas="auto" \
  --from=<key_name>
```
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    Please replace <code>&lt;amount&gt;</code>, <code>&lt;moniker&gt;</code> and <code>&lt;key_name&gt;</code> with your respected values

<br/><br/>

:::danger
**WARNING**: Please not that Kaon's base denom is "tkyve" and has 6 decimals.

```
1 $KYVE = 1000000tkyve
```
:::

```bash
./kyved tx staking create-validator \
  --amount=<amount>tkyve \
  --pubkey=$(./kyved tendermint show-validator) \
  --moniker=<moniker> \
  --chain-id=kaon-1 \
  --commission-rate="0.05" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --gas="auto" \
  --from=<key_name>
```
  </TabItem>
  <TabItem value="mainnet" label="Mainnet">
    Coming Soon
  </TabItem>
</Tabs>

Show your **valoper** address:

```bash
./kyved keys show [key_name] -a --bech val
```

## Start node

The final step is to start the nodes. Once enough voting power (+2/3) from the genesis validators is up-and-running, the node will start producing blocks.

```bash
./kyved start
```
