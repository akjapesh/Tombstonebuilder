/* eslint-disable react/no-direct-mutation-state */
// libraries
import React from "react";
import classnames from "classnames";
// utils
import Tools from "../../../third-parts/react-sketch/src/tools";
// Component
import { Button } from "baseui/button";
import selectIcon from "../../../assets/select.svg";
import rectIcon from "../../../assets/rect.svg";
import circleIcon from "../../../assets/circle.svg";
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
        <img src={selectIcon} alt="select tool" />
      </Button>
      <Button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "rectangle",
        })}
        onClick={() => {
          handleToolChange(Tools.Rectangle);
        }}
      >
        <img src={rectIcon} alt="rect tool" />
      </Button>
      <Button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "circle",
        })}
        onClick={() => {
          handleToolChange(Tools.Circle);
        }}
      >
        <img src={circleIcon} alt="circle tool" />
      </Button>
      
    </div>
  );
}

export default CanvasButtons;