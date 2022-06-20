import { useCallback } from "react";

export const useTabKeyEvent = (sketchRef, setCoords, activeItemCoords) => {
  const handleTabKeyPress = useCallback(() => {
    let cnt = 0;
    sketchRef.current._fc._objects.map((value) => {
      if (cnt) {
        setCoords(value);
        cnt = 0;
      }
      if (
        value.left === activeItemCoords.activeItemCoords.left &&
        value.top === activeItemCoords.activeItemCoords.top
      ) {
        cnt = 1;
      }
      return null;
    });
  }, [activeItemCoords, setCoords]);
  return {
    handleTabKeyPress,
  };
};