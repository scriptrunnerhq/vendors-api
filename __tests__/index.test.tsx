import * as React from "react";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";

import VendorApi from "../src";
import type { PromiseOr, FieldOption, OnChangeCallback } from "../src";
import { getVendorsApi, hasVendorsApi } from "../src/internal";

const fieldId = "customfield_100023";

const TestCustomField = () => {
  const onChangeRef = React.useRef<(e) => void>();
  const fieldRef = React.useRef<HTMLInputElement>();
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    VendorApi.init<string>(fieldId, {
      setValue: (value: string): PromiseOr<void> => {
        fieldRef.current.value = value;
      },
      getValue: (): string => fieldRef.current.value,
      setReadOnly: (readOnly: boolean): PromiseOr<void> => {
        fieldRef.current.readOnly = readOnly;
      },
      bindOnChange: (callback: OnChangeCallback<string>): PromiseOr<void> => {
        onChangeRef.current = callback;
      },
      setOptions: (options: FieldOption[]): PromiseOr<void> =>
        setOptions(options),
    });
  }, [fieldRef, onChangeRef]);

  return (
    <div>
      <label htmlFor={fieldId}>My Custom Field</label>
      <input
        id={fieldId}
        ref={fieldRef}
        onChange={(e) => onChangeRef.current?.(e)}
      />
      {options.map(({ key, value }) => (
        <p key={key}>{value}</p>
      ))}
    </div>
  );
};

describe("Behaviours API", () => {
  test("hasBehavioursApi", () => {
    render(<TestCustomField />);

    expect(hasVendorsApi(fieldId)).toEqual(true);
  });

  test("setValue", () => {
    render(<TestCustomField />);

    getVendorsApi(fieldId).setValue("hello world");

    expect(screen.getByRole<HTMLInputElement>("textbox").value).toEqual(
      "hello world",
    );
  });

  test("getValue", async () => {
    render(<TestCustomField />);

    await userEvent.type(screen.getByRole("textbox"), "ola!");

    expect(getVendorsApi(fieldId).getValue()).toEqual("ola!");
  });

  test("setReadOnly", () => {
    render(<TestCustomField />);

    expect(screen.getByRole<HTMLInputElement>("textbox").readOnly).toEqual(
      false,
    );

    getVendorsApi(fieldId).setReadOnly(true);

    expect(screen.getByRole<HTMLInputElement>("textbox").readOnly).toEqual(
      true,
    );

    getVendorsApi(fieldId).setReadOnly(false);

    expect(screen.getByRole<HTMLInputElement>("textbox").readOnly).toEqual(
      false,
    );
  });

  test("bindOnChange", async () => {
    const callback = jest.fn();
    render(<TestCustomField />);

    getVendorsApi(fieldId).bindOnChange(callback);

    await userEvent.type(screen.getByRole("textbox"), "fire in the hole!");

    expect(callback).toHaveBeenCalled();
  });

  test("setOptions", () => {
    render(<TestCustomField />);

    act(() =>
      getVendorsApi(fieldId).setOptions([
        { key: "1", value: "one" },
        { key: "2", value: "two" },
      ]),
    );

    expect(screen.getByText("one")).toBeVisible();
    expect(screen.getByText("two")).toBeVisible();
  });
});
