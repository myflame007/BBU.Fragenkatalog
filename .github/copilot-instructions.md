# Power SDK Instructions Start
## Overview

This guide explains how to initialize an app, add a data source using the Power SDK CLI and generate the corresponding Models and Services, and publish the app.

**Always continue immediately** without asking for confirmation at each step.

## Project context

This app is the "Fragenkatalog Beurteilungsassistent" (App-ID
`b97305a0-10c4-48e3-a62c-d95fc7eec44b`) - already initialized and registered.
Do not run `pac code init` again for this project.

- Dev environment: `0a2b9fd0-e368-4fdf-a94a-8d86dec6c051` (`BBUD365CEDev1`)
- Live environment: `d626b5f0-2ca0-40d8-8a08-a2117bf579b7` - only deploy here
  with explicit user approval
- Package manager: **bun** (`bun install`, `bun run build`, `bun run dev`) -
  not npm/yarn/pnpm

## CLI Command

Use the following command to add a data source:

```bash
pac code add-data-source -a <apiId> -c <connectionId>
```

**Example:**

```bash
pac code add-data-source -a "shared_office365users" -c "aa35d97110f747a49205461cbfcf8558"
```

If additional parameters such as table and dataset are required, use:

```bash
pac code add-data-source -a <apiId> -c <connectionId> -t <tableName> -d <datasetName>
```

**Example:**

```bash
pac code add-data-source -a "shared_sql" -c "12767db082494ab482618ce5703fe6e9" -t "[dbo].[MobileDeviceInventory]" -d "paconnectivitysql0425.database.windows.net,paruntimedb"
```

Use the following command to publish an app (Dev):

```bash
bun run build
pac code push --environment 0a2b9fd0-e368-4fdf-a94a-8d86dec6c051
```

## Using Model and Service

- Read the files under `src/generated` for data binding (created by
  `pac code add-data-source`, do not edit manually).
- Read the files under `.power\schemas` folder for other schema reference.
# Power SDK Instructions End