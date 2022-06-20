import { Grid } from "baseui/layout-grid";
import { useCallback, useState } from "react";

const DEFAULT_COORDS = {};
const GRID_STEP = 4;
export const useActiveItem = () => {
  const [activeItemCoords, setActiveItemCoords] = useState(DEFAULT_COORDS);
  const setCoords = useCallback(
    (target) => {
      const { type, width, height, left, top, radius, rx } = target;

      const newLeft = Math.floor(left / GRID_STEP) * GRID_STEP;
      const newTop = Math.floor(top / GRID_STEP) * GRID_STEP;
      //
      console.log(newLeft, newTop);
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
