import { useCallback, useState } from "react";

const DEFAULT_COORDS = {};

export const useActiveItem = () => {
  const [activeItemCoords, setActiveItemCoords] = useState(DEFAULT_COORDS);
  const setCoords = useCallback(
    (target) => {
      const { type, width, height, left, top, radius, rx } = target;
      if (type === "circle") {
        return setActiveItemCoords({
          activeItemCoords: { radius, left, top, type },
        });
      }
      return setActiveItemCoords({
        activeItemCoords: { width, height, left, top, boxRadius: rx, type },
      });
    },
    [setActiveItemCoords]
  );
  const handleResetActiveItem = () => {
    setActiveItemCoords({ activeItemCoords: {} });
  };
  const handleMoveActiveItem = (key, value) => {
    setActiveItemCoords((prevState) => ({
      ...prevState,
      activeItemCoords: { ...prevState.activeItemCoords, [key]: value },
    }));
  };
  return {
    setCoords,
    activeItemCoords,
    handleResetActiveItem,
    handleMoveActiveItem,
  };
};
