import { useEffect } from "react";
import tools from "third-parts/react-sketch/src/tools";
import { shiftValueByOffset } from "utils/shiftValueByOffset";
import {
  clearCenterAlignLines,
  connectCenterAlignLine,
} from "../../utils/centerAlign";

export const useSetupCanvas = ({
  sketchRef,
  updateAnnotationHandler,
  handleActiveItemActions,
  handleItemActions,
  handleKeyDown,
  handleToolChange,
}) => {
  useEffect(() => {
    sketchRef.current._fc.on({
      "mouse:up": () => {
        handleToolChange(tools.Select);
      },

      "after:render": () => {
        updateAnnotationHandler([...sketchRef.current._fc.toJSON().objects]);
      },

      "selection:created": (item) => {
        handleActiveItemActions({
          type: "SetCoords",
          payLoad: { target: item.selected[0] },
        });
        item.target = handleItemActions({
          type: "Add",
          payLoad: { target: item.target },
        });
      },

      "selection:updated": (item) => {
        handleActiveItemActions({
          type: "SetCoords",
          payLoad: { target: item.selected[0] },
        });
        clearCenterAlignLines(sketchRef);
        updateAnnotationHandler([...sketchRef.current._fc.toJSON().objects]);
      },

      "selection:cleared": () => {
        handleActiveItemActions({ type: "Reset" });
        clearCenterAlignLines(sketchRef);
        updateAnnotationHandler([...sketchRef.current._fc.toJSON().objects]);
      },

      "object:modified": (item) => {
        handleActiveItemActions({
          type: "SetCoords",
          payLoad: { target: item.target },
        });
        return item;
      },

      "object:added": (item) => {
        return (item.target = handleItemActions({
          type: "Add",
          payLoad: { target: item.target },
        }));
      },
      "object:moving": (item) => {
        item.target = handleItemActions({
          type: "Add",
          payLoad: { target: item.target },
        });
        connectCenterAlignLine(sketchRef, item.target);
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
