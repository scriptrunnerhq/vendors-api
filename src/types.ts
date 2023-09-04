export type PromiseOr<ValueType> = Promise<ValueType> | ValueType;
export type ChangeEvent<ValueType> = {
  fieldId: string;
  value: ValueType | null;
};
export type OnChangeCallback<ValueType> = (
  changeEvent: ChangeEvent<ValueType>,
) => void;

export interface FieldOption {
  key: string;
  value: string;
}

export type VendorsBehavioursApi<ValueType> = {
  /**
   * Changes state for custom field to read-only or editable.
   *
   * @param {boolean} readOnly
   * @returns {PromiseOr<void>}
   */
  setReadOnly(readOnly: boolean): PromiseOr<void>;

  /**
   * Set value of custom field to given value.
   *
   * @param {ValueType} value
   * @returns {PromiseOr<void>}
   */
  setValue(value: ValueType | null): PromiseOr<void>;

  /**
   * Get current value of custom field.
   *
   * @returns {ValueType}
   */
  getValue(): ValueType | null;

  /**
   * Informs ScriptRunner Behaviours when value of custom field changes.
   *
   * @param {OnChangeCallback} callback
   * @returns {PromiseOr<void>}
   */
  bindOnChange(callback: OnChangeCallback<ValueType>): PromiseOr<void>;

  /**
   * Change the list of options for `select` based fields.
   *
   * The {options} parameter is a list of objects with `key` and `value` properties.
   *
   * @param {FieldOption[]} options
   * @returns {PromiseOr<void>}
   */
  setOptions?: (options: FieldOption[]) => PromiseOr<void>;
};
