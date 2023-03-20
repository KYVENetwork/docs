---
sidebar_position: 3
---

# Installation

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
git checkout tags/<tag> -b <tag>
make build
```

Here the <code><tag\></code> is the latest version which you can get <a href="https://github.com/KYVENetwork/chain/tags">here</a>.

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

Here the <code><tag\></code> is the latest version which you can get <a href="https://github.com/KYVENetwork/chain/tags">here</a>.

:::tip
**Note:** You can find the compiled binary under <code>chain/build/kyved</code>
:::

After the download was done, verify that it was successful:

```bash
./kyved version
```

  </TabItem>
  <TabItem value="korellia" label="Korellia">
    Since the source code of korellia is still close source the binaries have to be obtained by simply downloading them.
    
    Here is a list for every supported OS with the current version <code>v0.8.0</code><br/><br/>

**linux/amd64**

```bash
wget https://s3.eu-central-1.amazonaws.com/files.kyve.network/chain/v0.8.0/kyved_linux_amd64.tar.gz
tar -xvzf kyved_linux_amd64.tar.gz
mv chaind kyved
```

**linux/arm64**

```bash
wget https://s3.eu-central-1.amazonaws.com/files.kyve.network/chain/v0.8.0/kyved_darwin_arm64.tar.gz
tar -xvzf kyved_linux_arm64.tar.gz
mv chaind kyved
```

**darwin/amd64**

```bash
wget https://s3.eu-central-1.amazonaws.com/files.kyve.network/chain/v0.8.0/kyved_darwin_amd64.tar.gz
tar -xvzf kyved_darwin_amd64.tar.gz
mv chaind kyved
```

**linux/arm64**

```bash
wget https://s3.eu-central-1.amazonaws.com/files.kyve.network/chain/v0.8.0/kyved_linux_arm64.tar.gz
tar -xvzf kyved_linux_arm64.tar.gz
mv chaind kyved
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
