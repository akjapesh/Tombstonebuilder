import { useEffect } from "react";
import tools from "../../../../third-parts/react-sketch/src/tools";
import {centerAllign} from "../../utils/centerAllign";

export const useSetupCanvas = (
  sketchRef,
  updateAnnotationHandler,
  setCoords,
  handleAddItemInCanvas,
  resetActiveItemhandler,
  handleKeyDown,
  handleToolChange
) => {
  const {clearCenterAllignLines,connectCenterAllignLine}=centerAllign(sketchRef);

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
        resetActiveItemhandler();
        clearCenterAllignLines();
      },
      "object:modified": (item) => {
        setCoords(item.target);
      },
      "object:added": (item) =>
        (item.target = handleAddItemInCanvas(item.target)),
      "object:moving": (item) =>{
        (item.target = handleAddItemInCanvas(item.target));
        connectCenterAllignLine(item.target);
        
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
