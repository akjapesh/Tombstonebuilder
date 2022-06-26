import { useCallback } from "react";
//utils
import { handleActions } from "../../utils/handleActions";
//hooks
import { useArrowKeysNavigation } from "./useSetKeyPressActions/useArrowKeysNavigation";
import Tools from "third-parts/react-sketch/src/tools";

import KEY_CODES from "../../utils/keyCodes";

export const useSetKeyEvents = ({
  activeItemCoords,
  sketchRef,
  contentLoaderState,
  handleToolChange,
  handleItemActions,
}) => {
  const { handleArrowKeysNavigation } = useArrowKeysNavigation(
    activeItemCoords,
    contentLoaderState,
    handleItemActions
  );

  const { handleCanvasActions } = handleActions(sketchRef);

  const handleKeyDown = useCallback(
    (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "z"
      ) {
        handleCanvasActions({ type: "Redo" });
      } else if ((event.metaKey || event.ctrlKey) && !event.shiftKey) {
        const actionsByKeyCode = {
          [KEY_CODES.CUT]: () => {
            handleCanvasActions({ type: "Cut" });
          },
          [KEY_CODES.COPY]: () => {
            handleCanvasActions({ type: "Copy" });
          },
          [KEY_CODES.PASTE]: () => {
            handleCanvasActions({ type: "Paste" });
          },
          [KEY_CODES.UNDO]: () => {
            handleCanvasActions({ type: "Undo" });
          },
        };
        actionsByKeyCode[event.keyCode]?.(event);
      } else {
        const handleSelect = () => {
          handleToolChange(Tools.Select);
        };
        const handleRectangle = () => {
          handleToolChange(Tools.Rectangle);
        };
        const handleCircle = () => {
          handleToolChange(Tools.Circle);
        };
        const actionsByKeyCode = {
          [KEY_CODES.DELETE]: (e) => {
            const action = { type: "Remove", payLoad: { event: e } };
            handleItemActions(action);
          },
          [KEY_CODES.RIGHT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.LEFT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.UPSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.DOWNSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.SELECT]: handleSelect,
          [KEY_CODES.RECTANGLE]: handleRectangle,
          [KEY_CODES.CIRCLE]: handleCircle,
        };
        actionsByKeyCode[event.keyCode]?.(event);
      }
    },
    [
      handleCanvasActions,
      handleItemActions,
      handleArrowKeysNavigation,
      handleToolChange,
    ]
  );
  return { handleKeyDown };
};
