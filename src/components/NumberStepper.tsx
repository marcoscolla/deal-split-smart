import React, { useEffect, useRef } from "react";

type NumberStepperProps = {
  value: number;
  onChange: (v: number) => void;
  step?: number; // default 0.5
  min?: number;
  max?: number;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
};

/**
 * Helper to clamp to min/max if provided.
 */
const clamp = (v: number, lo?: number, hi?: number) => {
  if (lo !== undefined && v < lo) return lo;
  if (hi !== undefined && v > hi) return hi;
  return v;
};

/**
 * Rounds to two decimal places to avoid floating point drift for .5 steps.
 */
const roundToTwo = (n: number) => Math.round(n * 100) / 100;

export default function NumberStepper({
  value,
  onChange,
  step = 0.5,
  min,
  max,
  disabled = false,
  ariaLabel = "number stepper",
  className,
  inputClassName,
  buttonClassName,
}: NumberStepperProps) {
  const repeatRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const update = (delta: number) => {
    const next = clamp(roundToTwo((Number.isNaN(value) ? 0 : value) + delta), min, max);
    onChange(next);
  };

  const startRepeat = (delta: number) => {
    if (disabled) return;
    update(delta);
    // single timeout then interval for hold-to-repeat
    if (repeatRef.current) stopRepeat();
    // Delay then start interval
    // Using window.setTimeout / setInterval returns numeric id
    repeatRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => update(delta), 120) as unknown as number;
    }, 350) as unknown as number;
  };

  const stopRepeat = () => {
    if (repeatRef.current) {
      window.clearTimeout(repeatRef.current);
      repeatRef.current = null;
    }
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopRepeat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      update(step);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      update(-step);
    } else if (e.key === "PageUp") {
      e.preventDefault();
      update(step * 10);
    } else if (e.key === "PageDown") {
      e.preventDefault();
      update(-step * 10);
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const raw = e.target.value;
    // allow empty input
    if (raw === "") {
      onChange(NaN);
      return;
    }
    const parsed = parseFloat(raw);
    if (!Number.isNaN(parsed)) onChange(clamp(roundToTwo(parsed), min, max));
  };

  // Minimal default styling; replace with your tailwind/classes
  const wrapperStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 6 };
  const btnStyle: React.CSSProperties = {
    minWidth: 34,
    height: 34,
    borderRadius: 6,
    border: "1px solid #e5e7eb",
    background: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 18,
  };
  const inputStyle: React.CSSProperties = {
    width: 96,
    textAlign: "center",
    padding: "6px 8px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
  };

  return (
    <div className={className} style={wrapperStyle}>
      <button
        type="button"
        aria-label={`decrease ${ariaLabel}`}
        onMouseDown={() => startRepeat(-step)}
        onMouseUp={stopRepeat}
        onMouseLeave={stopRepeat}
        onTouchStart={() => startRepeat(-step)}
        onTouchEnd={stopRepeat}
        disabled={disabled}
        className={buttonClassName}
        style={btnStyle}
      >
        −
      </button>

      <input
        inputMode="decimal"
        aria-label={ariaLabel}
        className={inputClassName}
        type="number"
        step={step}
        value={Number.isNaN(value) ? "" : value}
        onChange={onInputChange}
        onKeyDown={handleKey}
        disabled={disabled}
        style={inputStyle}
        min={min}
        max={max}
      />

      <button
        type="button"
        aria-label={`increase ${ariaLabel}`}
        onMouseDown={() => startRepeat(step)}
        onMouseUp={stopRepeat}
        onMouseLeave={stopRepeat}
        onTouchStart={() => startRepeat(step)}
        onTouchEnd={stopRepeat}
        disabled={disabled}
        className={buttonClassName}
        style={btnStyle}
      >
        +
      </button>
    </div>
  );
}
