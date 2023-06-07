import { useCallback, useEffect, useRef, useState } from "react";
import {
  addEdge,
  Connection,
  Edge,
  Node,
  OnSelectionChangeParams,
  useEdgesState,
  useNodesState,
  useReactFlow,
  getConnectedEdges,
} from "reactflow";
import { v4 as uuidv4 } from "uuid";
import {
  initialEdges,
  initialNodes,
  flowKey,
  dragAndDropKey,
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

  const debounceOnAlertMessage = debounce(alertMessage, 1000);

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    // set the drop effect
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      // get the React flow bounds
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      // get the type of the dropped element
      const type = event.dataTransfer.getData(dragAndDropKey);
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      // get position of the dropped element
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // create a new node
      const newNode: Node = {
        id: uuidv4(),
        type,
        position,
        data: { label: `text message...` },
      };

      // add the new node to the nodes array
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onSelectionChange = useCallback(
    (params: OnSelectionChangeParams) => {
      // if there is a node selected then set the selected node
      // else set the selected node to null
      // multiple selection is not covered
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
      // check if the source node is already connected to another node
      const sourceConnection = connection.source && getNode(connection.source);

      // if sourceConnection is null then return false
      if (!sourceConnection) return false;

      // get all the edges connected to the source node
      const edges = getConnectedEdges([sourceConnection], getEdges());

      // check if the source node is already connected to another node
      for (let i = 0; i < edges.length; i++) {
        if (edges[i].source === connection.source) {
          console.log("handle already used");
          debounceOnAlertMessage("Multiple source are not allowed", "error");
          return false;
        }
      }
      return true;
    },
    [getNode, getEdges]
  );

  const saveFlow = useCallback(() => {
    if (reactFlowInstance) {
      // check if the flow is valid
      if (saveValidation()) {
        const flow = reactFlowInstance.toObject();
        // save the flow to local storage
        localStorage.setItem(flowKey, JSON.stringify(flow));
        debounceOnAlertMessage("Successfully Saved", "success");
      } else {
        debounceOnAlertMessage("Please check your flow", "error");
      }
    }
  }, [reactFlowInstance, nodes, edges]);

  useEffect(() => {
    // restore the flow from local storage on component mount
    onRestore();
  }, []);

  const saveValidation = (): boolean => {
    // check if all the nodes are connected
    if (nodes) {
      const nodesWithNoEdges = nodes.filter(
        (node: Node) => !getConnectedEdges([node], edges).length
      );
      if (nodesWithNoEdges.length > 0) {
        debounceOnAlertMessage("Please connect all nodes", "error");
        return false;
      }
    }
    return true;
  };

  const onRestore = useCallback(() => {
    // restore the flow from local storage
    const restoreFlow = async () => {
      const data = localStorage.getItem(flowKey);
      if (data === null) return;
      const flow = JSON.parse(data);
      // set the flow to react flow
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
