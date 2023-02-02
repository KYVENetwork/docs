# KYSOR Migration

If you are running with the current version of KYSOR (`1.0.0-beta.1`) this migration guide will help
you upgrading to the latest KYSOR version (`1.0.0-beta.5`) and keeping all preconfigured valaccounts. If you have never run the KYSOR before please follow the upgraded KYSOR [installation instructions](/validators/protocol-node.md) since this guide will only focus on migrating from the old version.

## 1. Verify valid installation of old KYSOR

To archieve a successful migration we first have to verify if the old KYSOR was correctly installed. To check that simply print out the contents of the KYSOR home folder:

```bash
ls ~/.kysor
```

By default, the KYSOR has it's home in the $HOME directory, but if specified differently at initialization it could be somewhere else.

The following files and directories should be included: `config.toml`, `logs`, `upgrades`, `valaccounts`.

## 2. Get the newest KYSOR binary

The newest binary is available [here](https://github.com/KYVENetwork/kyvejs/releases/tag/%40kyve%2Fkysor%401.0.0-beta.5).
To install the linux version the following command needs to be executed:

```bash
wget https://github.com/KYVENetwork/kyvejs/releases/download/%40kyve%2Fkysor%401.0.0-beta.5/kysor-linux-x64.zip
```

```bash
unzip kysor-linux-x64.zip
```

```bash
mv kysor-linux-x64 kysor
```

```bash
chmod 700 kysor
```

To verify the installation execute the version command:

```bash
./kysor version
```

If the KYSOR version matches `1.0.0-beta.5` the new KYSOR is successfully installed.

## 3. Edit config.toml

Now the main configuration file of KYSOR needs to be configured so it can be used with the newest version.
Edit the file `~/.kysor/config.toml` with the editor of your choice and do the following:

- Rename the first line from `network = "korellia"` into `chainId = "korellia"`
- Leave `autoDownloadBinaries` at your preferred setting
- Add the following config at the bottom: `rpc = "https://rpc.korellia.kyve.network"`
- Add the following config at the bottom: `rest = "https://api.korellia.kyve.network"`

The final config file should look like this:

```toml
chainId = "korellia"
autoDownloadBinaries = true
rpc = "https://rpc.korellia.kyve.network"
rest = "https://api.korellia.kyve.network"
```

Save changes

## 4. Start KYSOR

Finally the new KYSOR can be started. For that simply use the normal start command:

```bash
./kysor start --valaccount $VALACCOUNT
```

Moreover, the KYSOR supports starting in debug mode:

```bash
./kysor start --valaccount $VALACCOUNT --debug
```
