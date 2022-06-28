/* eslint-disable react/no-direct-mutation-state */
// libraries
import React from "react";
import classnames from "classnames";

// utils
import Tools from "third-parts/react-sketch/src/tools";

// Component
import selectIcon from "assets/select.svg";
import rectIcon from "assets/rect.svg";
import circleIcon from "assets/circle.svg";
import ModalExample from "../../modalExample/ModalExample";
import CanvasItemConfiguration from "../../canvasItemConfiguration/CanvasItemConfiguration";
import trashIcon from "assets/trash.svg";
import cloneIcon from "assets/clone.svg";

function CanvasButtons({
  tool,
  handleToolChange,
  handleCanvasActions,
  activeItemCoords,
  handleKeyDown,
  handleItemActions,
}) {
  const isItemSelected =
    activeItemCoords && Object.keys(activeItemCoords).length > 0;

  return (
    <div className="app-handlers button-group align-center" key="handlers">
      <button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "select",
        })}
        onClick={() => {
          handleToolChange(Tools.Select);
        }}
      >
        <img src={selectIcon} alt="select tool" 
            title = "click 1 for selection"/>
      </button>
      <button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "rectangle",
        })}
        onClick={() => {
          handleToolChange(Tools.Rectangle);
        }}
      >
        <img src={rectIcon} alt="rect tool" 
            title = "click 2 to draw rectangle"/>
      </button>
      <button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "circle",
        })}
        onClick={() => {
          handleToolChange(Tools.Circle);
        }}
      >
        <img src={circleIcon} alt="circle tool" 
            title = "Click 3 to draw cirle"/>
      </button>

      {isItemSelected && (
        <>
          <button
            className="app-handlers__tool"
            onClick={(e) => {
              handleItemActions({ type: "Remove", payLoad: { event: e } });
            }}
            title = "click delete for deletion"
          >
            <img src={trashIcon} alt="remove item" />
          </button>
          <button
            className="app-handlers__tool"
            onClick={() => {
              handleCanvasActions({ type: "Clone" });
            }}
            title = "click to clone"
          >
            <img src={cloneIcon} alt="clone tool" />
          </button>
          <ModalExample>
            <CanvasItemConfiguration
              activeItemCoords={activeItemCoords}
              handleItemActions={handleItemActions}
              handleKeyDown={handleKeyDown}
            />
          </ModalExample>
        </>
      )}
    </div>
  );
}

export default CanvasButtons;
