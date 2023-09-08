---
sidebar_position: 1
---

# Installation

## Requirements
The supervysor manages the process of the data source node. First of all, it should be ensured that this node can run successfully, which can be tested by trying to sync the first `n` blocks. In addition, to successfully participate in a KYVE data pool, it is necessary to create a protocol validator and join a data pool. Further information can be found here: https://docs.kyve.network/validators/protocol_nodes/overview

Make sure your Go version is at least `1.20`.

## Installation

To install the latest version of `supervysor`, run the following command:

```bash
go install github.com/KYVENetwork/supervysor/cmd/supervysor@latest
```

To install a previous version, you can specify the version:

```bash
go install github.com/KYVENetwork/supervysor/cmd/supervysor@v0.1.0
```

:::info
If you have issues to successfully run the `go install` command, make sure to export the following to your environment:
:::

```bash
env GIT_TERMINAL_PROMPT=1
```

Run `supervysor version` to check the installed version.

You can also install from source by pulling the supervysor repository and switching to the correct version and building
as follows:

```bash
git clone git@github.com:KYVENetwork/supervysor.git
cd supervysor
git checkout tags/vx.x.x -b vx.x.x
make supervysor
```

This will build supervysor in `/build` directory. Afterwards you may want to put it into your machine's PATH like
as follows:

```bash
cp build/supervysor ~/go/bin/supervysor
```