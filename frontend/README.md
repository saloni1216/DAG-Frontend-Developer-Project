# 🚀 Workflow Nodes – Visual DAG Builder

A modern **visual workflow builder** built with **React, React Flow, Zustand, and FastAPI**.
The application allows users to create workflow pipelines by dragging and connecting different types of nodes on a canvas and then validates whether the created workflow forms a **Directed Acyclic Graph (DAG)**.

---

## 📌 Project Overview

**Workflow Nodes** is a visual pipeline editor designed to demonstrate how complex workflows can be created and analyzed using a node-based interface.

Users can:

* Drag and drop different nodes onto the workflow canvas
* Connect nodes using visual edges
* Configure node-specific inputs
* Create dynamic connections based on variables
* Perform mathematical operations
* Add conditions and delays
* Configure API-related nodes
* Generate/display images based on input
* Submit the workflow for backend analysis
* Check the total number of nodes and edges
* Validate whether the workflow is a valid **DAG**

The project combines an interactive frontend with a FastAPI backend that performs graph analysis using **Kahn's Algorithm**.

---

## ✨ Features

### 🎨 Visual Workflow Builder

* Drag-and-drop node creation
* Interactive workflow canvas
* Zoom and pan support
* Grid-based node positioning
* MiniMap for easier navigation
* Workflow controls

### 🧩 Multiple Custom Nodes

The application includes the following nodes:

| Node                | Description                                       |
| ------------------- | ------------------------------------------------- |
| **Input**           | Accepts text or file input                        |
| **LLM**             | Represents an LLM processing node                 |
| **Output**          | Defines workflow output                           |
| **Text**            | Supports dynamic variables such as `{{variable}}` |
| **API**             | Configures API endpoint and response field        |
| **Delay**           | Adds a configurable delay                         |
| **Math**            | Performs arithmetic operations                    |
| **Condition**       | Evaluates input as True/False                     |
| **Image Generator** | Displays images based on input                    |

---

## 🔗 Dynamic Text Variables

The **Text Node** supports dynamic variables using the following syntax:

```text
{{variable}}
```

For example:

```text
Hello {{username}}
```

The application automatically detects variables and creates corresponding input handles dynamically.

This makes the Text Node flexible for building reusable workflow pipelines.

---

## 🧮 Math Node

The Math Node supports multiple arithmetic operations:

* Addition
* Subtraction
* Multiplication
* Division

Example:

```text
Input: 10, 20, 30
Operation: Add

Result: 60
```

---

## 🔀 Condition Node

The Condition Node evaluates an input value.

```text
0 → False
1 → True
```

It provides separate output handles for:

* True
* False

This allows workflows to branch based on conditions.

---

## 🖼️ Image Generator Node

The Image Generator Node accepts an image keyword and displays the corresponding image.

Supported examples include:

```text
cat
dog
flower
panda
```

---

## ⏱️ Delay Node

The Delay Node allows users to configure a waiting period in seconds.

Example:

```text
Wait Time: 5 seconds
```

---

## 🔌 API Node

The API Node provides configuration fields for:

* API Endpoint
* Response Key

Example:

```text
Endpoint:
https://api.example.com

Response Key:
data
```

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │     React Frontend   │
                    │                      │
                    │    React Flow UI     │
                    │          │           │
                    │          ▼           │
                    │    Zustand Store     │
                    └──────────┬───────────┘
                               │
                               │ POST /pipelines/parse
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    │                      │
                    │   DAG Validation     │
                    │   Kahn's Algorithm   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Pipeline Analysis    │
                    │                      │
                    │ • Node Count         │
                    │ • Edge Count         │
                    │ • Is DAG?            │
                    └──────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

* **React 18**
* **React Flow**
* **Zustand**
* JavaScript
* HTML5
* CSS

## Backend

* **Python**
* **FastAPI**
* **Uvicorn**
* CORS Middleware

## Algorithm

* **Kahn's Algorithm**
* Topological sorting
* Directed graph cycle detection

---

# 📁 Project Structure

```text
DAG-Frontend-Developer-Project/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── nodes/
│   │   │   ├── ApiNode.js
│   │   │   ├── BaseNode.js
│   │   │   ├── ConditionNode.js
│   │   │   ├── DelayNode.js
│   │   │   ├── ImageNode.js
│   │   │   ├── MathNode.js
│   │   │   ├── inputNode.js
│   │   │   ├── llmNode.js
│   │   │   ├── outputNode.js
│   │   │   └── textNode.js
│   │   │
│   │   ├── App.js
│   │   ├── draggableNode.js
│   │   ├── index.js
│   │   ├── store.js
│   │   ├── submit.js
│   │   ├── toolbar.js
│   │   └── ui.js
│   │
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

# ⚙️ How It Works

### 1. Add Nodes

Select a node from the toolbar and drag it onto the workflow canvas.

```text
Input
LLM
Output
Text
API
Delay
Math
Condition
Image
```

### 2. Connect Nodes

Connect the output handle of one node to the input handle of another node.

The application creates animated smooth-step edges between nodes.

### 3. Configure Nodes

Each node provides its own configuration options.

For example:

```text
Math Node
   ↓
