import { useCallback } from "react";
//utils
import { handleActions } from "../../utils/handleActions";
//hooks
import { useArrowKeysNavigation } from "./useSetKeyPressActions/useArrowKeysNavigation";
import { useTabKeyEvent } from "./useSetKeyPressActions/useTabKeyEvent";

import KEY_CODES from "../../utils/keyCodes";

export const useSetKeyEvents = (
  activeItemCoords,
  setCoords,
  sketchRef,
  contentLoaderState,
  handleRemoveItemFromKeyboard,
  handleMoveItem
) => {
  const { handleTabKeyPress } = useTabKeyEvent(
    sketchRef,
    setCoords,
    activeItemCoords
  );

  const { handleArrowKeysNavigation } = useArrowKeysNavigation(
    activeItemCoords,
    contentLoaderState,
    handleMoveItem
  );

  const {
    handleRedo,
    handleUndo,
    handleCutItem,
    handleCopyItem,
    handlePasteItem,
  } = handleActions(sketchRef);

  const handleKeyDown = useCallback(
    (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "z"
      ) {
        handleRedo();
      } else if ((event.metaKey || event.ctrlKey) && !event.shiftKey) {
        const actionsByKeyCode = {
          [KEY_CODES.CUT]: handleCutItem,
          [KEY_CODES.COPY]: handleCopyItem,
          [KEY_CODES.PASTE]: handlePasteItem,
          [KEY_CODES.UNDO]: handleUndo,
        };
        actionsByKeyCode[event.keyCode]?.(event);
      } else {
        const actionsByKeyCode = {
          [KEY_CODES.DELETE]: handleRemoveItemFromKeyboard,
          [KEY_CODES.RIGHT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.LEFT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.UPSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.DOWNSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.TAB_KEY]: handleTabKeyPress,
        };
        actionsByKeyCode[event.keyCode]?.(event);
      }
    },
    [
      handleRedo,
      handleRemoveItemFromKeyboard,
      handleArrowKeysNavigation,
      handleTabKeyPress,
      handleCutItem,
      handleCopyItem,
      handlePasteItem,
      handleUndo,
    ]
  );
  return { handleKeyDown };
};
