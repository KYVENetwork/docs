---
sidebar_position: 1
---

# BigQuery Destination

Setting up the BigQuery destination connector involves setting up the data loading method (BigQuery
Standard method and Google Cloud Storage bucket) and configuring the BigQuery destination connector
using the Airbyte UI.

This page guides you through setting up the BigQuery destination connector.

## Prerequisites

- [A Google Cloud project with BigQuery enabled](https://cloud.google.com/bigquery/docs/quickstarts/query-public-dataset-console)
- [A BigQuery dataset](https://cloud.google.com/bigquery/docs/quickstarts/quickstart-web-ui#create_a_dataset)
  to sync data to.

  **Note:** Queries written in BigQuery can only reference datasets in the same physical location.
  If you plan on combining the data that Airbyte syncs with data from other datasets in your
  queries, create the datasets in the same location on Google Cloud. For more information, read
  [Introduction to Datasets](https://cloud.google.com/bigquery/docs/datasets-intro)

- (Required for Airbyte Cloud; Optional for Airbyte Open Source) A Google Cloud
  [Service Account](https://cloud.google.com/iam/docs/service-accounts) with the
  [`BigQuery User`](https://cloud.google.com/bigquery/docs/access-control#bigquery) and
  [`BigQuery Data Editor`](https://cloud.google.com/bigquery/docs/access-control#bigquery) roles and
  the
  [Service Account Key in JSON format](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).

## Setup guide

### Step 1: Set up a data loading method

1. [Create a Cloud Storage bucket](https://cloud.google.com/storage/docs/creating-buckets) with the
   Protection Tools set to `none` or `Object versioning`. Make sure the bucket does not have a
   [retention policy](https://cloud.google.com/storage/docs/samples/storage-set-retention-policy).
2. [Create an HMAC key and access ID](https://cloud.google.com/storage/docs/authentication/managing-hmackeys#create).
3. Grant the
   [`Storage Object Admin` role](https://cloud.google.com/storage/docs/access-control/iam-roles#standard-roles)
   to the Google Cloud [Service Account](https://cloud.google.com/iam/docs/service-accounts). This
   must be the same service account as the one you configure for BigQuery access in the
   [BigQuery connector setup step](#step-2-set-up-the-bigquery-connector).
4. Make sure your Cloud Storage bucket is accessible from the machine running Airbyte. The easiest
   way to verify if Airbyte is able to connect to your bucket is via the check connection tool in
   the UI.

Your bucket must be encrypted using a Google-managed encryption key (this is the default setting
when creating a new bucket). We currently do not support buckets using customer-managed encryption
keys (CMEK). You can view this setting under the "Configuration" tab of your GCS bucket, in the
`Encryption type` row.

### Step 2: Set up the BigQuery connector

1. Log into your [Airbyte Cloud](https://cloud.airbyte.com/workspaces) or Airbyte Open Source
   account.
2. Click **Destinations** and then click **+ New destination**.
3. On the Set up the destination page, select **BigQuery** from the **Destination type** dropdown.
4. Enter the name for the BigQuery connector.
5. For **Project ID**, enter your
   [Google Cloud project ID](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects).
6. For **Dataset Location**, select the location of your BigQuery dataset. 
   :::warning You cannot change the location later.
7. For **Default Dataset ID**, enter the BigQuery
   [Dataset ID](https://cloud.google.com/bigquery/docs/datasets#create-dataset).
8. For **Loading Method**, select **Standard Inserts** or **GCS Staging**
   :::tip We recommend using the GCS Staging option. 
9. For **Service Account Key JSON (Required for cloud, optional for open-source)**, enter the Google
   Cloud
   [Service Account Key in JSON format](https://cloud.google.com/iam/docs/creating-managing-service-account-keys).
10. For **Transformation Query Run Type (Optional)**, select **interactive** to have
    [BigQuery run interactive query jobs](https://cloud.google.com/bigquery/docs/running-queries#queries)
    or **batch** to have
    [BigQuery run batch queries](https://cloud.google.com/bigquery/docs/running-queries#batch).

    :::note 
    Interactive queries are executed as soon as possible and count towards daily concurrent
    quotas and limits, while batch queries are executed as soon as idle resources are available in
    the BigQuery shared resource pool. If BigQuery hasn't started the query within 24 hours,
    BigQuery changes the job priority to interactive. Batch queries don't count towards your
    concurrent rate limit, making it easier to start many queries at once. 
    :::

11. For **Google BigQuery Client Chunk Size (Optional)**, use the default value of 15 MiB. Later, if
    you see networking or memory management problems with the sync (specifically on the
    destination), try decreasing the chunk size. In that case, the sync will be slower but more
    likely to succeed.

## Supported sync modes

The BigQuery destination connector supports the following
[sync modes](https://docs.airbyte.com/cloud/core-concepts#connection-sync-modes):

- Full Refresh Sync
- Incremental - Append Sync
- Incremental - Append + Deduped

## Troubleshooting permission issues

The service account does not have the proper permissions.

- Make sure the BigQuery service account has `BigQuery User` and `BigQuery Data Editor` roles or
  equivalent permissions as those two roles.
- If the GCS staging mode is selected, ensure the BigQuery service account has the right permissions
  to the GCS bucket and path or the `Cloud Storage Admin` role, which includes a superset of the
  required permissions.

The HMAC key is wrong.

- Make sure the HMAC key is created for the BigQuery service account, and the service account has
  permission to access the GCS bucket and path.
[postgres.md](postgres.md)