Operation: Add
Numbers: 10,20
   ↓
Result: 30
```

### 4. Submit Workflow

Click the **Submit Workflow** button.

The frontend sends the current workflow to the backend:

```http
POST /pipelines/parse
```

with:

```json
{
  "nodes": [],
  "edges": []
}
```

### 5. Backend Analysis

The FastAPI backend:

1. Counts nodes
2. Counts edges
3. Builds an adjacency list
4. Calculates node in-degrees
5. Performs topological sorting
6. Determines whether the graph contains a cycle

---

# 🧠 DAG Validation

The backend uses **Kahn's Algorithm** to determine whether the workflow is a Directed Acyclic Graph.

### Valid DAG

```text
Input
  ↓
Text
  ↓
Math
  ↓
Output
```

Result:

```text
Is DAG: Yes
```

### Cyclic Graph

```text
Node A → Node B
   ↑         ↓
   └─────────┘
```

Result:

```text
Is DAG: No
```

A graph is considered a DAG when all nodes can be processed through topological sorting without leaving any unprocessed nodes.

---

# 📡 API Endpoint

## Parse Pipeline

### Request

```http
POST /pipelines/parse
```

### Request Body

```json
{
  "nodes": [
    {
      "id": "input-1"
    },
    {
      "id": "output-1"
    }
  ],
  "edges": [
    {
      "source": "input-1",
      "target": "output-1"
    }
  ]
}
```

### Response

```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Python 3.9+
* pip

---

## 1️⃣ Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd DAG-Frontend-Developer-Project
```

---

# 2️⃣ Run the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The frontend will run at:

```text
http://localhost:3000
```

---

# 3️⃣ Run the Backend

Open a new terminal and navigate to:

```bash
cd backend
```

Install the required dependencies:

```bash
pip install fastapi uvicorn
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

The backend will run at:

```text
http://localhost:8000
```

You can verify the backend by opening:

```text
http://localhost:8000/
```

Expected response:

```json
{
  "message": "Backend is running!"
}
```

---

# 🔄 Frontend–Backend Communication

The frontend communicates with the FastAPI backend using the following endpoint:

```text
http://localhost:8000/pipelines/parse
```

The workflow's nodes and edges are sent as JSON.

```text
React Flow
    ↓
Get Nodes + Edges
    ↓
POST Request
    ↓
FastAPI
    ↓
DAG Analysis
    ↓
JSON Response
    ↓
Frontend Alert
```

---

# 📸 Application Workflow

```text
┌─────────────────────────────────────────────────┐
│                 Workflow Nodes                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  [Input] ───→ [Text] ───→ [Math] ───→ [Output] │
│                    │                            │
│                    └──→ [Condition]            │
│                                                 │
│                                                 │
├─────────────────────────────────────────────────┤
│              Submit Workflow                    │
└─────────────────────────────────────────────────┘
```

---

# 💡 Key Technical Highlights

### React Flow

Used for building the interactive node-based workflow editor.

### Zustand

Used for centralized state management of:

* Nodes
* Edges
* Node IDs
* Node changes
* Edge changes
* Connections

### Custom React Nodes

Reusable `BaseNode` architecture is used to maintain a consistent UI across different node types.

### Dynamic Handles

The Text Node dynamically creates input handles based on variables found inside:

```text
{{variable}}
```

### Kahn's Algorithm

Used on the backend for efficient DAG/cycle detection through topological sorting.

### FastAPI

Provides a lightweight API endpoint for analyzing the workflow.

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

* React component development
* State management using Zustand
* React Flow
* Drag-and-drop interfaces
* Custom reusable components
* Dynamic UI rendering
* REST API integration
* FastAPI
* Graph data structures
* Topological sorting
* DAG validation
* Frontend-backend communication
* Interactive workflow design

---

# 🔮 Future Improvements

Some possible improvements include:

* Workflow save/load functionality
* Database integration
* User authentication
* Persistent workflows
* Real API execution
* Real LLM integration
* Node deletion/duplication
* Undo/Redo support
* Workflow export/import
* Better validation and error handling
* Responsive mobile interface
* Deployment using Docker
* Production environment configuration

---

# 👩‍💻 Author

**Saloni Singh**

Frontend Developer | React.js | JavaScript | Python | FastAPI

---

## ⭐ If You Like This Project

If you find this project useful or interesting, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is intended for educational, demonstration, and portfolio purposes.
