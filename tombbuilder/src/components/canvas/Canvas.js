// Libraries
import React, { useRef, useEffect } from "react";

//utils
import { handleActions } from "./utils/handleActions";

//hooks
import { useActiveItem } from "./hooks/useCanvasActions/useActiveItem";
import { useItemActions } from "./hooks/useCanvasActions/useItemActions";
import { useSetupCanvas } from "./hooks/useCanvasActions/useSetupCanvas";
import { useSetKeyEvents } from "./hooks/useSetKeyEvents/useSetKeyEvents";
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
    handleRemoveItemFromKeyboard,
    handleMoveItem,
    handleToolChange
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
      <CanvasSketchPad
        children={children}
        contentLoaderState={contentLoaderState}
        sketchRef={sketchRef}
        tool={tool}
        handleRedo={handleRedo}
        handleUndo={handleUndo}
        handleToolChange={handleToolChange}
      />

      {isItemSelected && (
        <CanvasItemConfiguration
          handleRemoveItemFromKeyboard={handleRemoveItemFromKeyboard}
          handleCloneItem={handleCloneItem}
          activeItemCoords={activeItemCoords}
          handleMoveItem={handleMoveItem}
          handleKeyDown={handleKeyDown}
        />
      )}
    </>
  );
}
export default Canvas;