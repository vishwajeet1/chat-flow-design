import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const TextMessageNode = ({ data, isConnectable }: NodeProps) => {
  return (
    <div className="min-w-[200px]">
      <div className="py-1 pl-2 pr-8 flex justify-start text-white bg-green-600 text-[10px] items-center gap-1 font-bold rounded-t-md">
        <WhatsAppIcon className="w-4 h-4" />
        <div>Send Message</div>
      </div>
      <div>
        <Handle type="target" position={Position.Left} />
        <div className="bg-gray-50 px-2 py-2 border border-gray-200 text-xs text-start text-gray-600">
          {data?.label}
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
};

export default memo(TextMessageNode);
