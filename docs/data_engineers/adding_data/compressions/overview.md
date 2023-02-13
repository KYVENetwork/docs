---
sidebar_position: 0
---

# Overview

KYVE allows developers to use compression or other algorithms on the data before it's stored on the storage provider.
There are already some types of compressions available. The implementations can be
found [here](https://github.com/KYVENetwork/kyvejs/tree/main/common/protocol/src/reactors/compression).
Select the desired ID in your pool configuration to apply them to your runtime.

## List of existing compressions

| ID  | Name           | Description                          |
| --- | -------------- | ------------------------------------ |
| 0   | No Compression | -                                    |
| 1   | GZip           | Uses GZip as a compression algorithm |

## Writing a custom compression

It is effortless to add custom compression. KYVE-JS provides
an [easy interface](https://github.com/KYVENetwork/kyvejs/tree/main/common/protocol/src/reactors/compression) that needs
to be extended with two functions:
The `compress(data: Buffer)` function describes how data gets compressed, and the `decompress(data: Buffer)` function
describes how the compressed data gets decompressed.
A name and a MimeType have to be added to enrich the metadata of the implementation.

### Example: GZip

```ts
import { gunzipSync, gzipSync } from "zlib";

import { ICompression } from "../../types";

export class Gzip implements ICompression {
  public name = "Gzip";
  public mimeType = "application/gzip";

  async compress(data: Buffer) {
    return gzipSync(data);
  }

  async decompress(data: Buffer) {
    return gunzipSync(data);
  }
}
```

Lastly, register your implementation in
the [factory](https://github.com/KYVENetwork/kyvejs/blob/d5e7e735e3d716396fe424100c099f6702969414/common/protocol/src/methods/factories/compressionFactory.ts#L19)
and create a PR.
