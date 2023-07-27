---
sidebar_position: 6
---

# How to upgrade

Upgrading a protocol node can be difficult, learn here how to prepare and execute an upgrade.

## Upgrade with KYSOR

### Autodownload enabled

If the node is managed by KYSOR and autodownload is **enabled** nothing has to be prepared for the upgrade. KYSOR will automatically
download the new upgrade binary, place it in the correct path and restart the validation process.

Although this is quite handy it is
**not recommended** for mainnet since node operators should always build the binaries from source to avoid malicious binaries
from being executed. If you run on a testnet like Korellia or Kaon you can safely enable autodownload.

:::tip
**INFO**: You can enable/disable autodownload in KYSOR's main config file under `~/.kysor/config.toml`:

```toml
# can be either "true" or "false"
autoDownloadBinaries = true
```

:::

### Autodownload disabled

If the node is managed by KYSOR and autodownload is **disabled** you have to manually install the binary and place it in under the
correct path **prior** to the update.

The first step is to check if the upgrade proposal has passed and when it will go into effect. An upgrade proposal can look like this:

```json
{
  "@type": "/kyve.pool.v1beta1.MsgScheduleRuntimeUpgrade",
  "authority": "kyve10d07y265gmmuvt4z0w9aw880jnsr700jdv7nah",
  "runtime": "@kyvejs/tendermint",
  "version": "1.0.0-beta.1",
  "scheduled_at": "1684749600",
  "duration": "600",
  "binaries": "{\"kyve-linux-arm64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Ftendermint%401.0.0-beta.1/kyve-linux-arm64.zip\",\"kyve-linux-x64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Ftendermint%401.0.0-beta.1/kyve-linux-x64.zip\",\"kyve-macos-x64\":\"https://github.com/KYVENetwork/kyvejs/releases/download/%40kyvejs%2Ftendermint%401.0.0-beta.1/kyve-macos-x64.zip\"}"
}
```

Here **every** pool which is running on the _@kyvejs/tendermint_ runtime gets upgraded with the new version of _1.0.0-beta.1_. The upgrade will go into effect
at the _scheduled_at_ time (UNIX time format). Once the upgrade goes into effect the pool will halt during the upgrade is getting applied. The length of the upgrade
is determined by the _duration_ (here 600 seconds -> 10 mins). The reason behind an upgrade duration where the pool halts is to give node operators some time to perform
the upgrade (restart the node or manually switch out the binaries during that time). After the duration has completed the pool will continue automatically. Finally, the
_binaries_ are important for KYSOR if node operators have autodownload enabled. It points to the prebuilt binaries which can directly be downloaded.

The next step is to install the new upgrade binary in KYSOR. For that either download the prebuilt binary from the upgrade proposal or build it from source. If you
build from source be sure to checkout the right version.

:::tip
**INFO**: Checkout the correct version in kyvejs like this: `git checkout tags/@kyvejs/tendermint@x.x.x -b x.x.x`. More info on building binaries from source can be found [here](/validators/protocol_nodes/pools/osmosis/installation.md#build-from-source)
:::

Once you have either downloaded or build the binaries you have to place them in the correct path. For that create the following directories and move the binary there:

```bash
mkdir -r ~/.kysor/upgrades/pool-0/x.x.x/bin/
mv kyve-linux-x64 ~/.kysor/upgrades/pool-0/x.x.x/bin/
```

:::caution
**IMPORTANT**: The version _x.x.x_ has to match with the version in the upgrade proposal, so for the example proposal above it would be:

```bash
mkdir -r ~/.kysor/upgrades/pool-0/1.0.0-beta.1/bin/
mv kyve-linux-x64 ~/.kysor/upgrades/pool-0/1.0.0-beta.1/bin/
```

:::

To make sure the installation was successful you can print the version which should match with the version in the path:

```bash
.kysor/upgrades/pool-0/1.0.0-beta.1/bin/kyve-macos-x64 version
```

TODO
```bash
@kyvejs/tendermint version: 1.0.0-beta.0
@kyvejs/protocol version: 1.0.0-beta.24
Node version: v18.5.0

Platform: linux
Arch: x64
```

After that the installation is ready and when the upgrade is executed KYSOR will automatically restart with the new binary so now nothing has to be prepared anymore.

## Upgrade without KYSOR

If you run your node without KYSOR you have to manually switch out the upgrade binary during the upgrade duration. For that the node operator has to be online during the upgrade
to do this. For this reason we recommend running with KYSOR where the upgrade binary can be installed before the upgrade and KYSOR will do this automatically during the upgrade.

To upgrade the binary has to either be downloaded from the gov proposal or build from source. Both is described in the section above. Once the binary is installed you can double check
if you have installed the correct version by executing the version command.

```bash
./kyve-macos-x64 version
```

TODO

```bash
@kyvejs/tendermint version: 1.0.0-beta.1
@kyvejs/protocol version: 1.0.0-beta.24
Node version: v18.5.0

Platform: linux
Arch: x64
```

The version of _@kyvejs/tendermint_ should match with the version in the upgrade proposal. Once the upgrade executed the old binary will automatically stop with an error since
the version upgraded. Now simply restart the process with the new binary and the node will continue to validate bundles once the upgrade duration has passed.
