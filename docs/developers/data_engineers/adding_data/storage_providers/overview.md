---
sidebar_position: 0
---

# Overview

Storage providers are the backbone of KYVEs data storage. Select the desired ID in your pool configuration to apply them
to your runtime.

## Existing storage providers

| ID  | Name       | Description                          |
| --- | ---------- | ------------------------------------ |
| 0   | No Storage | Data does not get stored             |
| 1   | Arweave    | Uses Arweave to store data           |
| 2   | Bundlr     | Uses Bundlr to store data on Arweave |

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
