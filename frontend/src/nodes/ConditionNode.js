import { useState } from "react";
import { BaseNode, nodeStyles } from "./BaseNode";

export const ConditionNode = ({ id }) => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("---");

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === "") setResult("---");
    else if (val === "0") setResult("False");
    else if (val === "1") setResult("True");
    else setResult(val);
  };

  return (
    <BaseNode
      title="Condition"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[
        { id: `${id}-true`, style: { top: "30%" } },
        { id: `${id}-false`, style: { top: "70%" } },
      ]}
    >
      <label style={nodeStyles.label}>
        Input Value:
        <input
          style={nodeStyles.input}
          value={inputValue}
          onChange={handleInputChange}
          placeholder="0 or 1"
        />
      </label>
      <div style={{ padding: "5px", background: "#f9f9f9", fontSize: "11px" }}>
        Logic Result: {result}
      </div>
    </BaseNode>
  );
};
