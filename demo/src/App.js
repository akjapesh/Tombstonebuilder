import "./styles.css";
import SketchField from "./third-parts/react-sketch/src/SketchField";
import Tools from "./third-parts/react-sketch/src/tools";
import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [tool, setTool] = useState(Tools.Rectangle);
  const sketch = useRef();
  useEffect(() => {
    console.log(sketch.current._fc);
  });
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <SketchField
        width="1024px"
        height="360px"
        tool={tool}
        ref={sketch}
        lineColor="black"
        lineWidth={10}
      />
      <button onClick={() => setTool(Tools.Select)}> select </button>
      <button onClick={() => setTool(Tools.Rectangle)}> rect </button>
      <button onClick={() => setTool(Tools.Circle)}> circle </button>
    </div>
  );
}
