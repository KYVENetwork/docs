---
sidebar_position: 2
---

# Storage Providers

Storage providers are the backbone of KYVEs data storage. Select the desired ID in your pool configuration to apply them
to your runtime.

## Existing storage providers

| ID | Name                                            | Description                                |
|----|-------------------------------------------------|--------------------------------------------|
| 0  | No Storage                                      | Data does not get stored                   |
| 1  | [Arweave](#arweave)                             | Uses Arweave to store data                 |
| 2  | [Irys](#irys)                                   | Uses Irys to store data on Arweave         |
| 3  | [KYVE Storage Provider](#kyve-storage-provider) | Uses web2 services to store data |
| 3  | [Turbo](#turbo) | Uses ArDrive Turbo services to store data |

:::info
**NOTE**: The default storage provider on mainnet is **Turbo**
:::

### Arweave
[Arweave](https://www.arweave.org/) is a protocol that offers permanent, decentralized storage. The web as
we know it is impermanent and prone to erasure as a strict function of its
centralization. Corollary: hard drives fail, services are taken offline, and information is lost.

The Arweave protocol, on the other hand, is conceived at the base to maximize rates of data
replication across a distributed network of participating resources, alongside a clever endowment structure to ensure the cause in perpetuity. The implications of a permanent, storage-first web are
rangy, no doubt enabling KYVE’s vision.

Because of Arweaves unique feature - Pay
now, store forever - KYVE chose Arweave as a layer 0, laying the foundation for the KYVE Network.

### Irys
[Irys](https://docs.irys.xyz/), previously known as Bundlr, serves as a critical provenance layer within the Arweave ecosystem. 
This technology is designed to optimize data storage and execution by facilitating the bundling of uploads to Arweave. 
By aggregating multiple transactions into a single, larger transaction, Irys enables more efficient scaling of data uploads to the network.

### KYVE Storage Provider
The KYVE Storage Provider offers a convenient web2 storage solution that leverages services like Amazon S3 and Cloudflare R2. This storage layer is designed specifically for testing purposes, allowing developers and users to simulate the data archival process without incurring the costs associated with web3 storage solutions.

By using the KYVE Storage Provider, teams can efficiently test and refine their data storage workflows, ensuring that everything functions smoothly before committing to permanent storage on a decentralized network. This approach provides a cost-effective and flexible environment for experimenting with archival processes, making it easier to develop and optimize storage strategies within the KYVE ecosystem.

### Turbo
[Turbo](https://ardrive.io/turbo-bundler) is an open source bundler for the Arweave ecosystem. It uses optimistic, instant data caching and provides
different payment methods like AR, ETH, SOL and most importantly KYVE. Turbo is KYVE's go to storage provider and uses it as the default option to store
blockchain data permanently on Arweave.

## Writing a custom storage provider
To enable integrations to use a different place to store the data, you have to write your custom storage integration and
extend
the [`IStorageProvider`](https://github.com/KYVENetwork/kyvejs/blob/main/common/protocol/src/types/interfaces/storageProvider.interface.ts#L19)
class. The interface is well-documented and requires you to overwrite a few functions:

First, instantiate an empty class, which implements the interface

```typescript
export class MyCustomStorageProvider implements IStorageProvider {}
```

Secondly, overwrite the `name` and `decimals` fields.

```typescript
export class MyCustomStorageProvider implements IStorageProvider {
  public name = "MyCustomStorageProvider";
  public decimals = 9;
}
```

Then create a constructor which takes in a private key to access the underlying wallet of your integration. Note: When
using KYSOR to run the runtime later, this key will be accessible through the key ring.

```typescript
export class MyCustomStorageProvider implements IStorageProvider {
  public name = "MyCustomStorageProvider";
  public decimals = 9;

  init(storagePriv: string) {
    // init your client for the storage provider here
    return this;
  }
}
```

In the last step, overwrite the three main functions.

- `getBalance(): Promise<string>` should return the wallet's current balance. This function is used to avoid problems
  with empty wallets
- `saveBundle(bundle: Buffer, tags: [string, string][]): Promise<string>` this function specifies how data is stored on
  your storage provider. It also gives you a couple of tags you can optionally add to the transaction to make it easier
  to retrieve via external indexers. Please note that using the tagging is entirely optional. Make sure to return a
  unique ID that points to the bundle to be able to retrieve it later on.
- `retrieveBundle(storageId: string, timeout: number): Promise<Buffer>` specify how to load a bundle from the storage
  provider using the ID. This id will be of the type that got returned in the `saveBundle`-function. You also specify a
  timeout after which the function should abort to avoid future problems in case the storage provider is inaccessible

```typescript
export class MyCustomStorageProvider implements IStorageProvider {
  public name = "MyCustomStorageProvider";
  public decimals = 9;

  init(storagePriv: string) {
    // init your client to the storage endpoint here
    this.exampleWallet = initWallet(storagePriv);
    return this;
  }

  async getBalance() {
    // specify how to retrieve the balance from the  wallet
    return await this.exampleWallet.getBalance();
  }

  async saveBundle(bundle: Buffer, tags: [string, string][]) {
    const transaction = await this.exmapleClient.saveData({ data: bundle });
    return transaction.id;
  }

  async retrieveBundle(storageId: string, timeout: number) {
    // This is an example implementation of some
    // made-up storage provider
    const { data: bundle } = await axios.get(
      `https://myexamplestorageprivder.net/${storageId}`,
      { responseType: "arraybuffer", timeout }
    );
    return bundle;
  }
}
```

Here is an example of
the [Arweave-Storage-Provider](https://github.com/KYVENetwork/kyvejs/blob/main/common/protocol/src/reactors/storageProviders/Arweave.ts)
