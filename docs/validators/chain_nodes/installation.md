---
sidebar_position: 3
---

# Installation

Depending on which network you want to join you have to obtain the binaries differently.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="explorers">
  <TabItem value="korellia" label="Korellia">
    Since the source code of korellia is still close source the binaries have to be obtained by simply downloading them.
    
    Here is a list for every supported OS with the current version <code>v0.8.0</code><br/><br/>


**linux/amd64**
```bash
wget https://kyve-korellia.s3.eu-central-1.amazonaws.com/v0.8.0/kyved_linux_amd64.tar.gz
tar -xvzf kyved_linux_amd64.tar.gz
mv chaind kyved
```

**linux/arm64**
```bash
wget https://kyve-korellia.s3.eu-central-1.amazonaws.com/v0.8.0/kyved_darwin_arm64.tar.gz
tar -xvzf kyved_linux_arm64.tar.gz
mv chaind kyved
```

**darwin/amd64**
```bash
wget https://kyve-korellia.s3.eu-central-1.amazonaws.com/v0.8.0/kyved_darwin_amd64.tar.gz
tar -xvzf kyved_darwin_amd64.tar.gz
mv chaind kyved
```

**linux/arm64**
```bash
wget https://kyve-korellia.s3.eu-central-1.amazonaws.com/v0.8.0/kyved_linux_arm64.tar.gz
tar -xvzf kyved_linux_arm64.tar.gz
mv chaind kyved
```

After the installation is done, verify that it was successful:

```bash
./kyved version
```
  </TabItem>
  <TabItem value="kaon" label="Kaon">
  For kaon the binaries have to be build manually. For that follow the following steps:
  <br/><br/>
  <strong>Install Go</strong>
  <br/>
  KYVE is built using <a href="https://go.dev/dl/">Go</a> version <code>1.19+</code>.
  If the <code>go: command not found</code> error message is returned, confirm that your <a href="https://go.dev/doc/gopath_code#GOPATH">GOPATH</a> is correctly configured by running the following command:
  <br/><br/>

```bash
export PATH=$PATH:$(go env GOPATH)/bin
```

  <strong>GitHub</strong>

  Clone and build KYVE using <code>git</code>:

```
git clone https://github.com/KYVENetwork/chain.git
cd chain
git fetch
git checkout <tag>
make build
```

  Here the <code><tag\></code> is the latest version which you can get <a href="https://github.com/KYVENetwork/chain/tags">here</a>.

:::tip
**Note:** You can find the compiled binary under <code>chain/build/kyved</code>
:::

  After the installation is done, verify that it was successful:

```bash
./kyved version
```
  </TabItem>
  <TabItem value="mainnet" label="Mainnet">
    Coming Soon
  </TabItem>
</Tabs>
