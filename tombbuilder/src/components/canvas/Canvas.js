// Libraries
import React, { useRef } from "react";

//utils
import { handleActions } from "./utils/handleActions";

//hooks
import { useActiveItem } from "./hooks/useCanvasActions/useActiveItem";
import { useItemActions } from "./hooks/useCanvasActions/useItemActions";
import { useSetupCanvas } from "./hooks/useCanvasActions/useSetupCanvas";
import { useSetKeyEvents } from "./hooks/useSetKeyEvents/useSetKeyEevnts";
import { useToolState } from "./hooks/useToolState/useToolState";

//components
import CanvasItemConfiguration from "./canvasItemConfiguration/CanvasItemConfiguration";
import CanvasSketchPad from "./canvasSketchPad/CanvasSketchPad";

function Canvas({
  children,
  updateAnnotationHandler,
  contentLoaderState,
  handleUpdateSketchRef,
}) {
  const { tool, handleToolChange } = useToolState();

  const {
    setCoords,
    activeItemCoords,
    handleResetActiveItem,
    handleMoveActiveItem,
  } = useActiveItem();

  const sketchRef = useRef(null);

  const {
    handleMoveItem,
    handleRemoveItemFromKeyboard,
    handleAddItemInCanvas,
  } = useItemActions(sketchRef, handleMoveActiveItem, activeItemCoords);

  const { handleRedo, handleUndo, handleCloneItem } = handleActions(sketchRef);

  const { handleKeyDown } = useSetKeyEvents(
    activeItemCoords,
    setCoords,
    sketchRef,
    contentLoaderState,
    handleMoveActiveItem,
    handleRemoveItemFromKeyboard,
    handleMoveItem
  );

  useSetupCanvas(
    sketchRef,
    updateAnnotationHandler,
    setCoords,
    handleAddItemInCanvas,
    handleResetActiveItem,
    handleKeyDown,
    handleToolChange
  );

  const isItemSelected =
    activeItemCoords && Object.keys(activeItemCoords).length > 0;

  return (
    <>
      <div>
        <div className="app-canvas" key="canvas">
          {children}

          <CanvasSketchField
            contentLoaderState={contentLoaderState}
            tool={tool}
            sketchRef={sketchRef}
          />
          <CanvasButtons
            tool={tool}
            sketchRef={sketchRef}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleToolChange={handleToolChange}
          />
        </div>
      </div>
      {isItemSelected && (
        <CanvasItemConfiguration
          handleRemoveItemFromKeyboard={handleRemoveItemFromKeyboard}
          handleCloneItem={handleCloneItem}
          activeItemCoords={activeItemCoords}
          handleMoveItem={handleMoveItem}
        />
      )}
    </>
  );
}
export default Canvas;