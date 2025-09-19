# 🚀 VectorShift - Frontend Technical Assessment

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactFlow-11.8.3-FF6B6B?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-0.68.0-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4.1.13-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-4.0.0-181717?style=for-the-badge&logo=zustand&logoColor=white"/>
  <img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
</div>

---

## 🌟 Project Overview

This project is a comprehensive full-stack application that replicates the core functionality of VectorShift's visual pipeline editor. It features an intuitive drag-and-drop interface for creating complex data processing pipelines or AI workflows with real-time DAG (Directed Acyclic Graph) validation and dynamic variable handling.

**Design Inspiration**: The UI design and interaction patterns are directly inspired by <a href="https://vectorshift.ai">VectorShift</a> Pipeline interface, emphasizing clean aesthetics, intuitive workflows, and powerful abstraction capabilities.

---

## 🏗️ Architecture Overview

### Frontend Architecture

```
src/
├── components/          # Reusable UI components
│   ├── ui.js           # Main pipeline canvas
│   ├── toolbar.js      # Node palette and controls
│   ├── submit.js       # Pipeline submission logic
│   ├── alert.js        # Modal notifications
│   └── draggableNode.js # Draggable node implementation
├── nodes/               # Node system architecture
│   ├── abstractNode.js  # Core node abstraction
│   ├── nodeFields.js   # Dynamic field rendering
│   └── rootNode.js     # Base node component
├── config/
│   └── nodeConfig.js   # Node type definitions
└── store/
    └── store.js        # Global state management
```

### Backend Architecture

```
backend/
└── main.py             # FastAPI server with DAG validation
```

---

## 🧠 Core System Logic

### 1. Node Abstraction System

The application implements a sophisticated node abstraction system that enables dynamic creation and management of pipeline components:

#### **AbstractNode.js - Core Abstraction**

```javascript
const AbstractNode = ({ id, data, type }) => {
	const config = nodeConfig[type];
	// Dynamic handle management and configuration
	// Automatic node type resolution
	// Runtime field validation
};
```

**Key Features:**

- **Dynamic Type Resolution**: Automatically resolves node types from configuration
- **Handle Management**: Dynamically manages input/output connection points
- **Field Rendering**: Renders appropriate input fields based on node type
- **Extensibility**: Easy addition of new node types through configuration

#### **Node Configuration System**

Each node type is defined in `nodeConfig.js` with:

- **Handles**: Input/output connection points
- **Fields**: Dynamic form fields (text, textarea, select)
- **Styling**: Custom visual appearance
- **Icons**: Visual representation in toolbar

### 2. Variable Interpolation System (`{{var_name}}`)

The application features a sophisticated variable interpolation system that enables dynamic connections between nodes:

#### **Dynamic Handle Creation**

```javascript
const updateHandles = (value) => {
	const regex = /{{(.*?)}}/g;
	const matches = [];
	let match;
	while ((match = regex.exec(value)) !== null) {
		matches.push(match[1]);
	}

	if (matches.length > 0) {
		setHandles((prev) => ({
			outputs: nodeConfig[type]?.handles?.outputs || [],
			inputs: Array.from(
				new Set([...nodeConfig[type]?.handles?.inputs, ...matches])
			),
		}));
	}
};
```

**How it Works:**

1. **Pattern Detection**: Regex parsing identifies `{{variable_name}}` patterns in text fields
2. **Handle Generation**: Automatically creates input handles for each detected variable
3. **Real-time Updates**: Handles update dynamically as users type
4. **Deduplication**: Prevents duplicate handles for the same variable
5. **Visual Feedback**: New connection points appear instantly on the node

**Example Usage:**

- Type `"Hello {{name}}, your score is {{score}}"` in a text field
- System automatically creates `name` and `score` input handles
- Other nodes can connect to provide these values

### 3. Backend Parse Pipeline API

The backend provides a robust pipeline analysis service built with FastAPI:

#### **API Endpoint: `/pipelines/parse`**

```python
@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    is_dag = check_is_dag(data.nodes, data.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
```

**Request Format:**

```json
{
  "nodes": [
    {
      "id": "node_1",
      "type": "input",
      "data": {...},
      "position": {"x": 100, "y": 200}
    }
  ],
  "edges": [
    {
      "id": "edge_1",
      "source": "node_1",
      "target": "node_2",
      "sourceHandle": "output",
      "targetHandle": "input"
    }
  ]
}
```

### 4. DAG Validation Logic

The system implements a sophisticated Directed Acyclic Graph validation algorithm using DFS-based cycle detection:

#### **Three-Color DFS Algorithm**

