import { useState, useRef, useEffect, useMemo } from 'react';
import { BaseNode, nodeStyles } from './BaseNode';

export const TextNode = ({ id, data }) => {
  // 1. State and Refs
  const [text, setText] = useState(data?.text || '{{input}}');
  const textAreaRef = useRef(null);

  // 2. Logic: Extract unique variables from text {{variableName}}
  const variables = useMemo(() => {
    const regex = /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;
    const matches = [...text.matchAll(regex)];
  
    return [...new Set(matches.map((match) => match[1]))];
  }, [text]);

  // 3. Logic: Dynamic Height Adjustment
  const adjustHeight = () => {
    const element = textAreaRef.current;
    if (element) {
      element.style.height = 'auto';
      element.style.height = `${element.scrollHeight}px`; 
    }
  };

  // Adjust height whenever text changes
  useEffect(() => {
    adjustHeight();
  }, [text]);


  const targetHandles = variables.map((varName) => ({
    id: `${id}-${varName}`,
  }));

  // Right side handle (Source)
  const sourceHandles = [{ id: `${id}-output` }];

  return (
    <BaseNode 
      title="Text" 
      targetHandles={targetHandles} 
      sourceHandles={sourceHandles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={nodeStyles.label}>
          Content:
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="nodrag"
            rows={1}
            placeholder="Type {{variable}} to add inputs..."
            style={{
              ...nodeStyles.input,
              resize: 'none',
              overflow: 'hidden',
              lineHeight: '1.5',
              marginTop: '4px',
              minHeight: '40px',
            }}
          />
        </label>

        {/* Optional Visual Indicator for Variables */}
        {variables.length > 0 && (
          <div style={variableIndicatorStyle}>
            {variables.map(v => <span key={v} style={badgeStyle}>{v}</span>)}
          </div>
        )}
      </div>
    </BaseNode>
  );
};

// --- Helper Styles ---
const variableIndicatorStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '4px',
  marginTop: '4px'
};

const badgeStyle = {
  fontSize: '9px',
  background: '#e0e7ff',
  color: '#4338ca',
  padding: '2px 6px',
  borderRadius: '4px',
  fontWeight: 'bold',
  border: '1px solid #c7d2fe'
};