import { createSlice } from "@reduxjs/toolkit";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";

const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("flowData"); // retrieves the data from the locastorage
    if (serializedState === null) {
      // if nothing is found return undefined
      return undefined;
    }
    return JSON.parse(serializedState); // else returns the data
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

const initialState = loadStateFromLocalStorage() || {
  // if data is found in the localstorage, initialState is set to tha
  nodeID: 1,
  nodes: [],
  edges: [],
  selectedNode: null, //else set to initial values
};

const flowDataSlice = createSlice({
  // redux slice to handel the state and reducers.
  name: "flowDataSlice",
  initialState, // initial state of out application
  reducers: {
    updateNodeId: (state) => {
      state.nodeID++; // maintains an unique id for every text node
    },
    addNode: (state, action) => {
      state.nodes = [...state.nodes, action.payload]; // adds a node on drag and drop
    },
    onNodesChange: (state, action) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes); // any changes to the node gets implemented through the applyNodeChanges
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges); // any changes to the node edges gets implemented through the applyEdgeChanges
    },
    onConnect: (state, action) => {
      state.edges = addEdge(action.payload, state.edges); // adds an edge between two handles of nodes
    },
    selectNode: (state, action) => {
      state.selectedNode = action.payload; // selects the node to edit
    },
    updateNodeText: (state, action) => {
      const { id, label } = action.payload;
      const node = state.nodes.find((n) => n.id === id); // finds the node which havs been selected
      if (node) {
        node.data.label = label; // edits the label which gets displayed inside the node
      }
    },
    saveData: (state) => {
      try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("flowData", serializedState); // save the data to the localstorage
      } catch (err) {
        console.error("Could not save state", err);
      }
    },
  },
});

export const {
  updateNodeId,
  addNode,
  onNodesChange,
  onEdgesChange,
  onConnect,
  selectNode,
  updateNodeText,
  saveData,
} = flowDataSlice.actions; // exporting allthe reducers that will be used through out our project
export default flowDataSlice.reducer;
