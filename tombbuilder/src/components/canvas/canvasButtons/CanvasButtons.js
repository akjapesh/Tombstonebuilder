/* eslint-disable react/no-direct-mutation-state */
// libraries
import React from "react";
import classnames from "classnames";
// utils
import Tools from "../../../third-parts/react-sketch/src/tools";
// Component
import { Button } from "baseui/button";

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
        disabled={true}
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
