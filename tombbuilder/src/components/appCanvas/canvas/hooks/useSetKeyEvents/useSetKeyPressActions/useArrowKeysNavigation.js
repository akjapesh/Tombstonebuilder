import { useCallback } from "react";

// Should be imported as constants/keyCodes not utils/keyCodes
import KEY_CODES from "../../../utils/keyCodes";

export const SHIFTING_BY_OFFSET = 16;

// const getRightBoundary = (canvasDimensions, activeItem)
// getBottomBoundary

export const useArrowKeysNavigation = (
  activeItemCoords,
  // can be renamed to canvasDimensions
  // and its shape should be { width, height }
  contentLoaderState,
  handleItemActions
) => {
  const handleArrowKeysNavigation = useCallback(
    (event) => {
      const isItemSelected = activeItemCoords;
      const rightSideBoundary =
        contentLoaderState.width -
        Number(
          // width will be only for rect
          activeItemCoords.width
            ? activeItemCoords.width
            // otherwise the case of circle
            : 2 * activeItemCoords.radius
        );
      const bottomSideBoundary =
        contentLoaderState.height -
        Number(
          activeItemCoords.height
            ? activeItemCoords.height
            : 2 * activeItemCoords.radius
        );

      if (isItemSelected) {
        event.preventDefault();
        if (event.keyCode === KEY_CODES.LEFT_SIDE)
          handleItemActions({
            type: "Move",
            payLoad: {
              key: "left",
              value: Math.max(
                0,
                Number(activeItemCoords.left) - SHIFTING_BY_OFFSET
              ),
            },
          });
        else if (event.keyCode === KEY_CODES.UPSIDE)
          handleItemActions({
            type: "Move",
            payLoad: {
              key: "top",
              value: Math.max(
                0,
                Number(activeItemCoords.top) - SHIFTING_BY_OFFSET
              ),
            },
          });
        else if (event.keyCode === KEY_CODES.RIGHT_SIDE)
          handleItemActions({
            type: "Move",
            payLoad: {
              key: "left",
              value: Math.min(
                rightSideBoundary,
                Number(activeItemCoords.left) + SHIFTING_BY_OFFSET
              ),
            },
          });
        else if (event.keyCode === KEY_CODES.DOWNSIDE)
          handleItemActions({
            type: "Move",
            payLoad: {
              key: "top",
              value: Math.min(
                bottomSideBoundary,
                Number(activeItemCoords.top) + SHIFTING_BY_OFFSET
              ),
            },
          });
      }
    },
    [
      activeItemCoords,
      contentLoaderState.height,
      contentLoaderState.width,
      handleItemActions,
    ]
  );
  return { handleArrowKeysNavigation };
};
