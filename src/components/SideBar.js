import React from "react";
import { MessageSquareText } from "lucide-react";
import DraggableNode from "./DraggableNode";

const SideBar = () => {
  return (
    <div className="w-2/12 h-full flex flex-col gap-4 justify-start items-center border-l border-l-primary-300 border-opacity-30">
      <div className="w-full h-8 flex items-center text-primary-300 justify-center bg-primary-100">
        Nodes Panel
      </div>
      <DraggableNode
        type="text"
        label="Text"
        nodeIcon={<MessageSquareText />}
      />
    </div>
  );
};

export default SideBar;
