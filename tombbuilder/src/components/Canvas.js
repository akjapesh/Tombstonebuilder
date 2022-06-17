import React, { useEffect, useRef, useState, useCallback } from "react";
import SketchField from "../third-parts/react-sketch/src/SketchField";
import Tools from "../third-parts/react-sketch/src/tools";
import classnames from "classnames";

import { Button } from "baseui/button";
import { Input } from "baseui/input";
function Canvas({ children, updateAnnotationHandler, contentLoaderState }) {
  const [tool, setTool] = useState(Tools.Select);
  const [coordsActiveItem, setCordState] = useState({});
  const numberFixed = (num) => Number(Number(num).toFixed());
  const sketchProperty = useRef(null);
  const canvasAddedProp = useCallback((target) => {
    const newTarget = target;
    const hasCircle =
      newTarget &&
      (newTarget.type === "circle" ||
        (newTarget.type === "activeSelection" &&
          newTarget._objects.some((o) => o.type === "circle")));
    if (hasCircle) {
      newTarget.lockRotation = true;
      newTarget.angle = 0;
      newTarget.originY = "top";
    } else if (
      newTarget &&
      (newTarget.type === "rect" ||
        (newTarget.type === "activeSelection" &&
          newTarget._objects.some((o) => o.type === "rect")))
    ) {
      newTarget.lockRotation = true;
      newTarget.angle = 0;
    }
    return newTarget;
  }, []);
  const setCoords = useCallback(
    (target) => {
      const { type, width, height, left, top, radius, rx } = target;
      if (type === "circle") {
        return setCordState({ coordsActiveItem: { radius, left, top, type } });
      }
      return setCordState({
        coordsActiveItem: { width, height, left, top, boxRadius: rx, type },
      });
    },
    [setCordState]
  );

  useEffect(() => {
    sketchProperty.current._fc.on({
      "after:render": () => {
        updateAnnotationHandler([...sketchProperty.current._fc._objects]);
      },
      "selection:created": (item) => {
        setCoords(item.selected[0]);
        item.target = canvasAddedProp(item.target);
      },
      "selection:updated": (item) => {
        setCoords(item.selected[0]);
      },
      "selection:cleared": () => setCordState({ coordsActiveItem: {} }),
      "object:modified": (item) => {
        setCoords(item.target);
      },
      "object:added": (item) => (item.target = canvasAddedProp(item.target)),
      "object:moving": (item) => (item.target = canvasAddedProp(item.target)),
    });
  }, []);

  const removeItemFromKeyboard = useCallback(
    (event) => {
      const hasItemSelected =
        Object.keys(coordsActiveItem.coordsActiveItem).length > 0;

      if (hasItemSelected) {
        event.preventDefault();
        if (sketchProperty.current) {
          sketchProperty.current.removeSelected();
        }
      }
    },
    [coordsActiveItem]
  );

  const SideMovement = useCallback(
    (event) => {
      const hasItemSelected = coordsActiveItem.coordsActiveItem;
      if (hasItemSelected) {
        event.preventDefault();
        if (event.keyCode === 37 && coordsActiveItem.coordsActiveItem.left >= 4)
          //left
          moveItem("left", coordsActiveItem.coordsActiveItem.left - 4);
        else if (
          event.keyCode === 38 &&
          coordsActiveItem.coordsActiveItem.top >= 4
        )
          //up
          moveItem("top", coordsActiveItem.coordsActiveItem.top - 4);
        else if (event.keyCode === 39)
          //right
          moveItem("left", coordsActiveItem.coordsActiveItem.left + 4);
        else if (event.keyCode === 40)
          //down
          moveItem("top", coordsActiveItem.coordsActiveItem.top + 4);
      }
    },
    [coordsActiveItem]
  );
  const cloneItem = () => {
    if (sketchProperty.current) {
      sketchProperty.current.copy();
      sketchProperty.current.paste();
    }
  };

  const TabAnotherShape = useCallback(() => {
    let cnt = 0;
    sketchProperty.current._fc._objects.map((value) => {
      if (cnt) {
        setCoords(value);
        coordsActiveItem.focus();
        cnt = 0;
      }
      if (
        value.left === coordsActiveItem.coordsActiveItem.left &&
        value.top === coordsActiveItem.coordsActiveItem.top
      ) {
        cnt = 1;
      }
      return null;
    });
  }, [coordsActiveItem, setCoords]);

  const handleKeyDown = useCallback(
    (event) => {
      const DELETE = 8;
      const LEFT_SIDE = 37;
      const UPSIDE = 38;
      const RIGHT_SIDE = 39;
      const DOWNSIDE = 40;
      const TAB_KEY = 9;
      const COPY = 67;
      const UNDO = 90;

      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "z"
      ) {
        Redo();
      } else if ((event.metaKey || event.ctrlKey) && !event.shiftKey) {
        const actionsByKeyCode = {
          [DELETE]: removeItemFromKeyboard,
          [RIGHT_SIDE]: SideMovement,
          [LEFT_SIDE]: SideMovement,
          [UPSIDE]: SideMovement,
          [DOWNSIDE]: SideMovement,
          [TAB_KEY]: TabAnotherShape,
          [COPY]: cloneItem,
          [UNDO]: Undo,
        };
        actionsByKeyCode[event.keyCode]?.(event);
      }
    },
    [SideMovement, TabAnotherShape, removeItemFromKeyboard]
  );

  const Undo = () => {
    sketchProperty.current.undo();
  };

  const Redo = () => {
    sketchProperty.current.redo();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);
  const hasItemSelected =
    coordsActiveItem.coordsActiveItem &&
    Object.keys(coordsActiveItem.coordsActiveItem).length > 0;
  const moveItem = (key, value) => {
    const canvas = sketchProperty.current && sketchProperty.current._fc;
    if (canvas && canvas.getActiveObject()) {
      const selection = canvas.getActiveObject();
      if (key === "boxRadius") {
        selection.set("rx", value);
        selection.set("ry", value);
      } else {
        selection.set(key, value);
      }
      selection.setCoords();
      canvas.requestRenderAll();
      setCordState((prevState) => ({
        ...prevState,
        coordsActiveItem: { ...prevState.coordsActiveItem, [key]: value },
      }));
    }
  };
  //
  return (
    <>
      <div>
        <div className="app-canvas" key="canvas">
          {children}
          {
            <SketchField
              width={contentLoaderState.width}
              height={contentLoaderState.height}
              tool={tool}
              lineWidth={0}
              color="black"
              ref={sketchProperty}
            />
          }

          <div className="app-handlers" key="handlers">
            <Button
              className={classnames("app-handlers__tool", {
                "app-handlers__active": tool === "select",
              })}
              onClick={() => {
                setTool(Tools.Select);
              }}
            >
              Select
            </Button>
            <Button
              className={classnames("app-handlers__tool", {
                "app-handlers__active": tool === "rectangle",
              })}
              onClick={() => {
                setTool(Tools.Rectangle);
              }}
            >
              Rectangle
            </Button>
            <Button
              className={classnames("app-handlers__tool", {
                "app-handlers__active": tool === "circle",
              })}
              onClick={() => {
                setTool(Tools.Circle);
              }}
            >
              Circle
            </Button>
            <Button className="app-handlers__tool" onClick={Undo}>
              UNDO
            </Button>
            <Button className="app-handlers__tool" onClick={Redo}>
              REDO
            </Button>
          </div>
        </div>
      </div>
      {hasItemSelected && (
        <div className="app-editor_item-editor">
          <p className="app-config_caption">Size & position of active item</p>
          <div className="row">
            {/* <button disabled={!coordsActiveItem.coordsActiveItem} onClick={removeItemFromKeyboard}>DELETE</button> */}
            {hasItemSelected && (
              <span>
                <Button onClick={removeItemFromKeyboard}>Delete</Button>
                <Button onClick={cloneItem}>copy</Button>
              </span>
            )}
            {Object.keys(coordsActiveItem.coordsActiveItem)
              .filter((e) => e !== "type")
              .map((item) => {
                const value = numberFixed(
                  coordsActiveItem.coordsActiveItem[item]
                );
                const onChange = (e) => {
                  moveItem(item, numberFixed(e.target.value));
                };
                return (
                  <p className="app-config_inline" key={item}>
                    <label>{item}</label>
                    <Input type="number" onChange={onChange} value={value} />
                  </p>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
export default Canvas;