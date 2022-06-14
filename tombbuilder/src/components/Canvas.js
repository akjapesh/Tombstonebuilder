import React, { useEffect, useRef, useState } from "react";
import SketchField from "../_third-parts/react-sketch/src/SketchField";
import Tools from "../_third-parts/react-sketch/src/tools";
function Canvas() {
  const [tool, setTool] = useState(Tools.Select);
  const [coordsActiveItem, setCordState] = useState({});
  const sketchProperty = useRef(null);
 

   
 
  
  useEffect(() => {
    console.log(sketchProperty.current._fc._objects);
  });
  return (
    <div>
      <div className="app-canvas" key="canvas">
        {
          <SketchField
            width={`400px`}
            height={`300px`}
            tool={tool}
            lineWidth={7}
            color="black"
            ref={sketchProperty}
          />
        }
      </div>
      <div className="app-handlers" key="handlers">
        <button
          className=" app-handlers__tool"
          onClick={() => {
            setTool(Tools.Select);
            // console.log("selection");
          }}
        >
          Select
        </button>
        <button
          className="app-handlers__tool"
          onClick={() => {
            setTool(Tools.Rectangle);
          }}
        >
          Rectangle
        </button>
        <button
          className="app-handlers__tool"
          onClick={() => {
            setTool(Tools.Circle);
          }}
        >
          Circle
        </button>
      </div>
    </div>
  );
}

export default Canvas;
