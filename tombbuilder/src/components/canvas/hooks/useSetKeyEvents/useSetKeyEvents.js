import { useCallback } from "react";
//utils
import { handleActions } from "../../utils/handleActions";
//hooks
import { useArrowKeysNavigation } from "./useSetKeyPressActions/useArrowKeysNavigation";
import { useTabKeyEvent } from "./useSetKeyPressActions/useTabKeyEvent";
import Tools from "../../../../third-parts/react-sketch/src/tools";

import KEY_CODES from "../../utils/keyCodes";

export const useSetKeyEvents = (
  activeItemCoords,
  setCoords,
  sketchRef,
  contentLoaderState,
  handleRemoveItemFromKeyboard,
  handleMoveItem,
  handleToolChange
) => {
  const { handleTabKeyPress } = useTabKeyEvent(
    sketchRef,
    setCoords,
    activeItemCoords
  );

  const { handleArrowKeysNavigation } = useArrowKeysNavigation(
    activeItemCoords,
    contentLoaderState,
    handleMoveItem,
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

        const handleSelect = () => {handleToolChange(Tools.Select)};
        const handleRectangle = () => {handleToolChange(Tools.Rectangle)};
        const handleCircle = () => {handleToolChange(Tools.Circle)};
        const actionsByKeyCode = {
          [KEY_CODES.DELETE]: handleRemoveItemFromKeyboard,
          [KEY_CODES.RIGHT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.LEFT_SIDE]: handleArrowKeysNavigation,
          [KEY_CODES.UPSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.DOWNSIDE]: handleArrowKeysNavigation,
          [KEY_CODES.TAB_KEY]: handleTabKeyPress,
          [KEY_CODES.SELECT]: handleSelect,
          [KEY_CODES.RECTANGLE]: handleRectangle,
          [KEY_CODES.CIRCLE]: handleCircle,
        };
        actionsByKeyCode[event.keyCode]?.(event);
      }
    },
    [handleRedo, handleCutItem, handleCopyItem, handlePasteItem, handleUndo, handleRemoveItemFromKeyboard, handleArrowKeysNavigation, handleTabKeyPress, handleToolChange]
  );
  return { handleKeyDown };
};