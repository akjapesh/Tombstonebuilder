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

      const isItemSelected = activeItemCoords;
      // const rightSideBoundary =
      //   contentLoaderState.width - Number(activeItemCoords.width);
        // console.log(typeof(rightSideBoundary));
      // const bottomSideBoundary =
      //   contentLoaderState.height - Number(activeItemCoords.height);
        // console.log(typeof(bottomSideBoundary));

      if (isItemSelected) {
        event.preventDefault();
        if (event.keyCode === KEY_CODES.LEFT_SIDE)
          handleMoveItem(
            "left",
            Math.max(
              0,
              Number(activeItemCoords.left) - SHIFTING_BY_OFFSET
            )
          );
        else if (event.keyCode === KEY_CODES.UPSIDE)
          handleMoveItem(
            "top",
            Math.max(
              0,
              Number(activeItemCoords.top) - SHIFTING_BY_OFFSET
            )
          );
        else if (event.keyCode === KEY_CODES.RIGHT_SIDE)
          handleMoveItem(
            "left",
            // Math.min(
            //   rightSideBoundary,
              Number(activeItemCoords.left) + SHIFTING_BY_OFFSET
            // )
          );
        else if (event.keyCode === KEY_CODES.DOWNSIDE)
          handleMoveItem(
            "top",
            // Math.min(
            //   bottomSideBoundary,
              Number(activeItemCoords.top) + SHIFTING_BY_OFFSET
            // )
          );
      }
    },
    [activeItemCoords, contentLoaderState.height, contentLoaderState.width, handleMoveItem]
  );
  return { handleArrowKeysNavigation };
};
