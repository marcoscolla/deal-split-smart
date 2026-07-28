import React, { useState } from "react";
import NumberStepper from "../src/components/NumberStepper";

export default function ReplaceExample() {
  const [value, setValue] = useState<number>(2.5);
  return (
    <div style={{ padding: 20 }}>
      <label style={{ display: "block", marginBottom: 8 }}>Amount</label>
      <NumberStepper value={value} onChange={setValue} step={0.5} min={0} max={100} />
      <div style={{ marginTop: 12 }}>Current: {value}</div>
    </div>
  );
}
