---
sidebar_position: 2
---

# Accounts

## Creating Accounts

To set up an account, you have the option of creating a private key, a keystore file (which is a password-protected private key), or a mnemonic phrase (a sequence of words that can be used to access multiple private keys). Each of these methods varies in terms of security features, but the primary distinction is that a private key or keystore file only generates one account, while a mnemonic phrase gives you access to multiple accounts with the same phrase.

Cosmos blockchains, such as KYVE, support the creation of accounts using mnemonic phrases through [hierarchical deterministic key generation](https://github.com/confio/cosmos-hd-key-derivation-spec) (HD keys). This feature enables users to create accounts on various blockchains without the need to manage multiple secrets.

To generate addresses, HD keys combine the mnemonic phrase with a piece of data called a derivation path. Different blockchains may have distinct derivation paths, and it's necessary to use the blockchain's particular [derivation path](https://learnmeabitcoin.com/technical/derivation-paths) to access all accounts associated with a mnemonic phrase on that blockchain.

## Representing Accounts

In the world of crypto wallets, the terms "account" and "address" are frequently used interchangeably. However, in the Cosmos SDK, an account refers to a pair of public key (PubKey) and private key (PrivKey). The private key, public key, and address are determined by the derivation path.

The PubKey can be used to generate different addresses in various formats that serve to identify users and other parties in the application. On Cosmos chains, the bech32 format (for example `kyve1...`) is a common form of address. Addresses are also linked with messages to indicate the sender of the message.

The PrivKey is employed to create digital signatures that demonstrate that the associated address approved a given message. To achieve this, the PrivKey undergoes a cryptographic process called Elliptic Curve Digital Signature Algorithm (ECDSA), which generates a PubKey that is compared with the address in the message.

## KYVE Accounts

KYVE uses the Coin type `118` ([list of coin types](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)) and additionally uses `m/44'/118'/0'` as the root HD path for KYVE-based accounts.

With [BIP-0173](https://github.com/satoshilabs/slips/blob/master/slip-0173.md), which defines a new format for segregated witness output addresses that contains a human-readable part that identifies the coin type, the usage of Bech32 encoding is possible. KYVE uses the following HRP (human readable prefix) as the base HRP:

|        | Mainnet | Kaon   | Korellia |
| ------ | ------- | ------ | -------- |
| Prefix | `kyve`  | `kyve` | `kyve`   |

In general, the easiest way the create and manage accounts are wallets. KYVE supports a variety of wallets which are listed in the next section.

:::tip
**NOTE**: This means you can use the **same** address for every KYVE network, including Mainnet, Kaon and Korellia
:::
