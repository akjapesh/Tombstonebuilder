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
import ModalExample from "../modalExample/ModalExample"; 
import CanvasItemConfiguration from "../canvasItemConfiguration/CanvasItemConfiguration";


function CanvasButtons({
  tool,
  sketchRef,
  handleUndo,
  handleRedo,
  handleToolChange,
  handleRemoveItemFromKeyboard,
  handleCloneItem,
  activeItemCoords,
  handleMoveItem,
  handleKeyDown,
}) {


  const isItemSelected =
    activeItemCoords && Object.keys(activeItemCoords).length > 0;
    
  return (
    <div className="app-handlers button-group align-center" key="handlers">
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
      {isItemSelected && (
          <ModalExample>
          <CanvasItemConfiguration
          handleRemoveItemFromKeyboard={handleRemoveItemFromKeyboard}
          handleCloneItem={handleCloneItem}
          activeItemCoords={activeItemCoords}
          handleMoveItem={handleMoveItem}
          handleKeyDown={handleKeyDown}
          />
          </ModalExample>)
      }
    </div>
  );
}

export default CanvasButtons;