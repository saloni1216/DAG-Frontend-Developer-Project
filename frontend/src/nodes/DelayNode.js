import { useState } from "react";
import { BaseNode, nodeStyles } from "./BaseNode";

export const DelayNode = ({ id, data }) => {
  const [delayTime, setDelayTime] = useState(data?.delayTime || 5);

  return (
    <BaseNode
      title="Delay"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[{ id: `${id}-output` }]}
    >
      <label style={nodeStyles.label}>
        Wait Time (s):
        <input
          style={nodeStyles.input}
          type="number"
          value={delayTime}
          onChange={(e) => setDelayTime(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
