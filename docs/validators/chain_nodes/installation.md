---
sidebar_position: 3
---

# Installation

## Versions

Depending on the network one may need to run different versions. The following
table shows the upgrade block height for a given version:

| Tag                                                                          | Kaon                                                               | Mainnet                                            |
|------------------------------------------------------------------------------|--------------------------------------------------------------------|----------------------------------------------------|
| [`v1.0.0-rc0`](https://github.com/KYVENetwork/chain/releases/tag/v1.0.0-rc0) | 0                                                                  | -                                                  |
| [`v1.0.0-rc1`](https://github.com/KYVENetwork/chain/releases/tag/v1.0.0-rc1) | [443300](https://viewblock.io/de/kyve/block/443300?network=kaon)   | -                                                  |
| [`v1.0.0`](https://github.com/KYVENetwork/chain/releases/tag/v1.0.0)         | -                                                                  | 0                                                  |
| [`v1.1.0`](https://github.com/KYVENetwork/chain/releases/tag/v1.1.0)         | [1115111](https://viewblock.io/de/kyve/block/1115111?network=kaon) | [826000](https://mintscan.io/kyve/blocks/826000)   |
| [`v1.2.0`](https://github.com/KYVENetwork/chain/releases/tag/v1.2.0)         | [1502502](https://viewblock.io/de/kyve/block/1502502?network=kaon) | [1135000](https://mintscan.io/kyve/blocks/1135000) |
| [`v1.3.0`](https://github.com/KYVENetwork/chain/releases/tag/v1.3.0)         | [2341100](https://viewblock.io/de/kyve/block/2341100?network=kaon) | [2061100](https://mintscan.io/kyve/blocks/2061100) |
| [`v1.4.0`](https://github.com/KYVENetwork/chain/releases/tag/v1.4.0)         | [4185500](https://viewblock.io/de/kyve/block/4185500?network=kaon) | [3908000](https://mintscan.io/kyve/blocks/3908000) |
| [`v1.5.0`](https://github.com/KYVENetwork/chain/releases/tag/v1.5.0)         | [7571371](https://viewblock.io/de/kyve/block/7571371?network=kaon) | [7254527](https://mintscan.io/kyve/blocks/7254527) |

For the Korellia devnet there is no version map. Only the latest version via
statesync is supported.

## Obtain binaries

Depending on which network you want to join you have to obtain the binaries differently.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">
  For mainnet the binaries have to be build manually.
  <br/><br/>
  <strong>Install Go</strong>
  <br/>
  KYVE is built using <a href="https://go.dev/dl/">Go</a> version <code>1.20+</code>.
  Follow the instructions from the official website to install go.

```bash
go version # e.g. go version go1.20.1 linux/amd64
```

In addition to Go, make sure you have <code>git</code> and <code>make</code> installed.

<strong>GitHub</strong>

Clone and build KYVE using <code>git</code>:

```
git clone https://github.com/KYVENetwork/chain.git
cd chain
git fetch
git checkout tags/<tag>
make build ENV=mainnet
```

Here the <code>&lt;tag&gt;</code> is the latest version which you can get <a href="https://github.com/KYVENetwork/chain/tags">here</a>.

:::tip
**Note:** You can find the compiled binary under <code>chain/build/kyved</code>
:::

After the download was done, verify that it was successful:

```bash
./kyved version
```

  </TabItem>
  <TabItem value="kaon" label="Kaon">
  For Kaon the binaries have to be build manually.
  <br/><br/>
  <strong>Install Go</strong>
  <br/>
  KYVE is built using <a href="https://go.dev/dl/">Go</a> version <code>1.20+</code>.
  Follow the instructions from the official website to install go.

```bash
go version # e.g. go version go1.20.1 linux/amd64
```

In addition to Go, make sure you have <code>git</code> and <code>make</code> installed.

<strong>GitHub</strong>

Clone and build KYVE using <code>git</code>:

```
git clone https://github.com/KYVENetwork/chain.git
cd chain
git fetch
git checkout tags/<tag> -b <tag>
make build ENV=kaon
```

Here the <code>&lt;tag&gt;</code> is the latest version which you can get <a href="https://github.com/KYVENetwork/chain/tags">here</a>.

:::tip
**Note:** You can find the compiled binary under <code>chain/build/kyved</code>
:::

After the download was done, verify that it was successful:

```bash
./kyved version
```

  </TabItem>
  <TabItem value="korellia" label="Korellia">
    Korellia does not follow any release schedule. Usually it's in sync with the latest
    stable release branch and it uses the <code>kaon</code> build environment.
    Here is a list for every supported OS with the current version <code>v1.4.0</code><br/><br/>

**linux/amd64**

```bash
wget https://github.com/KYVENetwork/chain/releases/download/v1.5.0/kyved_kaon_linux_amd64
chmod +x kyved_kaon_linux_amd64
```

**linux/arm64**

```bash
wget https://github.com/KYVENetwork/chain/releases/download/v1.5.0/kyved_kaon_linux_arm64
chmod +x kyved_kaon_linux_arm64
```

**darwin/amd64**

```bash
wget https://github.com/KYVENetwork/chain/releases/download/v1.5.0/kyved_kaon_darwin_amd64
chmod +x kyved_kaon_darwin_amd64
```

**darwin/arm64**

```bash
wget https://github.com/KYVENetwork/chain/releases/download/v1.5.0/kyved_kaon_darwin_arm64
chmod +x kyved_kaon_darwin_arm64
```

After the installation is done, verify that it was successful:

```bash
./kyved version
```

  </TabItem>
</Tabs>

## Initialize Node

We need to initialize the node to create all the necessary validator and node configuration files

<Tabs groupId="network">
  <TabItem value="kyve" label="Mainnet">
<strong>Save Chain ID</strong>
<br/>
We recommend saving the chain-id into your kyved's client.toml. This will make it so you do not have to manually pass in the chain-id flag for every CLI command.
<br/><br/>

```bash
./kyved config chain-id kyve-1
```

<strong>Initialize</strong>
<br/>
Initialize node by providing your moniker and the chain id
<br/><br/>

```bash
./kyved init <your_custom_moniker> --chain-id kyve-1
```

:::caution
**IMPORTANT:** Monikers can contain only ASCII characters. Using Unicode characters will render your node unreachable.
:::
</TabItem>
<TabItem value="kaon" label="Kaon">
<strong>Save Chain ID</strong>
<br/>
We recommend saving the chain-id into your kyved's client.toml. This will make it so you do not have to manually pass in the chain-id flag for every CLI command.
<br/><br/>

```bash
./kyved config chain-id kaon-1
```

<strong>Initialize</strong>
<br/>
Initialize node by providing your moniker and the chain id
<br/><br/>

```bash
./kyved init <your_custom_moniker> --chain-id kaon-1
```

:::caution
**IMPORTANT:** Monikers can contain only ASCII characters. Using Unicode characters will render your node unreachable.
:::
</TabItem>
<TabItem value="korellia" label="Korellia">
<strong>Save Chain ID</strong>
<br/>
We recommend saving the chain-id into your kyved's client.toml. This will make it so you do not have to manually pass in the chain-id flag for every CLI command.
<br/><br/>

```bash
./kyved config chain-id korellia
```

<strong>Initialize</strong>
<br/>
Initialize node by providing your moniker and the chain id
<br/><br/>

```bash
./kyved init <your_custom_moniker> --chain-id korellia
```

:::caution
**IMPORTANT:** Monikers can contain only ASCII characters. Using Unicode characters will render your node unreachable.
:::
</TabItem>
</Tabs>

Once the installation and initialization was successful you can proceed to the node configuration.
