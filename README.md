# ScriptRunner Vendors API

This library will allow you to integrate your custom field with Behaviours for ScriptRunner for Jira Data Center.

This API is supported in ScripRunner for Jira since version *8.12.0*.

## Installation

1. Add `@scriptrunnerhq/vendors-api` to your `package.json`.
2. Run `npm install` or `yarn install`.
3. In the server-side template file add two `data` properties to the root node:
   * `data-scriptrunner-vendors-api-cfid` - with the value of custom field ID.
   * `data-scriptrunner-vendors-api-stored-value` - with the value stored in the database.
4. In your custom field code, ensure that `VendorsApi.init()` is called immediately when your field is initialized.

## `VendorsApi.init()`

`VendorsApi.init()` is how you connect your custom field with ScriptRunner Behaviours.
It takes two arguments:
1. `customFieldId` - the unique ID assigned by Jira for the field.
2. `apiSpec` - an object with API functions:
    * `getValue()` - return the current value of custom field.
    * `setValue(value)` -  set value of the custom field.
    * `setReadOnly(readOnly)` - enables or disables the custom field based on `readOnly` boolean argument.
    * `bindOnChange(callback)` - a callback to inform ScriptRunner Behaviours that the value of the custom field has changed.
    * `setOptions(options)` - (optional) for fields like `select` provides a list of available options in the form of `{key: string, value: string}[]`.

_Note:_ The `getValue()` and `setValue()` should be symmetric, meaning both should return/accept values in the same format.
These values should match the data format stored in the database.

It is important to call `VendorApi.init()` as early as possible, as any of the above functions may be called early from
ScriptRunner Behaviours. This means that all of the above can be called before the custom field is fully initialized.
For this reason all of the above can return `Promise` and internally wait for custom field initialization to finish
before applying a Behaviour.

More information and an example plugin can be found in our [Documentation](https://docs.adaptavist.com/display/_PK/SR4JS/vendors-api).

We also provide an [example plugin](https://github.com/scriptrunnerhq/vendours-api-example) demonstrating how this API can be used.