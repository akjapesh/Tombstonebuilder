// Libraries
import React, { useRef, useEffect, useCallback } from "react";

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
import { ACTION_TYPES } from "hooks/useCanvasSketch";

function Canvas({
  children,
  updateAnnotationHandler,
  contentLoaderState,
  handleUpdateSketchRef,
  onCanvasAction,
}) {
  const { tool, handleToolChange } = useToolState();

  const sketchRef = useRef(null);
  const initialiseSketchRef = useCallback((ref) => {
    sketchRef.current = ref;

    onCanvasAction({
      type: ACTION_TYPES.INITIALISE_SKETCH_REF,
      payload: { sketchRef: ref },
    });
  }, []);

  const { handleActiveItemActions, activeItemCoords } = useActiveItem();

  const { handleItemActions } = useItemActions({
    sketchRef,
    handleActiveItemActions,
    activeItemCoords,
  });

  const { handleCanvasActions } = handleActions(sketchRef);

  const { handleKeyDown } = useSetKeyEvents({
    activeItemCoords,
    sketchRef,
    contentLoaderState,
    handleToolChange,
    handleItemActions,
  });

  useSetupCanvas({
    sketchRef,
    updateAnnotationHandler,
    handleActiveItemActions,
    handleItemActions,
    handleKeyDown,
    handleToolChange,
  });

  return (
    <div
      // A little bit hacky
      onMouseLeave={() => {
        document.removeEventListener("keydown", handleKeyDown, false);
      }}
      // A little bit hacky
      onMouseEnter={() => {
        document.addEventListener("keydown", handleKeyDown, false);
      }}
    >
      <CanvasSketchPad
        children={children}
        contentLoaderState={contentLoaderState}
        sketchRef={initialiseSketchRef}
        tool={tool}
        handleCanvasActions={handleCanvasActions}
        handleToolChange={handleToolChange}
        activeItemCoords={activeItemCoords}
        handleItemActions={handleItemActions}
        handleKeyDown={handleKeyDown}
        // Remove this
        onMouseEnter={() => {}}
      />
    </div>
  );
}
export default Canvas;
