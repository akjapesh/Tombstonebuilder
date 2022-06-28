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

          let { type, width, height, left, top, radius, rx, ry, scaleX, scaleY } = target;

          const width_only = shiftValueByOffset(width);
          const height_only = shiftValueByOffset(height);
          const radius_only = shiftValueByOffset(radius);
          width = shiftValueByOffset(width*scaleX);
          radius = shiftValueByOffset(radius*scaleX);
          left = shiftValueByOffset(left);
          top = shiftValueByOffset(top);
          height = shiftValueByOffset(height*scaleY);

          target.set("left", left);
          target.set("top", top);
        
          if (type === "circle") {
            target.set("radius", radius_only);
            return setActiveItemCoords({ radius, left, top, type });
          }
          target.set("width", width_only);
          target.set("height", height_only);
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
