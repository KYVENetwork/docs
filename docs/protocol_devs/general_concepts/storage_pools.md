---
sidebar_position: 1
---

# Storage Pools

## Introduction

Generally, data pools (or just pools) can be described as discrete entities arranged around specific data sources.
Anyone can create them through governance and can store any data stream. They are stored and operate on-chain, making
them completely trustless. They are responsible for actually validating and archiving data by allowing participants (
protocol validator runners) to join a pool and managing the validation process on-chain, thus making the validity of the data
trustless. Data pools which are currently live can be found [here](https://app.kyve.network/#/pools).

**A pool always has to specify the following requirements:**

-   One or more data sources which the pool wants to validate and archive
-   A runtime which has defined how to validate the data
-   A web3 storage provider where validated data should get stored to (for example Arweave)

If those requirements are met protocol validators can join a pool and actually start validating the data.

## Discover Pools

Depending on the network a different set of data pools are currently live and validating/archiving data. To view all
pools simply visit the web app.

### Web App

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">
    <strong>Pools</strong>: <a href="https://app.kyve.network/#/pools">https://app.kyve.network/#/pools</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    <strong>Pools</strong>: <a href="https://app.kaon.kyve.network/#/pools">https://app.kaon.kyve.network/#/pools</a>
  </TabItem>
  <TabItem value="korellia" label="Korellia">
    <strong>Pools</strong>: <a href="https://app.korellia.kyve.network/#/pools">https://app.kyve.network/#/pools</a>
  </TabItem>
</Tabs>

### REST API

Pools can also directly be queried by the following REST API endpoint: `/kyve/query/v1beta1/pools`

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">
    <strong>Pools</strong>: <a href="https://api-eu-1.kyve.network/kyve/query/v1beta1/pools">https://api-eu-1.kyve.network/kyve/query/v1beta1/pools</a>
  </TabItem>
  <TabItem value="kaon" label="Kaon">
    <strong>Pools</strong>: <a href="https://api-eu-1.kaon.kyve.network/kyve/query/v1beta1/pools">https://api-eu-1.kaon.kyve.network/kyve/query/v1beta1/pools</a>
  </TabItem>
  <TabItem value="korellia" label="Korellia">
    <strong>Pools</strong>: <a href="https://api-eu-1.korellia.kyve.network/kyve/query/v1beta1/pools">https://api-eu-1.korellia.kyve.network/kyve/query/v1beta1/pools</a>
  </TabItem>
</Tabs>

:::tip
**Note:** Additionally, a pool can directly be queried by its unique ID: `/kyve/query/v1beta1/pool/{id}`
:::

## Pool Economics

Keeping pools funded and therefore keeping the data flowing while at the same time keeping validators' stakes secured
and incentivized is a challenge. KYVE designed pools to fulfill all those needs.

### Keeping Pools Funded

In order to payout protocol validators and incentivize them the pool needs funds. These funds are provided by _funders_;
they are interested in archiving the data the specific pool handles. This could be the project or the foundation behind
a data source that wants its data to be permanently archived onto Arweave. Besides people interested in making the data
permanent, anyone can become a funder. The only downside is that there are currently no rewards for becoming a funder.
The opposite is the case; being a funder will cost you $KYVE.

Because of limited funding slots, only those who fund the highest amount can claim a funding slot. Currently, there are
50 funding slots available per pool. If there are still funding slots available, you only need to fund more than 0
$KYVE to claim a slot. You have to fund more than the current lowest funder if all slots are occupied, basically
outbidding him.
Once you outbid the current lowest funder, you claim his funding slot. The remaining funds of the outbid funder will be
automatically transferred back to him. This mechanism ensures that only people with the highest interest in archiving
the data can operate as a funder.

### Basic $KYVE Flow

With the funds provided by a funder the flow of $KYVE can be summarized by the diagram below:

<p align="center">
  <img width="70%" src="/img/pool_economics.png" />
</p>

### Keeping Protocol Nodes Incentivized

Protocol validators have many tasks. They have to collect data, bundle them, upload, and submit them. To reward these nodes for
their work and keep them incentivized, they receive bundle rewards when they successfully propose a valid bundle. As described above, those
rewards are funded by funders. But
before the uploader receives his reward, a network fee (usually 1%) is deducted and automatically transferred to the
community pool. You can find more information on the calculation of the uploader reward [here](/protocol_devs/advanced_concepts/uploader_reward_calculation.md).

### Keeping Delegators Incentivized

Delegators are lending $KYVE to protocol validators to help secure the network and helping them to earn more rewards. Delegators have to trust protocol validators
since they also receive a slash proportionally to their delegation. In return for putting the capital at risk delegators receive delegation rewards which are also funded by funders. These rewards are a certain fraction of the entire bundle reward, depending on the nodes commission. You can find more information about the commission
[here](/protocol_devs/advanced_concepts/uploader_reward_calculation.md) and more details about the delegation distribution [here](/protocol_devs/advanced_concepts/delegation_reward_calculation.md).

## Properties

To make data pools as general as possible many parameters were introduced to fit the various requirements of data
streams. For each pool the following state is stored:

### `id`

The unique identifier of each pool. This can not be changed and gets assigned automatically on creation.

### `name`

A human readable name for the pool. Also used when searching for a pool.

### `runtime`

The name of the runtime. For EVM this would be `@kyvejs/evm` for example. It is used in the protocol validator to double
check if the node actually supports this runtime and can take part in the upload/validation process.

### `logo`

A link to an image file. Usually a SVG stored on Arweave.

### `config`

Runtime specific configuration in JSON format. Usually the data sources are stored here and other pool specific
configuration the runtime needs. More information on how to configure this parameter can be found on the dedicated
runtime documentation.

### `start_key`

The key the data pool should start validating from. For blockchains the starting key would be `0` because this would
be the genesis block. For time based data streams this would be the starting date. The format of the start key depends
on the runtime.

### `current_key`

The key the data pool has validated to. If a data pool has for example validated the first 1,000 blocks of a
blockchain the current key would be `1000`.

### `current_summary`

The summary of the latest valid bundle which got validated. The summary of a bundle gets generated in the runtime and is
used to access bundle data on-chain.

### `current_index`

Since the keys are of type string the data pool internally keeps track by using indexes. These indexes are just
counters and in the case of blockchain the index corresponds to the number of blocks validated.

### `total_bundles`

A counter which keeps track of how many valid bundles the pool has produced. Used for metrics.

### `upload_interval`

How long a bundle proposal round should be at least open for voting. Usually between one and five minutes. The unit is
seconds.

### `operating_cost`

The base reward for node operators who successfully proposed a valid bundle. This should cover all fixed costs a node
operator has like server costs, transaction fees etc. in order to operate not in a loss. The unit is in ukyve.

### `min_delegation`

The minimum delegation a data pool should have before it starts validating bundles. Used for security reasons to
prevent for example only one node operator from proposing a bundle with a delegation of only 1 $KYVE. Unit is in ukyve.

### `max_bundle_size`

The maximum amount of data items a bundle can have, otherwise it is automatically flagged as invalid. Prevents uploaders
from submitting huge bundles and therefore destabilizing the bundle validation flow.

### `disabled`

A boolean which indicates whether or not the pool has been temporary disabled by the governance or not. If a pool is
disabled it can not validate bundles and is effectively paused. Only the governance can then enable a pool again.

### `funders`

An array of entries which keep track of users that funded a pool with $KYVE. For that the address and the current
funding amount is stored.

#### `address`

The address of the funder.

#### `amount`

The amount the funder has still left in the pool in ukyve.

### `total_funds`

The total amount of funds in ukyve the pool currently still has left.

### `protocol`

An object which holds all info about the current runtime version and the available binaries for participating as a
validator in this pool.

#### `version`

The version of the runtime. Protocol validators compare for security reasons their runtime version with the pool's version to
ensure correct behaviour.

#### `binaries`

An object in JSON format containing download URLs to the protocol validator binaries. Used by KYSOR if auto download is
enabled.

### `upgrade_plan`

An object which holds all the info when a pool has a scheduled runtime upgrade.

#### `version`

Version is the new runtime version tag of the upgrade.

#### `binaries`

Binaries is the new object in JSON format containing the download links to the new upgrade binaries.

#### `scheduled_at`

A UNIX timestamp of when the upgrade should get applied. If the scheduled time is in the past the upgrade gets applied
immediately. Else it waits until that time is reached.

#### `duration`

Duration is the time in seconds how long the pool should halt while the upgrade is getting applied. During this time no
bundles can get validated. This gives every node validator the time to properly upgrade their binaries before the pool
continues with the newer version. Usually about one day.

### `current_storage_provider_id`

The ID of the storage provider which should get used. Here `1` equals Arweave and `2` equals Irys (previously Bundlr). If it is zero no
storage provider is used and data just gets validated and not archived.

### `current_compression_id`

The ID of the compression which should get used before storing on the storage provider. If it is `1` it used GZip
compression. If it is zero it does no compression.

## Example

Below is the query result from a pool. The actual pool state can be found under 'data'. Additionally, the
corresponding `bundle_proposal` and all protocol validators who have joined the pool are attached with some other information
calculated on the fly.

```json
{
	"id": "0",
	"data": {
		"id": "0",
		"name": "Moonbeam",
		"runtime": "@kyvejs/evm",
		"logo": "ar://9FJDam56yBbmvn8rlamEucATH5UcYqSBw468rlCXn8E",
		"config": "ar://DgdB-2hLrxjhyEEbCML__dgZN5_uS7T6Z5XDkaFh3P0",
		"start_key": "1188653",
		"current_key": "3003881",
		"current_summary": "0x09979a8fecec0a89d9b4d6e43c4bf6b7d31d5f25b140ee64a7b30f75ba021f59",
		"current_index": "3003432",
		"total_bundles": "115984",
		"upload_interval": "120",
		"operating_cost": "2500000000",
		"min_delegation": "100000000000000",
		"max_bundle_size": "100",
		"disabled": false,
		"funders": [
			{
				"address": "kyve1hfvhl7vf635xta2l4y5p4myj23pp7sg08f5rew",
				"amount": "360529737262038"
			}
		],
		"total_funds": "360529737262038",
		"protocol": {
			"version": "1.0.0-beta.6",
			"binaries": "{\"kyve-linux-arm64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Fevm%401.0.0-beta.6/kyve-linux-arm64.zip\",\"kyve-linux-x64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Fevm%401.0.0-beta.6/kyve-linux-x64.zip\",\"kyve-macos-x64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Fevm%401.0.0-beta.6/kyve-macos-x64.zip\"}",
			"last_upgrade": "1675501187"
		},
		"upgrade_plan": {
			"version": "",
			"binaries": "",
			"scheduled_at": "0",
			"duration": "0"
		},
		"current_storage_provider_id": 1,
		"current_compression_id": 1
	},
	"bundle_proposal": {
		"pool_id": "0",
		"storage_id": "H4wmW_jwO_tOETu4aHEUAZjwQ3onyVNq1NLMjRkH_pI",
		"uploader": "kyve12htkqlkx4mmd2fw6d9jpmttyykjdpnadd3w45k",
		"next_uploader": "kyve14yrlpnrwfhtu6u4kux2k8gem04rehulyjldzma",
		"data_size": "22947",
		"bundle_size": "20",
		"to_key": "3003901",
		"bundle_summary": "0x008f89084595a842251558f253ad72810dbd5b879eddf2a610e15cbbc27b853b",
		"data_hash": "682ba4b5fec5f3df18941047c040a75a53ecd49557023906ef8778a7699d9d20",
		"updated_at": "1677077694",
		"voters_valid": [
			"kyve12htkqlkx4mmd2fw6d9jpmttyykjdpnadd3w45k",
			"kyve14yrlpnrwfhtu6u4kux2k8gem04rehulyjldzma",
			"kyve10flshfy53rz0tfmuyt3n2ptx2z0t0rardql4ks"
		],
		"voters_invalid": [],
		"voters_abstain": ["kyve1kslrzlrjw25e9c48ck2j4777m6cqqkcryntfja"],
		"from_key": "3003882",
		"storage_provider_id": 1,
		"compression_id": 1
	},
	"stakers": [
		"kyve10flshfy53rz0tfmuyt3n2ptx2z0t0rardql4ks",
		"kyve10p7hvhef9rwjujtgkqetfznwsfk09w0kwjq8c8",
		"kyve10tv5zp58j90v926gpgn26g97arcmezarsclzws",
		"kyve12gzunma7tr3undhtqqkax7a4xa9xceflu0uwpf",
		"kyve12htkqlkx4mmd2fw6d9jpmttyykjdpnadd3w45k",
		"kyve13xzj5e568n4kwe76ayzmzzuraz6c9vnaslrn3t",
		"kyve14ah6djgs435j8x6h7hxvysdxnaq7u97hf265dp",
		"kyve14s2kxx6n9nx68eefuqg2npc8jq3cfz6j6hw8f7",
		"kyve14yrlpnrwfhtu6u4kux2k8gem04rehulyjldzma",
		"kyve15mt7rmc782jv3sx5dta0ut8k2z38vhrtzcr4sq"
	],
	"total_self_delegation": "1821046243698393",
	"total_delegation": "4509813459035511",
	"status": "POOL_STATUS_ACTIVE"
}
```
