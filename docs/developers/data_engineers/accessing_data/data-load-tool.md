---
sidebar_position: 0
---

# Data Load Tool

### Load datasets from KYVE pools to your destination
This CLI tool is part of KYVE's Data Pipeline and can be used to load validated data into 
a BigQuery or Postgres database.

## Build from Source
```bash
git clone https://github.com/KYVENetwork/kyve-dlt.git
cd kyve-dlt
make build
```

This will build **dlt** in /build directory. Afterward, you may want to put it into your machine's PATH like as follows:
```bash
cp build/dlt ~/go/bin/dlt
```

## Initialization
To set up the `dlt` config, run:
```bash
dlt init
```

This will either guide you to set up a first source and destination or create a config with default values.
A connection consisting of a source and a destination is required to start any sync process.

## Usage
Depending on what you want to achieve with `dlt` there are two commands available. A quick summary of what they do
and when to use them can be found below:

|                  | Description                                                                                                         | Recommendation                                                                       |
|------------------|---------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| **load**         | Loads data from a KYVE source into a destination.                                                                   | Generally recommended to load a dataset into a destination.                          |
| **sync**         | Runs a supervised incremental loading process in cronjob to keep the data destination in sync with the data source. | Recommended to keep an already loaded dataset updated with incrementally added data. |

### `load`
**Usage:**
```bash
dlt load --connection connection_1
```
To start the loading process from or to a certain bundle, simply use the `--from-bundle-id` or `--to-bundle-id` flags.

`dlt` always checks if a bundle was already loaded into a destination. By default, the `to-bundle-id` is set to the `latest found bundle ID + 1`.
To force the loading of the specified range of bundle, simple use the `--force` flag.

### `sync`
**Usage:**
```bash
dlt sync --connection connection_1
```
`sync` executes the loading process in a cronjob. Therefore, specify the `connection -> cron` field in the config.
The following cron syntax is expected: `* * * * *`. The supervising process always checks if an underlying loading process
is currently running to prevent parallelized syncs. It waits until all processes are finished to proceed with the sync.

## Manage config
With the following commands, sources, destinations, and connections can be added, removed or listed:
```bash
dlt sources      {add|remove|list}
dlt destinations {add|remove|list}
dlt connections  {add|remove|list}
```

## Schemas

### Base
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "_dlt_raw_id": { "type": "string" },
    "_dlt_extracted_at": { "type": "string" },
    "key": { "type": "string" },
    "value": { "type": "string" },
    "bundle_id": { "type": "integer" }
  },
  "required": ["_dlt_raw_id", "_dlt_extracted_at", "key", "value", "bundle_id"]
}
```

This schema supports all KYVE datasets by default and consists of the core `key` and `value` structure that is required by the KYVE protocol.
The `key` is the unique identifier of the data item in a data pool (e.g. height of a block, timestamp), whereas the `value` includes the actual data.

### Tendermint
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "_dlt_raw_id": { "type": "string" },
    "_dlt_extracted_at": { "type": "string" },
    "height": { "type": "integer" },
    "value": { "type": "string" },
    "bundle_id": { "type": "integer" }
  },
  "required": ["_dlt_raw_id", "_dlt_extracted_at", "key", "value", "bundle_id"]
}
```
This schema is supported for all Tendermint pools (runtime: `@kyvejs/tendermint`). Instead of using the raw key, it converts it to
a `height` as `integer`.

### TendermintPreprocessed
This schema is supported for all Tendermint pools (runtime: `@kyvejs/tendermint`) and preprocesses the events in individual rows.
It is recommended to use for datasets with big data items (e.g. Osmosis). This is the schema:

```json
{
  "type": "object",
  "properties": {
    "_dlt_raw_id": { "type": "string" },
    "_dlt_extracted_at": { "type": "string" },
    "type": { "type": "string" },
    "value": { "type": "string" },
    "height": { "type": "string" },
    "array_index": { "type": "integer" },
    "bundle_id": { "type": "integer" }
  },
  "required": ["_dlt_raw_id", "_dlt_extracted_at", "type", "value", "height", "array_index", "bundle_id"]
}
```
For this schema, the `height` itself is no unique identifier, because more than one rows are written for a single data item.
The first row includes the block without events in the `value` field (`type = "block"`). The events with `type`
`begin_block_event`, `tx_result`, and `end_block_event` follow, including the event value in `value` and an `array_index`.
This structure allows everyone to reconstruct the data completely.

## Supported Destinations
- BigQuery
- Postgres