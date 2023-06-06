import { FunctionComponent } from "react";
import MessageIcon from "@mui/icons-material/Message";
import NodePanelBox from "./NodePanelBox";
import { NodeTypeEnum } from "../chatFlowInterface";

interface Props {}

const NodePanel: FunctionComponent<Props> = ({}) => {
  const onDragStart = (event: any, nodeType: NodeTypeEnum) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="border-l border-gray-300 h-full p-4">
      <div className="grid grid-cols-2 gap-4">
        <NodePanelBox
          text="Message"
          icon={<MessageIcon />}
          onDragStart={onDragStart}
          nodeType={NodeTypeEnum.TEXT}
        />
      </div>
    </div>
  );
};
export default NodePanel;
