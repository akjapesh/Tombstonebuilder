import { useCallback } from "react";

import KEY_CODES from "../../../utils/keyCodes";

const SHIFTING_BY_OFFSET = 4;

export const useArrowKeysNavigation = (
  activeItemCoords,
  contentLoaderState,
  handleMoveItem
) => {
  const handleArrowKeysNavigation = useCallback(
    (event) => {
      const isItemSelected = activeItemCoords.activeItemCoords;

      const rightSideBoundary =
        contentLoaderState.width - activeItemCoords.activeItemCoords.width;

      const bottoomSideBoundary =
        contentLoaderState.height - activeItemCoords.activeItemCoords.height;

      if (isItemSelected) {
        event.preventDefault();
        if (event.keyCode === KEY_CODES.LEFT_SIDE)
          handleMoveItem(
            "left",
            Math.max(
              0,
              activeItemCoords.activeItemCoords.left - SHIFTING_BY_OFFSET
            )
          );
        else if (event.keyCode === KEY_CODES.UPSIDE)
          handleMoveItem(
            "top",
            Math.max(
              0,
              activeItemCoords.activeItemCoords.top - SHIFTING_BY_OFFSET
            )
          );
        else if (event.keyCode === KEY_CODES.RIGHT_SIDE)
          handleMoveItem(
            "left",
            Math.min(
              rightSideBoundary,
              activeItemCoords.activeItemCoords.left + SHIFTING_BY_OFFSET
            )
          );
        else if (event.keyCode === KEY_CODES.DOWNSIDE)
          handleMoveItem(
            "top",
            Math.min(
              bottoomSideBoundary,
              activeItemCoords.activeItemCoords.top + SHIFTING_BY_OFFSET
            )
          );
      }
    },
    [
      activeItemCoords.activeItemCoords,
      contentLoaderState.height,
      contentLoaderState.width,
    ]
  );
  return { handleArrowKeysNavigation };
};