import { Edge, Node } from "reactflow";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "Node 1" },
    position: { x: 250, y: 5 },
  },
  { id: "2", data: { label: "Node 2" }, position: { x: 100, y: 100 } },
  { id: "3", data: { label: "Node 3" }, position: { x: 400, y: 100 } },
  {
    id: "4",
    type: "custom",
    data: { label: "Custom Node" },
    position: { x: 400, y: 200 },
  },
  {
    id: "5",
    type: "custom",
    data: { label: "Custom Node" },
    position: { x: 400, y: 200 },
  },
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3" },
];
