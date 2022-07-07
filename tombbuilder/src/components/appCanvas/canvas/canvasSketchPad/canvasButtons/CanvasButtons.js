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
import { Button, SHAPE, KIND } from "baseui/button";
import { ThemeProvider, DarkTheme, LightTheme } from "baseui";

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
    <ThemeProvider theme={DarkTheme}>
      <div className="app-handlers button-group align-center" key="handlers">
        <Button
          shape={SHAPE.square}
          className={classnames("app-handlers__tool", {
            "app-handlers__active": tool === "select",
          })}
          onClick={() => {
            handleToolChange(Tools.Select);
          }}
        >
          <img
            src={selectIcon}
            alt="select tool"
            title="click 1 for selection"
          />
        </Button>
        <Button
          shape={SHAPE.square}
          className={classnames("app-handlers__tool", {
            "app-handlers__active": tool === "rectangle",
          })}
          onClick={() => {
            handleToolChange(Tools.Rectangle);
          }}
        >
          <img
            src={rectIcon}
            alt="rect tool"
            title="click 2 to draw rectangle"
          />
        </Button>
        <Button
          shape={SHAPE.square}
          className={classnames("app-handlers__tool", {
            "app-handlers__active": tool === "circle",
          })}
          onClick={() => {
            handleToolChange(Tools.Circle);
          }}
        >
          <img
            src={circleIcon}
            alt="circle tool"
            title="Click 3 to draw cirle"
          />
        </Button>

        {isItemSelected && (
          <>
            <Button
              kind={KIND.primary}
              shape={SHAPE.square}
              className="app-handlers__tool"
              onClick={(e) => {
                handleItemActions({ type: "Remove", payLoad: { event: e } });
              }}
              title="click delete for deletion"
            >
              <img src={trashIcon} alt="remove item" />
            </Button>
            <Button
              shape={SHAPE.square}
              className="app-handlers__tool"
              onClick={() => {
                handleCanvasActions({ type: "Clone" });
              }}
              title="click to clone"
            >
              <img src={cloneIcon} alt="clone tool" />
            </Button>
            <ThemeProvider theme={LightTheme}>
              <ModalExample>
                <CanvasItemConfiguration
                  activeItemCoords={activeItemCoords}
                  handleItemActions={handleItemActions}
                  handleKeyDown={handleKeyDown}
                />
              </ModalExample>
            </ThemeProvider>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default CanvasButtons;
