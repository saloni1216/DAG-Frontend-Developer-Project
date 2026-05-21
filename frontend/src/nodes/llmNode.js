import { BaseNode} from './BaseNode';
export const LLMNode = ({ id }) => (
  <BaseNode title="LLM" 
    targetHandles={[{ id: `${id}-system`, style: { top: '30%' } }, { id: `${id}-prompt`, style: { top: '70%' } }]} 
    sourceHandles={[{ id: `${id}-response` }]}>
    <p style={{ fontSize: '12px' }}>This is an LLM node.</p>
  </BaseNode>
);