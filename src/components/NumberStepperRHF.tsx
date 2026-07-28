import React from "react";
import { Controller, Control } from "react-hook-form";
import NumberStepper from "./NumberStepper";

type Props<T> = {
  name: string;
  control: Control<T>;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  ariaLabel?: string;
};

export function NumberStepperRHF<T>({ name, control, step = 0.5, min, max, disabled, ariaLabel }: Props<T>) {
  return (
    <Controller
      name={name as any}
      control={control as any}
      render={({ field }) => {
        const value = typeof field.value === "number" ? field.value : Number.isNaN(Number(field.value)) ? NaN : Number(field.value);
        return (
          <NumberStepper
            value={Number.isNaN(value) ? 0 : value}
            onChange={(v) => field.onChange(v)}
            step={step}
            min={min}
            max={max}
            disabled={disabled}
            ariaLabel={ariaLabel}
          />
        );
      }}
    />
  );
}

export default NumberStepperRHF;
