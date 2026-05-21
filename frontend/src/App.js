import { ReactFlowProvider } from 'reactflow';
import { PipelineUI } from './ui'; // Path to your main canvas
import { PipelineToolbar } from './toolbar'; // Path to your toolbar
import { SubmitButton } from './submit';

function App() {
  return (
    // This Provider must be the parent of SubmitButton
    <ReactFlowProvider>
      <div style={{ height: '100vh', width: '100vw' }}>
        <PipelineToolbar />
        <PipelineUI />
        <SubmitButton />
      </div>
    </ReactFlowProvider>
  );
}

export default App;