---
sidebar_position: 3
---

# Supported Wallets

KYVE supports multiple wallets. A full list can be found below:

## Hot Wallets

Currently, KYVE supports the following hot wallets which are primarily used as a browser extension to connect to KYVE's WebApp.

### Keplr

[Keplr](https://www.keplr.app/) is a non-custodial blockchain wallet for web pages that allows users to interact with blockchain applications. It is developed and maintained by [Chainapsis](https://www.chainapsis.com/).

:::info
**NOTE**: It can be downloaded and installed here: **[https://www.keplr.app/download](https://www.keplr.app/download)**
:::

Keplr wallet is open source. The source code can be found on [GitHub](https://github.com/chainapsis/keplr-wallet).

### Cosmostation

[Cosmostation](https://www.cosmostation.io/) wallet is a non-custodial mobile/web/extension wallet that supports a wide range of PoS networks. The wallet allows users to easily access and sign transactions on various networks and decentralized applications with GUIs available on mobile and web environments.

:::info
**NOTE**: It can be downloaded and installed here: **[https://www.cosmostation.io/wallet#extension](https://www.cosmostation.io/wallet#extension)**
:::

Cosmostation wallet is open source. The source code can be found on [GitHub](https://github.com/cosmostation/cosmostation-chrome-extension-client).

## Cold Wallets

Currently, KYVE supports the following cold wallets which are primarily used to operate nodes or to connect to KYVE's WebApp.

### Ledger

[Ledger](https://www.ledger.com/) devices are hardware crypto wallets that store your private keys offline. It is a three-part system comprising of a hardware device, the Ledger Live app, and a platform of integrated dApps.

:::info
**NOTE**: Ledger devices can be bought here: **[https://shop.ledger.com/](https://shop.ledger.com/)**
:::

The Ledger Live app is open source. The source code can be found on [GitHub](https://github.com/LedgerHQ/ledger-live).

#### Tutorial: Connecting Ledger to KYVE

This tutorial describes how to set up and use the Keplr web app with your Ledger device to access your Ledger KYVE
accounts.

**Before you start**

- Ensure the latest version of the Cosmos app is installed on your Ledger device.
- Make sure to close Ledger Live as it can conflict with Keplr.
- Firefox users might face connectivity issues, so we strongly recommend using Chrome.
- Add the Keplr Chrome extension to your browser via this [link](https://www.keplr.app/download).

**Accessing your Ledger KYVE accounts via Keplr**

1. Connect your Ledger device to your computer and open the Cosmos app on your device.
   Your Ledger device should display "Cosmos ready".
2. In your browser, click on the Keplr extension icon and select Import Ledger.
3. Choose an account name and a password, confirm your password, then click “Next”.
   We strongly recommend using a nickname or pseudonym as the account name.
   A pop-up window should appear in your browser.
4. Tick “Use alternative USB connection method (HID)”, then click “Next”.
   Your browser should display: “You're all set!”
5. Click “Done”.
6. Open the [KYVE web app](https://app.kyve.network). Then click on “connect wallet” (top right)
7. Add the Network to Keplr
8. Open Keplr and click on “Cosmos Hub”, then scroll all the way down and click on the KYVE Network (either `KYVE Korellia` or `KYVE Kaon`)
9. View your address under your account name.
   It should start with `kyve…..`; for example `kyve1x4mqge0gxvg98nsdt0qp3q55a9vy8ytnqk8dvw`. Now everything is set up

### Keystone

[Keystone](https://keyst.one/) Hardware Wallet is a 100% Air-gapped QR code communication hardware wallet. It offers a cold storage and blind signing solution with an open source firmware, 4 inch touchscreen and PSBT Bitcoin multisig support.

:::info
**NOTE**: Keystone devices can be bought here: **[https://keyst.one/shop](https://keyst.one/shop)**
:::

The Keystone firmware is open source. The source code can be found on [GitHub](https://github.com/KeystoneHQ/Keystone-cold-app).

## Custody

KYVE is working with the following custody providers in order to provide custody to investors.

### Finoa

[Finoa](https://www.finoa.io/) is the institutional crypto custody solution built and regulated in Germany.
