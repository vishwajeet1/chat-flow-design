import ReactFlow, { Background, Controls } from "reactflow";

import CustomNode from "./CustomNode";

import "reactflow/dist/style.css";
import useChatFlow from "./hook/useChatFlow";
import Navbar from "Component/Common/Navbar";
import NodePanel from "../ChatFlow/NodePanel";

const nodeTypes = {
  custom: CustomNode,
};

const BasicFlow = () => {
  const {
    reactFlowInstance,
    reactFlowWrapper,
    setReactFlowInstance,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
  } = useChatFlow();
  return (
    <div className="h-full">
      <Navbar onClick={() => {}} />
      <div className="flex w-full h-full">
        <div className="w-2/3">
          <div ref={reactFlowWrapper} className="w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
        <div className="w-1/3">
          <NodePanel />
        </div>
      </div>
    </div>
  );
};

export default BasicFlow;
