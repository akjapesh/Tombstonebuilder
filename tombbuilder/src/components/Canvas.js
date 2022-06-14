import React, { useEffect, useRef, useState } from "react";
import SketchField from "../_third-parts/react-sketch/src/SketchField";
import Tools from "../_third-parts/react-sketch/src/tools";
function Canvas() {
  const [tool, setTool] = useState(Tools.Select);
  const [coordsActiveItem, setCordState] = useState({});
  const sketchProperty = useRef(null);
  const canvasAddedProp = (target) => {
    const newTarget = target;
    const hasCircle =
      newTarget &&
      (newTarget.type === "circle" ||
        (newTarget.type === "activeSelection" &&
          newTarget._objects.some((o) => o.type === "circle")));
    if (hasCircle) {
      newTarget.lockUniScaling = true;
      newTarget.lockRotation = true;
      newTarget.angle = 0;
      newTarget.originY = "top";
    }

    return newTarget;
  };
  const setCoords = ({ target }) => {
    const { type, width, height, left, top, radius, rx } = target;

    if (type === "circle") {
      return setCordState({ coordsActiveItem: { radius, left, top, type } });
    }

    return setCordState({
      coordsActiveItem: { width, height, left, top, boxRadius: rx, type }
    });
  };
  useEffect(() => {
    sketchProperty.current._fc.on({
      "selection:created": (item) => {
        setCoords(item);
        item.target = canvasAddedProp(item.target);
      },
      "selection:updated": setCoords,
      "selection:cleared": () => setCordState({ coordsActiveItem: {} }),
      "object:moving": (item) => (item.target = canvasAddedProp(item.target)),
      "object:added": (item) => (item.target = canvasAddedProp(item.target))
    });
  }, []);
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
