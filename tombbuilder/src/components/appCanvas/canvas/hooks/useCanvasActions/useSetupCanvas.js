import { useEffect } from "react";
import tools from "third-parts/react-sketch/src/tools";
import { centerAlign } from "../../utils/centerAlign";

export const useSetupCanvas = ({
  sketchRef,
  updateAnnotationHandler,
  setCoords,
  handleAddItemInCanvas,
  handleResetActiveItem,
  handleKeyDown,
  handleToolChange,
}) => {
  const { clearCenterAlignLines, connectCenterAlignLine } =
    centerAlign(sketchRef);

  useEffect(() => {
    sketchRef.current._fc.on({
      "mouse:up": () => {
        handleToolChange(tools.Select);
      },
      "after:render": () => {
        updateAnnotationHandler([...sketchRef.current._fc.toJSON().objects]);
      },
      "selection:created": (item) => {
        // console.log("item: ",item);
        setCoords(item.selected[0]);
        item.target = handleAddItemInCanvas(item.target);
      },
      "selection:updated": (item) => {
        // console.log("item: ",item);
        setCoords(item.selected[0]);
      },
      "selection:cleared": () => {
        handleResetActiveItem();
        clearCenterAlignLines();
      },
      "object:modified": (item) => {
        setCoords(item.target);
      },
      "object:added": (item) =>
        (item.target = handleAddItemInCanvas(item.target)),
      "object:moving": (item) => {
        item.target = handleAddItemInCanvas(item.target);
        connectCenterAlignLine(item.target);
      },
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);
};
