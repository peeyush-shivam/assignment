import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveData, selectNode } from "../redux/flowDataSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const { nodes, edges } = useSelector((state) => state.flowData);
  const dispatch = useDispatch();

  const handleSave = (nodes) => {
    const nodesWithMultipleTargets = nodes.filter((node) => {
      // filters through all the nodes
      const incomingEdges = edges.filter((edge) => edge.target === node.id); // inside the node, filters out all the target edges
      const outgoingEgdes = edges.filter((edge) => edge.source === node.id); // inside the node, filters out all the source edges
      return incomingEdges.length === 0 && outgoingEgdes.length === 0; // returns the node where both the target and source handles are zero
    });

    const nodesWithEmptyLabel = nodes.filter((node) => node.data.label === ""); // filters all the nodes with empty text

    if (nodes.length < 1) {
      toast.error("Start adding nodes."); // if no nodes are present, throws error
    } else if (nodesWithMultipleTargets.length > 0) {
      toast.error("Some nodes have empty target handles."); // if  nodes with no source and target edges are present, throws error
    } else if (nodesWithEmptyLabel > 1) {
      toast.error("Some node have empy texts."); // if nodes with no text inside are present, throws error
    } else {
      toast.success("Changes saved successfully."); // if every conditions meets, it saves the data
      dispatch(saveData()); // saves the data in the local storage
      dispatch(selectNode(null)); // reset selected node to null
    }
  };

  return (
    <div className="navbar w-full h-10 flex justify-end items-center bg-primary-200">
      <div className="w-40">
        <button
          className="h-fit flex justify-start items-center bg-primary-100 p-0.5 border border-primary-200 rounded-md"
          onClick={() => handleSave(nodes)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Navbar;
