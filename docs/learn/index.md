---
sidebar_position: 1
---

# High-level Overview

## What is KYVE

As the Web3 space expands, decentralized and completely accurate data becomes more difficult for the public to access.
Ultimately, this leads to major scalability issues due to difficulty in data access, and dangerous data inconsistencies
from the lack of proper data validation before use.

In order to provide a trustless and more secure future for Web3’s data infrastructure, it is imperative that we target these
issues of data access and true validity. How? Via KYVE.

The **KYVE Network** is revolutionizing customized access to on- and off-chain data by providing fast and easy tooling for
decentralized data validation, immutability, and retrieval.

With these tools, developers, data engineers, and others can easily and reliably access the trustless data they need in
order to continue building the future of Web3.

## Getting started
Read into KYVE or learn with the KYVE Academy:
- **[KYVE Academy](https://kyve.academy/)** - Start with dedicated tutorials about KYVE

## KYVE’s Layer 1 blockchain

KYVE is its own Proof of Stake (PoS) Layer 1 blockchain built with the [Cosmos SDK](https://v1.cosmos.network/sdk). It has two layers: the **Chain Layer**, and the **Protocol
Layer**, each with their own node infrastructure.

The Chain Layer which is the consensus layer, is the backbone of KYVE and is an entirely sovereign Proof of Stake (PoS) blockchain built with/on
[Ignite](https://ignitedao.io/about-ignite-dao/). It’s run by independent nodes, which enable users to support and secure the KYVE blockchain.

:::info
Interested in [running a consensus validator ?](/validators/chain_nodes/overview)
:::

Sitting on top of the consensus layer is the Protocol Layer, which enables the actual use case of KYVE’s data lake. This
includes data pools, funding, staking, and delegation.

The protocol layer has its own protocol validators, which are responsible for collecting data from a data source, bundling
and uploading it to any decentralized storage solution, then validating it and keeping track of which data is truly
valid for its users to tap into. This enables KYVE to store any data permanently and in a decentralized manner, creating
a Web3 data lake.

:::info
Interested in [running a protocol validator ?](/validators/protocol_nodes/overview)
:::

## KYVE Network Stack

The KYVE Network Stack is currently made up of:

1. KYVE, the Web3 data lake for fetching, storing, and validating data;
2. Data Pipeline, our ELT pipeline for accessing KYVE data;
3. More products coming soon.

## Interact with KYVE

### Accessing KYVE Data

KYVE’s trustless data is accessible to all for free. Currently, there are two ways to access KYVE’s
trustless data:

- Via KYVE’s Data Pipeline: This is a no-code, customizable option for easily importing KYVE’s data into a
  preferred data backend before transforming the data into the format needed. For now, KYVE’s Data Pipeline pulls data from Korellia devnet. Once the protocol layer launches on mainnet, the Data Pipeline will pull from the mainnet network.

- Using KYVE’s REST-API: This option provides a native way to access data by coding your own solution using KYVE’s REST-API.

More solutions for accessing KYVE’s data will come in the near future.

:::info
Interested in [accessing KYVE data ?](/developers/data_engineers/accessing_data/using_rest)
:::

### Storing Data Through KYVE

Storing data on KYVE is a completely customizable experience, enabling users to create a data pool, determine what data
needs to be stored and validated as well as where to gather it and then where to store it.

KYVE is storage agnostic. By default, you can store data through KYVE onto [Arweave](https://www.arweave.org/), or code in your own storage
solution. More storage providers are to be added in the near future.

:::info
Interested in [storing KYVE data ?](/developers/data_engineers/adding_data/)
:::

## \$KYVE

To tie the network together, KYVE has its own native coin, \$KYVE, which has multiple uses:

- On the chain level, \$KYVE is used for staking and delegating, securing the network through Proof of Stake.
- On the protocol level, \$KYVE is used for funding, staking, and delegating, providing security for uploaded data.
- On the governance level, \$KYVE is used for submitting and voting on proposals, allowing stakeholders to have a say in
  the evolution and growth of KYVE.

TGE was on March 14th, 2023. Visit our [tokenomics](https://www.kyve.network/tokenomics) to find out more regarding \$KYVE utility, claims, and unlocks. Find more about \$KYVE via [CoinMarketCap](https://coinmarketcap.com/currencies/kyve-network).

## Partnered with KYVE

KYVE is currently partnered with:

- Polkadot & Kusama
- Near
- Solana
- Mina
- Moonbeam
- Avalanche
- Stacks
- Cosmos
- Evmos
- Injective
- Celo
- Aurora
- Zilliqa
- Axelar
- Sei Network
- Archway
