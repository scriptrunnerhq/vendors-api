import type { VendorsBehavioursApi } from "./types";
import { apiKey, getField } from "./internal";

/**
 * Initialize ScriptRunner Vendors API Behaviours bridge to custom field allowing Jira
 * administrators to use Groovy scripts to manipulate the field state in Issue Creation
 * from.
 *
 * @param {string} customFiledId
 * @param {VendorsBehavioursApi<T>} apiSpec
 */
export const init = <T>(
  customFiledId: string,
  apiSpec: VendorsBehavioursApi<T>,
) => {
  const field = getField(customFiledId);
  field.data(apiKey, apiSpec);
  field.attr(`data-${apiKey}`, "true");
};
