---
sidebar_position: 2
---

# Requirements

Before you can run consensus validators some basic requirements have to be met ranging from simple hardware specs to owning a certain amount of $KYVE.

## Supported OS

We officially support macOS and Linux in the following architectures:

- `darwin/amd64`
- `darwin/arm64`
- `linux/amd64`
- `linux/arm64`

## Minimum Hardware Requirements

To run mainnet of testnet protocol validators, you will need a machine with the following minimum hardware requirements:

- 2 or more physical CPU cores
- At least 250 GB of disk storage
- At least 16 GB of memory (RAM)
- At least 50mbps network bandwidth

As the usage of the blockchain grows, the server requirements may increase as well, so you should have a plan for updating your server as well.

## Minimum staking requirements

Because only the top 100 validators who have the most stake can join in one of the limited validator slots you first have to verify
if you have enough $KYVE to join. If there are still slots open, you just need more than zero, but if all slots are occupied you need at least more than the lowest validator. You can check this on our block explorers:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">
    Mainnet validators: <a href="https://explorer.kyve.network/kyve/staking">https://explorer.kyve.network/kyve/staking</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    Kaon validators: <a href="https://explorer.kyve.network/kaon/staking">https://explorer.kyve.network/kaon/staking</a>
  </TabItem>
  <TabItem value="korellia" label="Korellia">
    Korellia validators: <a href="https://explorer.kyve.network/korellia/staking">https://explorer.kyve.network/korellia/staking</a>
  </TabItem>
</Tabs>
