import { FunctionComponent } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Node } from "reactflow";
import InputNodeSetting from "Component/ChatFlow/NodeSetting/InputNodeSetting";

interface Props {
  selectedNode: Node;
  setSelectedNode: (node: Node | null) => void;
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
}

const NodeSetting: FunctionComponent<Props> = ({
  selectedNode,
  setSelectedNode,
  setNodes,
}) => {
  return (
    <div>
      <div
        className="flex justify-start gap-4 border-b border-gray-300 text-gray-500 font-bold py-2"
        onClick={() => setSelectedNode(null)}
      >
        <div>
          <ArrowBackIcon />
        </div>
        <div className="self-center">Message</div>
      </div>
      <div className="py-4">
        <InputNodeSetting selectedNode={selectedNode} setNodes={setNodes} />
      </div>
    </div>
  );
};
export default NodeSetting;
