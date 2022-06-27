/* eslint-disable react/no-direct-mutation-state */
// libraries
import React from "react";
import classnames from "classnames";

// utils
import Tools from "../../../third-parts/react-sketch/src/tools";

// Component
import selectIcon from "../../../assets/select.svg";
import rectIcon from "../../../assets/rect.svg";
import circleIcon from "../../../assets/circle.svg";
import ModalExample from "../modalExample/ModalExample";
import CanvasItemConfiguration from "../canvasItemConfiguration/CanvasItemConfiguration";
import trashIcon from "../../../assets/trash.svg";
import cloneIcon from "../../../assets/clone.svg";

function CanvasButtons({
  tool,
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
      <button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "select",
        })}
        disabled={true}
      >
        <img src={selectIcon} alt="select tool" 
        title = "Press 1 for selection"/>
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
        title = "Press 2 for rectangle"/>
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
        title = "Press 3 for circle"/>
      </button>

      {isItemSelected && (
      <>
        <button
          className="app-handlers__tool"
          onClick={handleRemoveItemFromKeyboard}>
          <img src={trashIcon} alt="remove item" 
          title = "Press delete button for deleting"/>
        </button>
        <button className="app-handlers__tool" onClick={handleCloneItem}>
          <img src={cloneIcon} alt="clone tool" 
        title = "Clone button" />
        </button>
        <ModalExample>
          <CanvasItemConfiguration
            activeItemCoords={activeItemCoords}
            handleMoveItem={handleMoveItem}
            handleKeyDown={handleKeyDown}
          />
        </ModalExample>
      </>
      )
      }
    </div>
  );
}

export default CanvasButtons;