```python
def check_is_dag(nodes, edges):
    WHITE, GRAY, BLACK = 0, 1, 2  # Node states
    colors = {node_id: WHITE for node_id in node_ids}

    def has_cycle(node):
        if colors[node] == GRAY:    # Back edge found - cycle detected
            return True
        if colors[node] == BLACK:   # Already processed
            return False

        colors[node] = GRAY         # Mark as being processed

        for neighbor in graph[node]:
            if has_cycle(neighbor):
                return True

        colors[node] = BLACK        # Mark as fully processed
        return False
```

**Algorithm Explanation:**

- **WHITE (0)**: Unvisited node
- **GRAY (1)**: Currently being processed (in DFS path)
- **BLACK (2)**: Fully processed (all descendants visited)
- **Cycle Detection**: If we encounter a GRAY node during traversal, a back edge exists → cycle detected

---

## 🎯 Key Features Implemented

### ✅ Core Pipeline Features

- **🎨 Drag & Drop Interface**: Intuitive node placement and connection
- **🔗 Dynamic Node Connections**: Visual edge creation between compatible nodes
- **📝 Real-time Variable Binding**: `{{variable}}` syntax with automatic handle generation
- **🔄 Live DAG Validation**: Real-time cycle detection and validation
- **💾 Pipeline Persistence**: State management with Zustand

### ✅ Node Management

- **➕ Add New Nodes**: Drag from toolbar to canvas
- **🗑️ Delete Nodes**: Right-click context menu or keyboard shortcuts
- **🔧 Node Configuration**: Dynamic form fields based on node type
- **🎯 Node Abstraction**: Unified interface for all node types
- **🔌 Dynamic Handles**: Auto-generated connection points

### ✅ Canvas Operations

- **🧹 Clear Canvas**: One-click pipeline reset with confirmation
- **🔍 Zoom & Pan**: Smooth canvas navigation
- **📐 Grid Snapping**: Precise node alignment
- **🎨 Visual Feedback**: Hover states and connection previews

### ✅ Pipeline Analysis

- **📊 Node/Edge Counting**: Real-time statistics
- **✅ DAG Validation**: Cycle detection and validation
- **📤 Pipeline Export**: JSON serialization for backend processing
- **🚨 Error Handling**: Comprehensive error reporting

### ✅ User Experience

- **🎉 Toast Notifications**: Real-time feedback for user actions
- **📱 Responsive Design**: Works across different screen sizes
- **⚡ Performance Optimized**: Efficient rendering and state updates
- **🎨 Professional UI**: Clean, modern interface inspired by VectorShift

---

## 🛠️ Technology Stack

### **Frontend**

| Technology          | Version | Purpose                                |
| ------------------- | ------- | -------------------------------------- |
| **React**           | 18.2.0  | Core UI framework                      |
| **ReactFlow**       | 11.8.3  | Pipeline visualization and interaction |
| **Zustand**         | 4.0.0   | Lightweight state management           |
| **TailwindCSS**     | 4.1.13  | Utility-first styling                  |
| **React Hot Toast** | 2.6.0   | Elegant notifications                  |
| **React Icons**     | 5.5.0   | Professional icon library              |
| **React Tooltip**   | 5.29.1  | Interactive tooltips                   |

### **Backend**

| Technology   | Version | Purpose                           |
| ------------ | ------- | --------------------------------- |
| **FastAPI**  | Latest  | High-performance API framework    |
| **Uvicorn**  | Latest  | ASGI server for FastAPI           |
| **Pydantic** | Latest  | Data validation and serialization |
| **Python**   | 3.8+    | Backend runtime                   |

### **Development Tools**

- **Create React App**: Project bootstrapping and build tools
- **ESLint**: Code linting and formatting
- **CORS**: Cross-origin resource sharing
- **JSON**: Data interchange format

---

## 🚀 Getting Started

### **Prerequisites**

- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn package manager

### **Installation & Setup**

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd frontend_technical_assessment
   ```

2. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_SERVER_URL=http://localhost:5000
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm start

   # In a separate terminal, run Tailwind CLI
   npx @tailwindcss/cli -i ./src/index.css -o ./src/output.css --watch
   ```

   The frontend will run on `http://localhost:3000`

4. **Backend Setup**

   ```bash
   cd backend
   pip install fastapi uvicorn
   python main.py
   ```

   The backend will run on `http://localhost:5000`


### **Usage Guide**

1. **Creating Nodes**: Drag node types from the toolbar to the canvas
2. **Connecting Nodes**: Click and drag from output handles to input handles
3. **Configuring Nodes**: Select nodes to edit their properties in the sidebar
4. **Using Variables**: Type `{{variable_name}}` in text fields to create dynamic inputs
5. **Submitting Pipeline**: Click "Submit Pipeline" to validate and analyze
6. **Clearing Canvas**: Use "Clear Canvas" to reset the workspace
---

<div align="center">
  <p><em>Built with ❤️ for the VectorShift Frontend Technical Assessment</em></p>
  <p><strong>Showcasing modern web development practices and clean architecture</strong></p>
</div>
