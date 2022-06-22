import { useCallback } from "react";

export const useItemActions = (
  sketchRef,
  handleMoveActiveItem,
  activeItemCoords
) => {
  const handleMoveItem = (key, value) => {
    const canvas = sketchRef.current && sketchRef.current._fc;

    if (canvas && canvas.getActiveObject()) {
      const selection = canvas.getActiveObject();
      selection.set(key, value);
      selection.setCoords();
      canvas.requestRenderAll();
      handleMoveActiveItem(key, value);
    }
  };

  const handleRemoveItemFromKeyboard = useCallback(
    (event) => {
      const isItemSelected = Object.keys(activeItemCoords).length > 0;

      if (isItemSelected) {
        event.preventDefault();
        if (sketchRef.current) {
          sketchRef.current.removeSelected();
        }
      }
    },
    [activeItemCoords, sketchRef]
  );

  const handleAddItemInCanvas = useCallback((target) => {
    const newTarget = target;
    const hasCircle =
      newTarget &&
      (newTarget.type === "circle" ||
        (newTarget.type === "activeSelection" &&
          newTarget._objects.some((o) => o.type === "circle")));
    const hasRect =
      newTarget &&
      (newTarget.type === "rect" ||
        (newTarget.type === "activeSelection" &&
          newTarget._objects.some((o) => o.type === "rect")));
    if (hasCircle || hasRect) {
      newTarget.lockRotation = true;
      newTarget.angle = 0;
      newTarget.originY = "top";
    newTarget.lockUniScaling = true;
    }
    return newTarget;
  }, []);

  return {
    handleMoveItem,
    handleRemoveItemFromKeyboard,
    handleAddItemInCanvas,
  };
};