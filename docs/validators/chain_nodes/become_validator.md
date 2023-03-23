---
sidebar_position: 5
---

# Become a Validator

A validator is a full synced cosmos node which directly participates in
the Proof of Stake mechanism. Running a validator is only for node operators
with advanced knowledge in the cosmos ecosystem.

## Requirements

Make sure you have followed all instructions from the docs, i.e.:
- Have the node correctly initialised with the correct binary.
- Have done all necessary configurations.
- Have configured Cosmovisor and a system supervisor (like systemd).
- Joined and synced the network

Verify you have joined the network by querying:

```shell
curl localhost:26657/status
```
and making sure `result.node_info.network` and `result.node_info.latest_block_height`
matches the network you want to join.

## Important Security Configurations

Before joining a network you should make sure that you also fulfill these
additional configurations.

### Recommended Configurations
- Keep your host environment always up to date. Use production ready operating systems.
- Make sure you always have enough disk-space and good internet connection.
- Run the chain node only with **user**-privileges. **Do not use the root account**.
- Use a firewall to only expose the tendermint port `26656`.
- Connect your prometheus endpoint to a monitoring service like Datadog or Grafana. Configure alerts in case your node stops producing blocks.
- Utilise a [Sentry-Node-Architecture](https://forum.cosmos.network/t/sentry-node-architecture-overview/454), so that your node is never exposed directly to the p2p network.

### Advanced Configuration
- Use a Key Management System for Tendermint like [tmkms](https://github.com/iqlusioninc/tmkms).
- Use [Horcrux](https://github.com/strangelove-ventures/horcrux) for distributing your signing key across multiple nodes.

## Create Your Validator

Before creating a validator you need two keys. One key, the *Operating Key*, 
is for managing your validator and keeping your funds. The other one is the 
*Private Node Key* and is only for signing blocks. In case the latter gets 
compromised you only risk a slash but not loosing your entire funds.

### Private Node Key

The private node key gets created while initialising the node. It is located at
`~/.kyve/config/priv_validator_key.json`.

:::danger
**WARNING**: The private node key is not encrypted. Make sure it has the right 
read permissions and only the user running the node is able to read it.
There are some advanced protection mechanisms like <a href="https://github.com/iqlusioninc/tmkms">tmkms</a> 
and <a href="https://github.com/strangelove-ventures/horcrux">Horcrux</a>.
:::

If you want to create a new or different node key run `./kyved init <moniker>` 
on your local machine and copy the contents to your validator.

### Operating Key

:::warning
**WARNING**: The operating key needs to be carefully protected and should 
reside in a safe place.
:::

We refer to [Wallets](/token_holders/wallets.md) for operating key creation. 
We recommend to consider the following things:

- Use a multi-sig setup
- Use a local machine for signing your transaction
- Use a Ledger
- Use all the three above


## The Create-Validator Transaction

After the secure node setup and the creation of a private operating key is done,
it's time to sign the message which will actually turn your node into a validator.

Before we can start, log in to your validator node and obtain the private node
public key with

```shell
remote$ ./kyved tendermint show-validator
```
and copy the results for later.

Now go back to your local machine, we assume a local machine with Ledger
(but no multi-sig).

```bash
local$ ./kyved keys add <key_name> --ledger
```

To become a validator you need $KYVE. There are currently 100 validator slots, if all slots are taken you need to stake more than the lowest one in the list to take its place. Please make sure that you have enough balance in your wallet before you proceed.

<br></br>

:::caution
This example shows how to create a validator on our testnet Kaon. Please note that Kaon's base denom is "tkyve" and has 6 decimals.

```
1 $KYVE = 1000000tkyve
```
:::

```bash
./kyved tx staking create-validator \
  --amount=<amount>tkyve \
  --pubkey="<your-validator-public-node-key>" \
  --moniker="<moniker>" \
  --chain-id=kaon-1 \
  --ledger \
  --commission-rate="0.05" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1000000" \
  --node https://rpc-eu-1.kaon.kyve.network:443
  --gas="auto" \
  --from=<key_name>
```

For running a node on mainnet one needs to use `ukyve` instead of `tkyve` 
and the mainnet chain-id as well as a mainnet rpc node.

