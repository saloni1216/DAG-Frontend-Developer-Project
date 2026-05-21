import { useState } from 'react';
import { BaseNode, nodeStyles } from './BaseNode';

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState('add');
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState(null);

  const calculateResult = () => {
    const nums = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length < 2) {
      setResult('Error: Need 2+ numbers');
      return;
    }
    let res = nums[0];
    for (let i = 1; i < nums.length; i++) {
      if (operation === 'add') res += nums[i];
      else if (operation === 'subtract') res -= nums[i];
      else if (operation === 'multiply') res *= nums[i];
      else if (operation === 'divide') res /= nums[i];
    }
    setResult(res);
  };

  return (
    <BaseNode title="Internal Math" targetHandles={[{ id: `${id}-input` }]} sourceHandles={[{ id: `${id}-output` }]}>
      <label style={nodeStyles.label}>Operation:
        <select style={nodeStyles.input} value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option value="add">Add (+)</option>
          <option value="subtract">Subtract (-)</option>
          <option value="multiply">Multiply (×)</option>
          <option value="divide">Divide (÷)</option>
        </select>
      </label>
      <label style={nodeStyles.label}>Numbers:
        <input style={nodeStyles.input} value={numbers} placeholder="10, 20" onChange={(e) => setNumbers(e.target.value)} />
      </label>
      <button style={nodeStyles.button} onClick={calculateResult}>Calculate</button>
      <div style={{ marginTop: '5px', fontSize: '10px' }}>Result: {result !== null ? result : '---'}</div>
    </BaseNode>
  );
};