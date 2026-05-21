// toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const toolbarStyle = {
        padding: '10px',
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    };

    const textStyle = {
        color: 'white',
        fontSize: '22px',
        fontWeight: '800',
        letterSpacing: '-0.02em',
        margin: 0,
        background: 'linear-gradient(to right, #ffffff 20%, #94a3b8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const buttonContainerStyle = {
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '12px', 
        justifyContent: 'center',
        maxWidth: '1000px'
    };

    return (
        <div style={toolbarStyle}>
            <h2 style={textStyle}>
                Workflow <span style={{ color: '#818cf8', WebkitTextFillColor: '#818cf8' }}>Nodes</span>
            </h2>
            
            <div style={buttonContainerStyle}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='delay' label='Delay' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='condition' label='Condition' />
                <DraggableNode type='image' label='Image' />
            </div>
        </div>
    );
};