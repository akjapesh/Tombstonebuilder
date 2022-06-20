import { Grid } from "baseui/layout-grid";
import { useCallback, useState } from "react";

const DEFAULT_COORDS = {};
const GRID_STEP = 4;
export const useActiveItem = () => {
  const [activeItemCoords, setActiveItemCoords] = useState(DEFAULT_COORDS);
  const setCoords = useCallback(
    (target) => {
      let { type, width, height, left, top, radius, rx, ry } = target;
      width = width - (width % 4);
      radius = radius - (radius % 4);
      left = left - (left % 4);
      top = top - (top % 4);
      height = height - (height % 4);
      if (type === "circle") {
        const newRadius = Math.floor(radius / GRID_STEP) * GRID_STEP;
        return setActiveItemCoords({
          activeItemCoords: {
            radius: newRadius,
            left: newLeft,
            top: newTop,
            type,
          },
        });
      }
      // const newWidth=Math.floor(width/GRID_STEP)*GRID_STEP;
      // const newHeight=Math.floor(height/GRID_STEP)*GRID_STEP;
      // console.log(newHeight,newHeight);
      return setActiveItemCoords({
        activeItemCoords: {
          width,
          height,
          left: newLeft,
          top: newTop,
          boxRadius: rx,
          type,
        },
      });
    },
    [setActiveItemCoords]
  );
  const handleResetActiveItem = () => {
    setActiveItemCoords({});
  };
  const handleMoveActiveItem = (key, value) => {
    setActiveItemCoords({ ...activeItemCoords, [key]: value });
  };
  return {
    setCoords,
    activeItemCoords,
    handleResetActiveItem,
    handleMoveActiveItem,
  };
};
