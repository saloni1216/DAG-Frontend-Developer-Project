import { Handle, Position } from "reactflow";

// Centralized Dynamic UI Styles
export const nodeStyles = {
  container: {
    width: 220,
    minHeight: 100,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    border: "1px solid #e2e8f0",
    padding: "16px",
    color: "#1e293b",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    transition: "all 0.2s ease-in-out",
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  title: {
    marginBottom: "12px",
    paddingBottom: "8px",
    borderBottom: "1px solid #f1f5f9",
    fontWeight: "700",
    fontSize: "13px",
    color: "#4f46e5",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "10px",
  },
  input: {
    width: "100%",
    padding: "8px 10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "12px",
    backgroundColor: "#f8fafc",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    fontSize: "12px",
    fontWeight: "600",
    marginTop: "5px",
  },
  handle: {
    width: "8px",
    height: "8px",
    background: "#4f46e5",
    border: "2px solid #fff",
  },
};

export const BaseNode = ({
  title,
  children,
  targetHandles = [],
  sourceHandles = [],
}) => {
  return (
    <div
      style={nodeStyles.container}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
    >
      {targetHandles.map((h) => (
        <Handle
          key={h.id}
          type="target"
          position={Position.Left}
          id={h.id}
          style={{ ...nodeStyles.handle, ...h.style }}
        />
      ))}
      <div style={nodeStyles.title}>{title}</div>
      <div className="nodrag" style={{ flexGrow: 1 }}>
        {children}
      </div>
      {sourceHandles.map((h) => (
        <Handle
          key={h.id}
          type="source"
          position={Position.Right}
          id={h.id}
          style={{ ...nodeStyles.handle, ...h.style }}
        />
      ))}
    </div>
  );
};
