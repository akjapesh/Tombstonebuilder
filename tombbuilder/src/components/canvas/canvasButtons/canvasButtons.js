import { Button } from "baseui/button";
import classnames from "classnames";
import React from "react";
import Tools from "../../../third-parts/react-sketch/src/tools";

function CanvasButtons({
  tool,
  sketchRef,
  handleUndo,
  handleRedo,
  handleToolChange,
}) {
  return (
    <div className="app-handlers" key="handlers">
      <Button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "select",
        })}
        onClick={() => {
          handleToolChange(Tools.Select);
        }}
      >
        Select
      </Button>
      <Button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "rectangle",
        })}
        onClick={() => {
          handleToolChange(Tools.Rectangle);
        }}
      >
        Rectangle
      </Button>
      <Button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "circle",
        })}
        onClick={() => {
          handleToolChange(Tools.Circle);
        }}
      >
        Circle
      </Button>
      <Button
        className="app-handlers__tool"
        onClick={() => {
          console.log(sketchRef.current);
          handleUndo();
        }}
      >
        UNDO
      </Button>
      <Button className="app-handlers__tool" onClick={handleRedo}>
        REDO
      </Button>
    </div>
  );
}

export default CanvasButtons;