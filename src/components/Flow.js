import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactFlow, { Controls, Background, useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import TextNode from "./nodes/TextNode";
import {
  addNode,
  onEdgesChange,
  onNodesChange,
  updateNodeId,
  onConnect,
  selectNode,
} from "../redux/flowDataSlice"; // importing all the reducers from redux
import toast from "react-hot-toast";

const nodeTypes = {
  // types of node available, can be modified later if more nodes are added
  text: TextNode,
};

const gridSize = 20;

const Flow = () => {
  const dispatch = useDispatch();
  const { nodes, edges, nodeID } = useSelector((state) => state.flowData); // retrieving the nodes ande edges data from redux state
  const reactFlowWrapper = useRef(null); // created a refrence to get the bounds for the react flow canvas
  const { screenToFlowPosition } = useReactFlow();

  const getInitNodeData = (nodeID) => {
    let nodeData = { id: nodeID, nodeType: "text", label: `Node ${nodeID}` }; // returns the initial data for the nodes
    return nodeData;
  };

  const handleNodeChange = (event) => {
    dispatch(onNodesChange(event)); // dispatches the node changes through the onNodesChange reducer
  };

  const handleEdgeChange = (event) => {
    dispatch(onEdgesChange(event)); // dispatches the edge changes through the onEdgesChange reducer
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const appData = JSON.parse(
      event.dataTransfer.getData("application/reactflow")
    ); // retrieves the data from the dataTranfer state
    const type = appData?.nodeType;

    if (typeof type === "undefined" || !type) {
      return;
    }

    const position = screenToFlowPosition({
      // gets the current position to drop the node
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      // properties of the new node
      id: `${nodeID}`,
      type,
      position,
      data: getInitNodeData(nodeID, type), // returns the data which we saw earlier
    };

    dispatch(addNode(newNode)); // adds thw new to the nodes through dispatching addNodes reducer
    dispatch(updateNodeId()); // updates the id for the next node to be added
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onConnectEdges = (event) => {
    const existingEdge = edges.find((edge) => edge.source === event.source); // chechs whether there is an existing edge from the source handle
    if (!existingEdge) {
      dispatch(onConnect(event)); // if not dispatch is called to add an edge
    } else {
      toast.error("A source node can only have one outgoing edge."); // else error is shown
    }
  };

  const onNodeSelect = (event, node) => {
    dispatch(selectNode(node)); // updates the selected node by dispatching it through selectNode
  };

  return (
    <div className="w-10/12 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodeChange}
        onEdgesChange={handleEdgeChange}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onConnect={onConnectEdges}
        onNodeClick={onNodeSelect}
        snapGrid={[gridSize, gridSize]}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Flow;
