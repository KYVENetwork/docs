---
sidebar_position: 5
---

# Run own API endpoint

:::tip
This section describes how to spin up and run an own Trustless API endpoint.
:::

## Build from Source
```bash
git clone https://github.com/KYVENetwork/trustless-api.git

cd trustless_api

make

cp build/trustless_api ~/go/bin/trustless_api
```
## How to start:
### Crawler

You can start the crawling process with the following command:

```sh
trustless_api crawler
```

### Server

To serve the crawled data items you have to start the process with the following arguments:

```sh
trustless_api start
```

## Config

The following config serves as an example, utilizing a Postgres database and an S3 bucket. You can find the template configuration here: `.config.template.yml`

```yml
# log level values: info, warning, debug, error, none
log: info

# === POOLS ===
# An array that defines what pools should be crawled and how they are served.
# - chainid: is the chain id of the pool, e. g. kyve-1, koan-1, korellia-2
# - poolid: respective poolId
# - indexer: defines what indexer to use, the indexer also defines how to access the data
#            e. g. EthBlobs will provide following URLs: "/beacon/blob_sidecars?block_height={block_height}", "/beacon/blob_sidecars?slot_number={slot_number}"
# - slug: what slug should be used when serving the pools. The slug is a unique prefix for each pool when requesting its data.
#         e. g. with the slug 'ethereum' and the indexer EthBlobs the resulting url will be: "/ethereum/beacon/blob_sidecars?..."
# =============
pools:
  - chainid: kaon-1
    indexer: EthBlobs
    poolid: 21
    slug: ethereum
  - chainid: korellia-2
    indexer: Height
    poolid: 105
    slug: linea

# === DATABASE ===
# database configuration
# ================
database:
  # supported databases: sqlite (default), postgres
  type: sqlite
  # the database name, if you use sqlite this will the the database file. default: ./database.db
  dbname: indexer.db
  # following attributes are only relevant when using postgres, you don't need them for sqlite
  host: "localhost"
  # IMPORTANT: this is postgres database port, not the port the app will use to serve
  port: 5432
  user: "admin"
  password: "root"

# === SERVER ===
# server configuration. The server will use the pools config to know what pools to serve
# ==============
server:
  # port of the server
  port: 4242
  # will redirect to the CDN defined in `storage` if set to false the server will fetch the content on request and serve it directly
  redirect: false

# === SERVER ===
# crawler configuration. Only relevant when running the crawling process
# ==============
crawler:
  # how many threads are used for downloading & processing the bundles
  threads: 4

# === STORAGE ===
# storage configuration.
# ===============
storage:
  # the type of storage to use. available options: local (default), s3
  type: local
  # how many threads are used to save/upload the processed bundle. Default 8
  threads: 8
  # only relevant when using local storage, can be left empty when using AWS
  path: ./data
  # what compression to use when storing/uploading the data
  # available options: gzip (default), none
  compression: gzip

  # S3 CONFIG
  # The following configs are only relevent when using S3

  # your R2 or AWS endpoint
  aws-endpoint: "http://example-bucket.s3-website.us-west-2.amazonaws.com/"
  # your bucket name
  bucketname: "example-bucket"
  # CDN where to fetch the data
  cdn: "https://example.domain/"
  # your access key id and your acces key secret
  credentials:
    keyid: "<access_key_id>"
    keysecret: "<access_key_secret>"
  # what region to use for the aws config. default: auto
  region: auto

# === ENDPOINTS ===
# specify custom endpoints & fallback
# endpoints for each storage provider and chain
# if you dont provide any endpoints, official endpoints will be set as default
# =================
endpoints:
  storage:
    1:
      - https://arweave.net
      # define as many fallback endpoints as you want
      # - https://arweave.net
    2:
      - https://arweave.net
    3:
      - https://storage.kyve.network
  chains:
    kaon-1:
      - https://api.kaon.kyve.network
      # same here, define your fallback endpoints
      # - https://api.kaon.kyve.network
    korellia-2:
      - https://api.korellia.kyve.network
    kyve-1:
      - https://api.kyve.network
```