import { Edge, Node } from "reactflow";
import { ReactNode } from "react";
import { NodeTypeEnum } from "Component/ChatFlow/chatFlowInterface";
import MessageIcon from "@mui/icons-material/Message";
import TextMessageNode from "Component/ChatFlow/TextMessageNode";

export const flowKey = "example-flow";
export const initialNodes: Node[] = [];

export const initialEdges: Edge[] = [];

export const nodePanelList: {
  id: number;
  icon: ReactNode;
  nodeType: NodeTypeEnum;
  text: string;
}[] = [
  {
    id: 1,
    icon: <MessageIcon />,
    nodeType: NodeTypeEnum.MESSAGE,
    text: "Message",
  },
];

export const nodeTypes = {
  [NodeTypeEnum.MESSAGE]: TextMessageNode,
};
