import { useCallback, useState } from "react";

const DEFAULT_COORDS = {};
const GRID_STEP=4;
export const useActiveItem = () => {
  const [activeItemCoords, setActiveItemCoords] = useState(DEFAULT_COORDS);
  const setCoords = useCallback(
    (target) => {
      const { type, width, height, left, top, radius, rx } = target;
      const newleft=Math.floor(left/GRID_STEP)*GRID_STEP;
      const newtop=Math.floor(top/GRID_STEP)*GRID_STEP;
      console.log(newleft,newtop)
      if (type === "circle") {
        return setActiveItemCoords({
          activeItemCoords: { radius, left:newleft, top:newtop, type },
        });
      }
      return setActiveItemCoords({
        activeItemCoords: { width, height, left:newleft, top:newtop, boxRadius: rx, type },
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