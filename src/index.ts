import { init } from "./api";
import {
  apiKey,
  cfidKey,
  storedValueKey,
  hasVendorsApi,
  getVendorsApi,
  getApiNode,
} from "./internal";

export type {
  VendorsBehavioursApi,
  PromiseOr,
  FieldOption,
  OnChangeCallback,
  ChangeEvent,
} from "./types";

export const DataKeys = { cfidKey, storedValueKey, apiKey };

export const VendorsApi = { init };

export const __internal = { hasVendorsApi, getVendorsApi, getApiNode };

export default VendorsApi;
