import { useCallback } from "react";

const DraggableNode = ({ label, type, nodeIcon }) => {
  const handleDragStart = useCallback((event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  }, []);

  const handleDragEnd = useCallback((event) => {
    event.target.style.cursor = "grab";
  }, []);

  return (
    <div
      className=" w-40 h-20 border border-primary-300 rounded-md flex flex-col justify-center items-center text-primary-300"
      draggable
      onDragStart={(event) => handleDragStart(event, type)}
      onDragEnd={(event) => handleDragEnd(event)}
    >
      {nodeIcon}
      <span>{label}</span>
    </div>
  );
};

export default DraggableNode;
