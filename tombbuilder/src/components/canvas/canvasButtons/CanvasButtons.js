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
        <img src={selectIcon} alt="select tool" />
      </button>
      <button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "rectangle",
        })}
        onClick={() => {
          handleToolChange(Tools.Rectangle);
        }}
      >
        <img src={rectIcon} alt="rect tool" />
      </button>
      <button
        className={classnames("app-handlers__tool", {
          "app-handlers__active": tool === "circle",
        })}
        onClick={() => {
          handleToolChange(Tools.Circle);
        }}
      >
        <img src={circleIcon} alt="circle tool" />
      </button>

      {isItemSelected && (
        <>
          <button
            className="app-handlers__tool app-handler__trash"
            onClick={handleRemoveItemFromKeyboard}
          >
            <img src={trashIcon} alt="remove item" />
          </button>
          <button className="app-handler__clone" onClick={handleCloneItem}>
            <img src={cloneIcon} alt="clone tool" />
          </button>
          <ModalExample>
            <CanvasItemConfiguration
              activeItemCoords={activeItemCoords}
              handleMoveItem={handleMoveItem}
              handleKeyDown={handleKeyDown}
            />
          </ModalExample>
        </>
      )}
    </div>
  );
}

export default CanvasButtons;
