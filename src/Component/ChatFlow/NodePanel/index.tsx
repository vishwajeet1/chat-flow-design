import { FunctionComponent } from "react";
import MessageIcon from "@mui/icons-material/Message";
import NodePanelBox from "./NodePanelBox";
import { NodeTypeEnum } from "../chatFlowInterface";
import { nodePanelList } from "Component/ChatFlow/constant";

interface Props {}

const NodePanel: FunctionComponent<Props> = ({}) => {
  const onDragStart = (event: any, nodeType: NodeTypeEnum) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div className="h-full">
      <div className="flex justify-start gap-4 font-bold text-gray-600 py-4">
        <div>
          Node Panel (<span className="">Drag & Drop</span>)
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {nodePanelList.map((nodePanelItems) => (
          <NodePanelBox
            {...nodePanelItems}
            onDragStart={onDragStart}
            key={nodePanelItems.id}
          />
        ))}
      </div>
    </div>
  );
};
export default NodePanel;
