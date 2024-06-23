import { MessageSquareText } from "lucide-react";
import { useSelector } from "react-redux";
import { Handle, Position } from "reactflow";

const TextNode = ({ id, data }) => {
  const { selectedNode } = useSelector((state) => state.flowData);
  return (
    <div
      className="h-fit w-80 shadow-md rounded-md overflow-hidden"
      style={selectedNode?.id === id ? { border: "1px solid #3144b9" } : {}}
    >
      <Handle
        id={`${id}-text-target`}
        type="target"
        position={Position.Left}
        style={{}}
      />
      <div className="node__top w-full h-8 flex justify-between items-center  p-2">
        <div className=" flex items-center gap-2">
          <MessageSquareText
            height={15}
            width={15}
            style={{ paddingTop: "2px" }}
          />
          <span className=" ">Send Message</span>
        </div>
      </div>
      <div className=" w-full min-h-10 p-2 bg-secondary-300 rounded-b-md overflow-hidden">
        <p className=" break-words">{data?.label}</p>
      </div>
      <Handle
        id={`${id}-text-source`}
        type="source"
        position={Position.Right}
        style={{}}
      />
    </div>
  );
};

export default TextNode;
