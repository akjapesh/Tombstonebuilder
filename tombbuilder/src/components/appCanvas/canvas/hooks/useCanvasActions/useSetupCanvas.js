import { useEffect } from "react";
import tools from "third-parts/react-sketch/src/tools";
import { centerAlign } from "../../utils/centerAlign";

export const useSetupCanvas = ({
  sketchRef,
  updateAnnotationHandler,
  setCoords,
  handleResetActiveItem,
  handleItemActions,
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
        setCoords(item.selected[0]);
        item.target = handleItemActions({
          type: "Add",
          payLoad: { target: item.target },
        });
      },

      "selection:updated": (item) => {
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
        (item.target = handleItemActions({
          type: "Add",
          payLoad: { target: item.target },
        })),

      "object:moving": (item) => {
        item.target = handleItemActions({
          type: "Add",
          payLoad: { target: item.target },
        });
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
