import { useCallback, useState } from "react";

const DEFAULT_COORDS = {};

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
        return setActiveItemCoords({ radius, left, top, type });
      }
      return setActiveItemCoords({ width, height, left, top, rx, ry, type });
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