import React from "react";
import ChatFlow from "./Component/ChatFlow";
import { ReactFlowProvider } from "reactflow";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ReactFlowProvider>
        <ChatFlow />
        <ToastContainer position="top-center" />
      </ReactFlowProvider>
    </div>
  );
}

export default App;
