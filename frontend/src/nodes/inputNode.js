import { useState } from 'react';
import { BaseNode, nodeStyles } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || id);
  const [type, setType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode title="Input" sourceHandles={[{ id: `${id}-value` }]}>
      <label style={nodeStyles.label}>
        Name:
        <input style={nodeStyles.input} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label style={nodeStyles.label}>
        Type:
        <select style={nodeStyles.input} value={type} onChange={(e) => setType(e.target.value)}>
          <option>Text</option>
          <option>File</option>
        </select>
      </label>
    </BaseNode>
  );
};