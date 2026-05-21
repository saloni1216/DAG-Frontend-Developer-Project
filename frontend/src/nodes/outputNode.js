import { useState } from 'react';
import { BaseNode, nodeStyles } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || id);
  const [type, setType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode title="Output" targetHandles={[{ id: `${id}-value` }]}>
      <label style={nodeStyles.label}>
        Name:
        <input style={nodeStyles.input} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label style={nodeStyles.label}>
        Type:
        <select style={nodeStyles.input} value={type} onChange={(e) => setType(e.target.value)}>
          <option>Text</option>
          <option>Image</option>
        </select>
      </label>
    </BaseNode>
  );
};