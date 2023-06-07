import React, { FunctionComponent } from "react";
import { Button } from "@mui/material";
import { NodeTypeEnum } from "../chatFlowInterface";

interface Props {
  icon: React.ReactNode;
  text: string;
  nodeType: NodeTypeEnum;
  onDragStart: (event: any, nodeType: NodeTypeEnum) => void;
}

const NodePanelBox: FunctionComponent<Props> = ({
  icon,
  text,
  onDragStart,
  nodeType,
}) => {
  return (
    <div
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
      className="border border-gray-400 cursor-move rounded-lg text-gray-600 py-2 px-4"
    >
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
};
export default NodePanelBox;
