import "reactflow/dist/style.css";
import ReactFlow, { Background, Controls } from "reactflow";
import useChatFlow from "./hook/useChatFlow";
import Navbar from "Component/Common/Navbar";
import NodePanel from "../ChatFlow/NodePanel";
import NodeSetting from "Component/ChatFlow/NodeSetting";
import { nodeTypes } from "Component/ChatFlow/constant";

const BasicFlow = () => {
  const {
    reactFlowWrapper,
    setReactFlowInstance,
    nodes,
    setNodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    onDragOver,
    onDrop,
    onSelectionChange,
    selectedNode,
    setSelectedNode,
    handleEdgeValidation,
    saveFlow,
  } = useChatFlow();
  return (
    <div className="h-full">
      <Navbar
        onClick={() => {
          saveFlow();
        }}
      />
      <div className="flex w-full h-full relative z-10">
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
              onSelectionChange={onSelectionChange}
              isValidConnection={handleEdgeValidation}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
        <div className="w-1/3 pt-14 border-l border-gray-300 pl-4">
          {selectedNode ? (
            <NodeSetting
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              setNodes={setNodes}
            />
          ) : (
            <NodePanel />
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicFlow;
