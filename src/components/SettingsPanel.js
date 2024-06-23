import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNode, updateNodeText } from "../redux/flowDataSlice";
import { TextareaAutosize } from "@mui/base";

const SettingsPanel = () => {
  const { selectedNode } = useSelector((state) => state.flowData);
  const [label, setLabel] = useState(selectedNode?.data?.label || "");
  const dispatch = useDispatch();

  useEffect(() => {
    setLabel(selectedNode.data.label);
  }, [selectedNode]);

  const handleChange = (event) => {
    //updates the label when the input changes
    setLabel(event.target.value);
  };

  const handleSave = () => {
    dispatch(updateNodeText({ id: selectedNode.id, label: label })); // updates the text inside the node selected through updateNodeText reducer
    dispatch(selectNode(null));
  };

  return (
    <div className="w-2/12 h-full flex flex-col gap-4 justify-start items-center border-l border-l-primary-300 border-opacity-30">
      <div className="w-full h-8 flex items-center text-primary-300 justify-center bg-primary-100">
        Settings Panel
      </div>
      <TextareaAutosize
        type="text"
        value={label}
        onChange={handleChange}
        className="w-10/12 h-fit border border-primary-300 rounded-md p-1"
        minRows={5}
      />
      <button
        className="h-fit flex justify-start items-center bg-primary-100 p-0.5 border border-primary-200 rounded-md"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default SettingsPanel;
