import { useCallback } from "react";
//utils
import { handleActions } from "../../utils/handleActions";
//hooks
import { useArrowKeysNavigation } from "./useSetKeyPressActions/useArrowKeysNavigation";
import { useTabKeyEvent } from "./useSetKeyPressActions/useTabKeyEvents";

import KEY_CODES from "../../utils/keyCodes";

export const useSetKeyEvents = (
  activeItemCoords,
  setCoords,
  sketchRef,
  contentLoaderState,
  handleMoveActiveItem,
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

  const { handleRedo, handleUndo, handleCloneItem } = handleActions(sketchRef);

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
          [KEY_CODES.DELETE]: handleRemoveItemFromKeyboard,
          [KEY_CODES.RIGHT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.LEFT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.UPSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.DOWNSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.TAB_KEY]: handleTabKeyPress,
          [KEY_CODES.COPY]: handleCloneItem,
          [KEY_CODES.UNDO]: handleUndo,
        };
        actionsByKeyCode[event.keyCode]?.(event);
      }
    },
    [handleArrowKeysNavigation, handleTabKeyPress, handleRemoveItemFromKeyboard]
  );
  return { handleKeyDown };
};