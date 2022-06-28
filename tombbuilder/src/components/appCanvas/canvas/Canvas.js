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
    <>
      <CanvasSketchPad
        children={children}
        contentLoaderState={contentLoaderState}
        sketchRef={sketchRef}
        tool={tool}
        handleCanvasActions={handleCanvasActions}
        handleToolChange={handleToolChange}
        activeItemCoords={activeItemCoords}
        handleItemActions={handleItemActions}
        handleKeyDown={handleKeyDown}
      />
    </>
  );
}
export default Canvas;
