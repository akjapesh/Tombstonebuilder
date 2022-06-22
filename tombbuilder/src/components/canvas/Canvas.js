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
  console.log(sketchRef.current);
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
        handleRemoveItemFromKeyboard={handleRemoveItemFromKeyboard}
        handleCloneItem={handleCloneItem}
        activeItemCoords={activeItemCoords}
        handleMoveItem={handleMoveItem}
        handleKeyDown={handleKeyDown}
      />
    </>
  );
}
export default Canvas;
