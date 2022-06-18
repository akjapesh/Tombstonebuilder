import { useEffect } from "react";
export const useSetupCanvas = (
  sketchRef,
  updateAnnotationHandler,
  setCoords,
  handleAddItemInCanvas,
  resetActiveItemhandler,
  handleKeyDown
) => {
  useEffect(() => {
    sketchRef.current._fc.on({
      "after:render": () => {
        updateAnnotationHandler([...sketchRef.current._fc._objects]);
      },
      "selection:created": (item) => {
        setCoords(item.selected[0]);
        item.target = handleAddItemInCanvas(item.target);
      },
      "selection:updated": (item) => {
        setCoords(item.selected[0]);
      },
      "selection:cleared": () => {
        resetActiveItemhandler();
      },
      "object:modified": (item) => {
        setCoords(item.target);
      },
      "object:added": (item) =>
        (item.target = handleAddItemInCanvas(item.target)),
      "object:moving": (item) =>
        (item.target = handleAddItemInCanvas(item.target)),
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);
};
