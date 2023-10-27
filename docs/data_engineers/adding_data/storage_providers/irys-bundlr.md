---
sidebar_position: 2
---

# Irys (previously Bundlr)

:::note
Bundlr recently rebranded as Irys.
:::

[Irys](https://docs.irys.xyz/) is a provenance layer. It enables users to scale permanent data and precisely attribute its origin.

Irys helps Arweave scale by bundling multiple transaction into a single bundle. All data submitted to Irys is collected by a bundler. Roughly every 2 minutes, the bundler groups transactions, merges them into a single bundle, and submits them to Arweave. Irys then monitors the upload, ensuring it is finalized on Arweave and seeded to multiple miners.

Data uploaded to Irys is permanent, precise, and unconstrained.

-   Permanent: Data stored on Irys is censorship-resistant and immutable, forever. There's no counterparty risk of data being removed.

-   Precise: Each piece of data is timestamped with a high-precision timestamp, providing a reliable sequence of events.

-   Unconstrained: Users can always read, write, and easily discover data at any scale, making the data fully composable. Irys is permissionless and offers limitless permanent data, enabling it to provide provenance for all information.

All uploads to Irys are verifiable. After uploading data, you’re given [a signed receipt](https://docs.irys.xyz/learn/receipts) that can be used by anyone to verify the data’s provenance at any time.
