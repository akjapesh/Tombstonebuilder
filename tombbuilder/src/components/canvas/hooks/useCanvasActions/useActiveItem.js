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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> 15f690f (Merge branch 'abhinav' of https://github.com/akjapesh/Tombstonebuilder into abhinav)
=======
>>>>>>> 15f690f (Merge branch 'abhinav' of https://github.com/akjapesh/Tombstonebuilder into abhinav)
      if (type === "circle") {
        // handleMoveActiveItem('radius',radius);
        // handleMoveActiveItem('top',top);
        // handleMoveActiveItem('left',left);
      target.set('radius',radius);
      target.set('left',left);
      target.set('top',top);
        return setActiveItemCoords({ radius, left, top, type });
      }
      target.set('width',width);
      target.set('left',left);
      target.set('top',top);
      target.set('height',height);
      return setActiveItemCoords({ width, height, left, top, rx, ry, type });
    },
    [setActiveItemCoords]
  );
  const handleResetActiveItem = () => {
    setActiveItemCoords({});
  };
  const handleMoveActiveItem = (key, value) => {
    console.log(typeof(value),value);

    setActiveItemCoords({ ...activeItemCoords, [key]: value });
  };
  return {
    setCoords,
    activeItemCoords,
    handleResetActiveItem,
    handleMoveActiveItem,
  };
};