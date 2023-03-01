---
sidebar_position: 6
---

# Cosmovisor and Systemd

[Cosmovisor](
https://github.com/cosmos/cosmos-sdk/tree/main/tools/cosmovisor) is a supervisor
for the chain binary. It watches governance proposals for chain upgrades.
In the case of a chain upgrade it automatically stops the current progress 
and launches the new binary.

We strongly recommend using Cosmovisor.

## Setup Cosmovisor
The source code for Cosmovisor can be found in the Cosmos-SDK monorepo.
Assuming you have Go installed you can either clone the directory and build
the binary using make, or using the `go install` command to directly install 
it to your machine.

Here, we use the `go install` command:
```shell
go install github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor@latest
export PATH=$PATH:$(go env GOPATH)/bin
```

Assuming the chain binary (`./kyved`) lies in the current directory, run:
```shell
cosmovisor init kyved
```

The binary can then be started using
```shell
cosmovisor run start
```

:::tip

One can also build the binary on a local system and just ship the binary to the server.
The command then changes to `./cosmovisor`.

:::

## Setting up Systemd

For Linux systems we recommend using systemd as system supervisor.
Others are very likely to work as well, but we have not tested them and do not provide
official support.

For the following configuration we assume that the binary is running as the user
`chain` in `/home/chain/` and that the cosmovisor binary is located at `/home/chain/cosmovisor`.

Create a file `/etc/systemd/system/kyved.service` with the following contents:

```
[Unit]
Description=KYVED deamon supervising the cosmos-sdk chain binary
After=network-online.target

[Service]
User=chain
WorkingDirectory=/home/chain
ExecStart=/home/chain/cosmovisor run start
Restart=on-failure
RestartSec=3
LimitNOFILE=infinity

Environment="DAEMON_HOME=/home/chain/.kyve"
Environment="DAEMON_NAME=kyved"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="UNSAFE_SKIP_BACKUP=false"

[Install]
WantedBy=multi-user.target
```

The settings for `DAEMON_ALLOW_DOWNLOAD_BINARIES` and `UNSAFE_SKIP_BACKUP`
depend on your requirements. Please visit [https://github.com/cosmos/cosmos-sdk/blob/main/tools/cosmovisor/README.md#setup](https://github.com/cosmos/cosmos-sdk/blob/main/tools/cosmovisor/README.md#setup)
for more information.

Start the daemon

```shell
sudo systemctl enable kyved
sudo systemctl start kyved
```

It can be stopped using

```shell
sudo systemctl stop kyved
```

You can see its logs with
```shell
sudo journalctl -u kyved -f
```

