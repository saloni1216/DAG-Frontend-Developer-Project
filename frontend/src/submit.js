import { useReactFlow } from "reactflow";

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();
    console.log("Nodes:", nodes);
    console.log("Edges:", edges); 
   

    const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '');
     console.log("API URL:", process.env.REACT_APP_API_URL);

    try {
      const response = await fetch(`${API_URL}/pipelines/parse`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      // Requirement: User-friendly alert
      alert(
        `Pipeline Analysis:\n` +
          `Total Nodes: ${data.num_nodes}\n` +
          `Total Edges: ${data.num_edges}\n` +
          `Is DAG: ${data.is_dag ? "✅ Yes" : "❌ No (Cycles Found)"}`,
      );
    } catch (error) {
      alert(
        "Connection failed! Make sure your backend is running on port 8000.",
      );
    }
  };

  return (
    <button onClick={handleSubmit} style={buttonStyle}>
      Submit Workflow
    </button>
  );
};

const buttonStyle = {
  padding: "10px 24px",
  borderRadius: "8px",
  background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
  color: "white",
  border: "none",
  cursor: "pointer",
  position: "fixed",
  bottom: "25px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 1000,
};
