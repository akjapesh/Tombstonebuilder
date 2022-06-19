// Libraries
import React, { useEffect, useRef } from "react";

//utils
import { handleActions } from "./utils/handleActions";

//hooks
import { useActiveItem } from "./hooks/useCanvasActions/useActiveItem";
import { useItemActions } from "./hooks/useCanvasActions/useItemActions";
import { useSetupCanvas } from "./hooks/useCanvasActions/useSetupCanvas";
import { useSetKeyEvents } from "./hooks/useSetKeyEvents/useSetKeyEvents";
import { useToolState } from "./hooks/useToolState/useToolState";

//components
import CanvasSketchField from "./CanvasSketchField/CanvasSketchField";
import CanvasItemConfiguration from "./canvasItemConfiguration/CanvasItemConfiguration";
import CanvasButtons from "./canvasButtons/CanvasButtons";

function Canvas({
  children,
  updateAnnotationHandler,
  contentLoaderState,
  handleUpdateSketchRef,
}) {
  const { tool, handleToolChange } = useToolState();
  const sketchRef = useRef(null);
  useEffect(() => {
    handleUpdateSketchRef(sketchRef);
  }, [sketchRef, handleUpdateSketchRef]);
  const {
    setCoords,
    activeItemCoords,
    handleResetActiveItem,
    handleMoveActiveItem,
  } = useActiveItem();

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
    handleKeyDown
  );

  const isItemSelected =
    activeItemCoords.activeItemCoords &&
    Object.keys(activeItemCoords.activeItemCoords).length > 0;

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
