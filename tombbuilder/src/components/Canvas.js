import React, { useEffect, useRef, useState, useCallback } from "react";
import classnames from "classnames";
import { Button } from "baseui/button";
import { Input } from "baseui/input";
import SketchField from "../third-parts/react-sketch/src/SketchField";
import Tools from "../third-parts/react-sketch/src/tools";

function Canvas({ children, updateAnnotationHandler, contentLoaderState }) {
  const [tool, setTool] = useState(Tools.Select);
  const DEFAULT_COORDS = {};
  const [activeItemCoords, setActiveItemCoords] = useState(DEFAULT_COORDS);
  const sketchRef = useRef(null);


  const numberFixed = (num) => Number(Number(num).toFixed());

  const handleAddItemInCanvas = useCallback((target) => {
    const newTarget = target;
    const hasCircle = newTarget && (newTarget.type === "circle" || (newTarget.type === "activeSelection" && newTarget._objects.some((o) => o.type === "circle")));
    const hasRect = newTarget && (newTarget.type === "rect" || (newTarget.type === "activeSelection" && newTarget._objects.some((o) => o.type === "rect")));
    if (hasCircle || hasRect) {
      newTarget.lockRotation = true;
      newTarget.angle = 0;
      newTarget.originY = "top";
    } 
    return newTarget;
  }, []);

  const setCoords = useCallback(
    (target) => {
      const { type, width, height, left, top, radius, rx, ry } = target;
      if (type === "circle") {
        return setActiveItemCoords({radius, left, top, type});
      }
      return setActiveItemCoords({width, height, left, top, rx , ry, type});
    },
    [setActiveItemCoords]
  );

  useEffect(() => {
    sketchRef.current._fc.on({
      "after:render": () => {
        updateAnnotationHandler([...sketchRef.current._fc._objects]);
      },
      "selection:created": (item) => {
        console.log("iteeeem: ",item.selected[0]);
        setCoords(item.selected[0]);
        item.target = handleAddItemInCanvas(item.target);
      },
      "selection:updated": (item) => {
        setCoords(item.selected[0]);
      },
      "selection:cleared": () => setActiveItemCoords({}),        
      "object:modified": (item) => {
        setCoords(item.target);
      },
      "object:added": (item) => (item.target = handleAddItemInCanvas(item.target)),
      "object:moving": (item) => (item.target = handleAddItemInCanvas(item.target)),
    });
  },[]);

  const removeItemFromKeyboard = useCallback(
    (event) => {
      const isItemSelected =
        Object.keys(activeItemCoords).length > 0;

      if (isItemSelected) {
        event.preventDefault();
        if (sketchRef.current) {
          sketchRef.current.removeSelected();
        }
      }
    },
    [activeItemCoords]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const moveItem = useCallback((key, value) => {
    const canvas = sketchRef.current && sketchRef.current._fc;
    if (canvas && canvas.getActiveObject()) {
      const selection = canvas.getActiveObject();
        selection.set(key, value);
      selection.setCoords();
      canvas.requestRenderAll();
      setActiveItemCoords({...activeItemCoords,[key]:value});
    }
  });
  const handleArrowKeysNavigation = useCallback(
    (event) => {
      const isItemSelected = activeItemCoords;
      const shiftingByOffset = 4;
      const rightSideBoundary = contentLoaderState.width - activeItemCoords.width;
      const bottoomSideBoundary = contentLoaderState.height - activeItemCoords.height;
      if (isItemSelected) {
        event.preventDefault();
        if (event.keyCode === 37)
          moveItem("left", Math.max(0,activeItemCoords.left - shiftingByOffset));
        else if (event.keyCode === 38) 
          moveItem("top", Math.max(0,activeItemCoords.top - shiftingByOffset));
        else if (event.keyCode === 39)
          moveItem("left", Math.min(rightSideBoundary,activeItemCoords.left + shiftingByOffset));
        else if (event.keyCode === 40)
          moveItem("top", Math.min(bottoomSideBoundary,activeItemCoords.top + shiftingByOffset));
      }
    },
    [activeItemCoords, contentLoaderState.height, contentLoaderState.width, moveItem]
  );

  const cloneItem = () => {
    if (sketchRef.current) {
      sketchRef.current.copy();
      sketchRef.current.paste();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleTabKeyPress =() => {
    let cnt = 0;
    sketchRef.current._fc._objects.map((value) => {
      if (cnt) {
        setCoords(value);
        cnt = 0;
      }
      else if (
        value.left === activeItemCoords.left &&
        value.top === activeItemCoords.top
      ) {
        cnt = 1;
      }
      return null;
    });
  };

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
      const PASTE = 86;
      const CUT = 88;

      if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === "z") {
        handleRedo();
      }
      else if ((event.metaKey || event.ctrlKey) && !event.shiftKey) {
        const actionsByKeyCode = {
          [DELETE]: removeItemFromKeyboard,
          [RIGHT_SIDE]: handleArrowKeysNavigation,
          [LEFT_SIDE]: handleArrowKeysNavigation,
          [UPSIDE]: handleArrowKeysNavigation,
          [DOWNSIDE]: handleArrowKeysNavigation,
          [TAB_KEY]: handleTabKeyPress,
          [CUT] : handleCut,
          [COPY]: handleCopy,
          [PASTE] : handlePaste,
          [UNDO]: handleUndo,
        };
        actionsByKeyCode[event.keyCode]?.(event);
      }
    },
    [handleArrowKeysNavigation, handleTabKeyPress, removeItemFromKeyboard]
  );

  const handleUndo = () => {
    sketchRef.current.undo();
  };

  const handleRedo = () => {
    sketchRef.current.redo();
  };

  const handleCut = () =>{
    if (sketchRef.current) 
      sketchRef.current.copy();
    sketchRef.current.removeSelected();
}

  const handleCopy = () =>{
      if (sketchRef.current) 
        sketchRef.current.copy();
  }

  const handlePaste = () =>{
    if (sketchRef.current) 
      sketchRef.current.paste();
}

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);
  
  const isItemSelected = activeItemCoords && Object.keys(activeItemCoords).length > 0;
  
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
              ref={sketchRef}
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
            <Button className="app-handlers__tool" onClick={handleUndo}>
              UNDO
            </Button>
            <Button className="app-handlers__tool" onClick={handleRedo}>
              REDO
            </Button>
          </div>
        </div>
      </div>
      {isItemSelected && (
        <div className="app-editor_item-editor">
          <p className="app-config_caption">Size & position of active item</p>
          <div className="row">
            {isItemSelected && (
              <span>
                <Button onClick={removeItemFromKeyboard}>Delete</Button>
                <Button onClick={cloneItem}>copy</Button>
                <Button onClick={()=>{console.log(activeItemCoords)}}>INFO</Button>
              </span>
            )}
            {Object.keys(activeItemCoords)                                 
              .filter((e) => e !== "type")
              .map((item) => {
                const value = numberFixed(
                  activeItemCoords[item]                   
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