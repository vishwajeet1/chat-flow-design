import { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  Connection,
  Edge,
  Node,
  OnSelectionChangeParams,
  ReactFlowState,
  useEdgesState,
  useNodesState,
  useOnSelectionChange,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import {
  initialEdges,
  initialNodes,
  flowKey,
} from "Component/ChatFlow/constant";
import useAlertMessage from "Component/ChatFlow/hook/useAlertMessage";
import debounce from "lodash/debounce";

const useChatFlow = () => {
  const reactFlowWrapper: any = useRef(null);
  const { alertMessage } = useAlertMessage();
  const { getNode, getEdges, setViewport } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [selectedNode, setSelectedNode] = useState<null | Node>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  const throttleOnAlertMessage = debounce(alertMessage, 1000);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { label: `text message...` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      if (params?.nodes?.length > 0) {
        setSelectedNode(params?.nodes?.[0]);
      } else {
        setSelectedNode(null);
      }
    },
    [reactFlowInstance]
  );

  const handleEdgeValidation = useCallback(
    (connection: Connection) => {
      const sourceConnection = connection.source && getNode(connection.source);
      if (!sourceConnection) return false;
      const edges = getConnectedEdges([sourceConnection], getEdges());
      console.log("edges", edges, connection);
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].source === connection.source) {
          console.log("handle already used");
          throttleOnAlertMessage("Multiple source are not allowed", "error");
          return false;
        }
      }
      return true;
    },
    [getNode, getEdges]
  );

  const saveFlow = useCallback(() => {
    if (reactFlowInstance) {
      if (saveValidation()) {
        const flow = reactFlowInstance.toObject();
        localStorage.setItem(flowKey, JSON.stringify(flow));
        throttleOnAlertMessage("Successfully Saved", "success");
      } else {
        throttleOnAlertMessage("Please check your flow", "error");
      }
    }
  }, [reactFlowInstance, nodes, edges]);

  useEffect(() => {
    onRestore();
  }, []);

  const saveValidation = (): boolean => {
    if (nodes) {
      const nodesWithNoEdges = nodes.filter(
        (node: Node) => !getConnectedEdges([node], edges).length
      );
      if (nodesWithNoEdges.length > 0) {
        throttleOnAlertMessage("Please connect all nodes", "error");
        return false;
      }
    }
    return true;
  };

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const data = localStorage.getItem(flowKey);
      if (data === null) return;
      const flow = JSON.parse(data);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };
    restoreFlow();
  }, [setNodes, setViewport]);

  return {
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
    onSelectionChange,
    selectedNode,
    setSelectedNode,
    handleEdgeValidation,
    saveFlow,
  };
};

export default useChatFlow;
