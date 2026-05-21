import { useState } from "react";
import { BaseNode, nodeStyles } from "./BaseNode";

export const ApiNode = ({ id, data }) => {
  const [requestUrl, setRequestUrl] = useState(
    data?.requestUrl || "https://api.example.com"
  );
  const [responseField, setResponseField] = useState(
    data?.responseField || "data"
  );

  return (
    <BaseNode
      title="API"
      targetHandles={[{ id: `${id}-request` }]}
      sourceHandles={[{ id: `${id}-response` }]}
    >
      <label style={nodeStyles.label}>
        Endpoint:
        <input
          style={nodeStyles.input}
          value={requestUrl}
          onChange={(e) => setRequestUrl(e.target.value)}
        />
      </label>
      <label style={nodeStyles.label}>
        Response Key:
        <input
          style={nodeStyles.input}
          value={responseField}
          onChange={(e) => setResponseField(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
