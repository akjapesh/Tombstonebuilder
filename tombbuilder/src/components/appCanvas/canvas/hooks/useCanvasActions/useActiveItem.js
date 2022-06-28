//hooks
import { useCallback, useState } from "react";

//utils
import { shiftValueByOffset } from "utils/shiftValueByOffset";

//constant
const DEFAULT_COORDS = {};

export const useActiveItem = () => {
  const [activeItemCoords, setActiveItemCoords] = useState(DEFAULT_COORDS);

  const handleActiveItemActions = useCallback(
    ({ type, payLoad }) => {
      switch (type) {
        case "SetCoords":
          const { target } = payLoad;

          let { type, width, height, left, top, radius, rx, ry } = target;

          width = shiftValueByOffset(width);
          radius = shiftValueByOffset(radius);
          left = shiftValueByOffset(left);
          top = shiftValueByOffset(top);
          height = shiftValueByOffset(height);

          target.set("left", left);
          target.set("top", top);

          if (type === "circle") {
            target.set("radius", radius);
            return setActiveItemCoords({ radius, left, top, type });
          }
          target.set("width", width);
          target.set("height", height);
          return setActiveItemCoords({
            width,
            height,
            left,
            top,
            rx,
            ry,
            type,
          });
          break;
        case "Reset":
          setActiveItemCoords({});
          break;
        case "Move":
          const { key, value } = payLoad;
          setActiveItemCoords({ ...activeItemCoords, [key]: value });
          break;
        default:
          break;
      }
    },
    [activeItemCoords]
  );

  return {
    handleActiveItemActions,
    activeItemCoords,
  };
};
