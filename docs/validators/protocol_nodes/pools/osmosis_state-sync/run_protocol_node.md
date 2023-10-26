---
sidebar_position: 5
---

# Run a Protocol node

With KSYNC in place and the KYVE node also installed you can finally start the protocol node.

## Start Node

Finally the protocol validator can be started. In order to start it, execute the following command. Since we named our valaccount `osmosis-ssync` we select the this valaccount to start the KYSOR.

:::caution
**IMPORTANT**: If http://localhost:7878/list_snapshots still returns an empty array the protocol node can not start, please wait until the first snapshot is created, after that you are able to finally start the protocol node.
:::

```bash
./kysor start --valaccount 'osmosis-ssync'
```

You can also start the process in debug mode by adding the `--debug` flag like this:

```bash
./kysor start --valaccount 'osmosis-ssync' --debug
```

After the node successfully started you should see the following logs:

```log
2023-02-13 08:46:00.618  INFO  Starting node ...

2023-02-13 08:46:00.624  INFO  Starting metric server on: http://localhost:8080/metrics
2023-02-13 08:46:00.828  INFO  Checking account balance on StorageProvider:Bundlr
2023-02-13 08:46:00.872  INFO  Account has available funds on StorageProvider:Bundlr

2023-02-13 08:46:00.873  INFO  Chain ID = kaon-1
2023-02-13 08:46:00.873  INFO  Pool ID = 5
2023-02-13 08:46:00.873  INFO  Runtime = @kyvejs/tendermint-ssync
2023-02-13 08:46:00.873  INFO  Valaddress = kyve1887l27uwn5r6u9gxw7dg9wt0kqh7uk23suumzc

2023-02-13 08:46:00.873  INFO  @kyvejs/tendermint-ssync = v1.0.0
2023-02-13 08:46:00.873  INFO  @kyvejs/protocol = v1.0.0-beta.14

2023-02-13 08:46:00.876  INFO  Valaccount has not joined the pool with id 5 yet
2023-02-13 08:46:00.876  INFO  Visit https://app.kyve.network and join the pool from your validator account:

2023-02-13 08:46:00.876  INFO  Valaddress:    kyve1887l27uwn5r6u9gxw7dg9wt0kqh7uk23suumzc
2023-02-13 08:46:00.876  INFO  Valname:       causal-chocolate-sparrow

2023-02-13 08:46:00.876  INFO  The node will not continue until the account is authorized
```

With this information (`Valaddress` and `Valname`) you can head over the KYVE app and join the pool.

Now that the node is already running it just needs the authorization from it's main validator account in order to run for this validator and generate rewards. For that visit your validator page and click on `Join existing pool`.

A dialog should open where you should select the pool you want to join (here Osmosis). After that enter the valaddress that needs to be authorized and the valname, which just serves as a security that the node has actually been started. (If you join a pool without having the node running you are in danger of receiving a timeout slash because once you join a pool you are expected to validate and upload data).

For the last option you can do a one time transfer so that the valaccount has some $KYVE to pay for transaction fees. We would recommend sending 100 $KYVE for the start which typically lasts for about 1 month.

:::caution
**IMPORTANT**: Make sure that the valaccount always has enough $KYVE to pay for transaction fees, otherwise you are again in danger of receiving a timeout slash.
:::

Once you have joined the pool the node should continue in about ~10 seconds. After that you are successfully participating in a pool.

If you want to connect to a different endpoint other than the default _http://localhost:7878_, you can overwrite this endpoint with the env variable: KYVEJS_TENDERMINT_SSYNC_API=your-custom-endpoint.

## Start node with systemd

If you want to start the nodes as a background process you can use `systemd`.

For the daemon service root-privileges are required during the setup. Create a service file. $USER is the Linux user which runs the process. Replace it before you copy the command.

Since the KYSOR can run on multiple pools on one machine we would recommend naming the daemon service after the valaccount name and with a `d` appending to it. With that you can create multiple service files and control each of them. This example shows the service file for our valaccount `osmosis-ssync`

:::info
You might have to execute this command with `sudo`
:::

```bash
tee <<EOF > /dev/null /etc/systemd/system/osmosisd.service
[Unit]
Description=KYVE Protocol-Node osmosis daemon
After=network-online.target

[Service]
User=$USER
ExecStart=/home/$USER/kysor start --valaccount osmosis-ssync
Restart=on-failure
RestartSec=3
LimitNOFILE=infinity
EOF
```

:::info
Don't forget to change the filename and the valaccount in the service file if you join a different pool
:::

Start the daemon

```bash
sudo systemctl enable osmosisd
sudo systemctl start osmosisd
```

It can be stopped using

```
sudo systemctl stop osmosisd
```

You can see its logs with

```
sudo journalctl -u osmosisd -f -o cat
```

## Start node on multiple pools

This step is optional, but the more pools you participate in the higher the rewards. If you want to join another pool just repeat the previous steps (Install pool binaries). For that you have to create a new valaccount, because a valaccount can only run on one data pool. Once you have setup the second valaccount you can start it. You can see all the pools you are participating in your validator page.

:::caution
**WARNING**: Joining for example a second pool might double your rewards, but it also doubles the danger of getting slashed.
:::
