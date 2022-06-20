import { useState } from "react";
import tools from "../../../../third-parts/react-sketch/src/tools";
export const useToolState = () => {
  const [tool, setTool] = useState(tools.Select);
  const handleToolChange = (newTool) => {
    setTool(newTool);
  };
  return { tool, handleToolChange };
};