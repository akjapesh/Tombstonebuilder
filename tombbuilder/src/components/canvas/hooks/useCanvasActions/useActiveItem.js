import { useCallback, useState } from "react";
import { SHIFTING_BY_OFFSET } from "../useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";
const DEFAULT_COORDS = {};

export const useActiveItem = () => {
  const [activeItemCoords, setActiveItemCoords] = useState(DEFAULT_COORDS);
  const setCoords = useCallback(
    (target) => {
      let { type, width, height, left, top, radius, rx, ry } = target;
      width = width - (width % SHIFTING_BY_OFFSET);
      radius = radius - (radius % SHIFTING_BY_OFFSET);
      left = left - (left % SHIFTING_BY_OFFSET);
      top = top - (top % SHIFTING_BY_OFFSET);
      height = height - (height % SHIFTING_BY_OFFSET);

      target.set("left", left);
      target.set("top", top);

      if (type === "circle") {
        target.set("radius", radius);
        return setActiveItemCoords({ radius, left, top, type });
      }
      target.set("width", width);
      target.set("height", height);
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
