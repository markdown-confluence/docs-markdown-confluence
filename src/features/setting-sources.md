---
connie-publish: true
connie-page-id: '1442001'
---
# Settings Loaders

This document describes the different settings loaders used to load and merge settings for the `ConfluenceSettings` configuration object. Each loader is responsible for loading settings from a specific source, and they can be combined to create a merged configuration.

## DefaultSettingsLoader

**Purpose:** Load default settings from the `DEFAULT_SETTINGS` object.

**Settings source:** `DEFAULT_SETTINGS` object.

**Example:**

```javascript
const defaultLoader = new DefaultSettingsLoader();
const defaultSettings = defaultLoader.loadPartial();
```

## StaticSettingsLoader

**Purpose:** Load settings provided as a static object.

**Settings source:** User-provided object.

**Example:**

```javascript
const staticSettings = {
  confluenceBaseUrl: "https://example.com",
  confluenceParentId: "12345",
};
const staticLoader = new StaticSettingsLoader(staticSettings);
const loadedSettings = staticLoader.loadPartial();
```

## EnvironmentVariableSettingsLoader

**Purpose:** Load settings from environment variables.

**Settings source:** Environment variables.

**Example:**

Set the environment variables:

```bash
export CONFLUENCE_BASE_URL=https://example.com
export CONFLUENCE_PARENT_ID=12345
```


Load settings from environment variables:

```js
const envLoader = new EnvironmentVariableSettingsLoader();
const envSettings = envLoader.loadPartial();
```

## ConfigFileSettingsLoader

**Purpose:** Load settings from a JSON configuration file.

**Settings source:** User-specified JSON configuration file.

**Example:**

Create a JSON configuration file (`.mermaid-confluence.json`):

```json
{
"confluenceBaseUrl": "https://example.com",
"confluenceParentId": "12345"
}
```


Load settings from the configuration file:

```js
const configFileLoader = new ConfigFileSettingsLoader();
const configFileSettings = configFileLoader.loadPartial();
```

## CommandLineArgumentSettingsLoader

**Purpose:** Load settings from command line arguments.

**Settings source:** Command line arguments.

**Example:**

Pass settings as command line arguments:

```bash
node index.js --baseUrl https://example.com --parentId 12345
```


Load settings from command line arguments:

```js
const cmdLoader = new CommandLineArgumentSettingsLoader();
const cmdSettings = cmdLoader.loadPartial();
```

## AutoSettingsLoader

**Purpose:** Automatically load and merge settings from multiple loaders.

**Settings source:** Multiple settings loaders.

**Example:**

Create an `AutoSettingsLoader` with custom loaders:

````js
const loaders = [
  new ConfigFileSettingsLoader(),
  new EnvironmentVariableSettingsLoader(),
  new CommandLineArgumentSettingsLoader(),
  new DefaultSettingsLoader()
];

const autoLoader = new AutoSettingsLoader(loaders);
const autoSettings = autoLoader.load();
```
