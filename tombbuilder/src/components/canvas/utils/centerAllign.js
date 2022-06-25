import { fabric } from "fabric";
import { numberFixed } from "../../../utils/handleFixingNumbers";
import { SHIFTING_BY_OFFSET } from "../hooks/useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";

export const centerAllign = (sketchRef) => {
  const calculateCenter = (target) => {
    const center = { centerX: 0, centerY: 0 };
    // center.centerY=numberFixed(numberFixed(target.top) - (numberFixed(target.top) % SHIFTING_BY_OFFSET)+(numberFixed(target.height) - (numberFixed(target.height) % SHIFTING_BY_OFFSET))/2);
    // center.centerX=numberFixed(numberFixed(target.left) - (numberFixed(target.left) % SHIFTING_BY_OFFSET)+(numberFixed(target.width) - (numberFixed(target.width) % SHIFTING_BY_OFFSET))/2);
    const newTop =
      numberFixed(target.top) - (numberFixed(target.top) % SHIFTING_BY_OFFSET);
    const newLeft =
      numberFixed(target.left) -
      (numberFixed(target.left) % SHIFTING_BY_OFFSET);
    const newHeight =
      numberFixed(target.height) -
      (numberFixed(target.height) % SHIFTING_BY_OFFSET);
    const newWidth =
      numberFixed(target.width) -
      (numberFixed(target.width) % SHIFTING_BY_OFFSET);
    center.centerY = newTop + newHeight / 2;
    center.centerX = newLeft + newWidth / 2;
    center.centerX = numberFixed(center.centerX);

    center.centerY = numberFixed(center.centerY);

    return center;
  };

  const clearCenterAllignLines = () => {
    sketchRef.current._fc._objects.forEach((o) => {
      if (o.type === "line") {
        sketchRef.current._fc.remove(o);
      }
    });
  };

  const connectCenterAllignLine = (target) => {
    clearCenterAllignLines();
    const targetCenter = calculateCenter(target);
    sketchRef.current._fc._objects.forEach((o) => {
      if (o !== target) {
        const anotherShapeCenter = calculateCenter(o);
        if (targetCenter.centerX === anotherShapeCenter.centerX) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.centerX,
                targetCenter.centerY,
                anotherShapeCenter.centerX,
                anotherShapeCenter.centerY,
              ],
              { stroke: "red" }
            )
          );
          // console.log("----------Y line---------",center,prCenter);
        } else if (targetCenter.centerY === anotherShapeCenter.centerY) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.centerX,
                targetCenter.centerY,
                anotherShapeCenter.centerX,
                anotherShapeCenter.centerY,
              ],
              { stroke: "red" }
            )
          );
          // console.log("---------X line----------",center,prCenter);
        }
      }
    });
  };

  return {
    clearCenterAllignLines,
    connectCenterAllignLine,
  };
};
