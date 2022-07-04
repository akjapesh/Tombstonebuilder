import { fabric } from "fabric";
import { numberFixed } from "utils/handleFixingNumbers";
import { shiftValueByOffset } from "utils/shiftValueByOffset";

export const centerAlign = (sketchRef) => {
  const calculateCenter = (target) => {
    const center = {
      centerX: 0,
      centerY: 0,
      left: 0,
      right: 0,
      top: 0,
      down: 0,
    };
    const newTop = shiftValueByOffset(numberFixed(target.top));
    const newLeft = shiftValueByOffset(numberFixed(target.left));
    const newHeight = shiftValueByOffset(numberFixed(target.height));
    const newWidth = shiftValueByOffset(numberFixed(target.width));

    center.centerY = newTop + newHeight / 2;
    center.centerX = newLeft + newWidth / 2;
    center.centerX = numberFixed(center.centerX);
    center.centerY = numberFixed(center.centerY);
    center.left = shiftValueByOffset(numberFixed(target.left));
    center.right =
      shiftValueByOffset(numberFixed(target.left)) +
      shiftValueByOffset(numberFixed(target.width));
    center.top = shiftValueByOffset(numberFixed(target.top));
    center.down =
      shiftValueByOffset(numberFixed(target.top)) +
      shiftValueByOffset(numberFixed(target.height));
    return center;
  };

  const clearCenterAlignLines = () => {
    sketchRef.current._fc._objects.forEach((o) => {
      if (
        o.type === "line" ||
        (o.type === "circle" && numberFixed(o.radius) <= 1) ||
        (o.type === "rect" &&
          (numberFixed(o.height) === 0 || numberFixed(o.width) === 0))
      ) {
        sketchRef.current._fc.remove(o);
      }
    });
  };

  const connectCenterAlignLine = (target) => {
    clearCenterAlignLines();
    const targetCenter = calculateCenter(target);
    sketchRef.current._fc._objects.forEach((o) => {
      if (o !== target && o.type !== "line") {
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
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.centerY === anotherShapeCenter.centerY) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.centerX,
                targetCenter.centerY,
                anotherShapeCenter.centerX,
                anotherShapeCenter.centerY,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.top === anotherShapeCenter.top) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.centerX,
                targetCenter.top,
                anotherShapeCenter.centerX,
                anotherShapeCenter.top,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.left === anotherShapeCenter.left) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.left,
                targetCenter.centerY,
                anotherShapeCenter.left,
                anotherShapeCenter.centerY,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.down === anotherShapeCenter.down) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.centerX,
                targetCenter.down,
                anotherShapeCenter.centerX,
                anotherShapeCenter.down,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.right === anotherShapeCenter.right) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.right,
                targetCenter.centerY,
                anotherShapeCenter.right,
                anotherShapeCenter.centerY,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.top === anotherShapeCenter.down) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.centerX,
                targetCenter.top,
                anotherShapeCenter.centerX,
                anotherShapeCenter.down,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.down === anotherShapeCenter.top) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.centerX,
                targetCenter.down,
                anotherShapeCenter.centerX,
                anotherShapeCenter.top,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.left === anotherShapeCenter.right) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.left,
                targetCenter.centerY,
                anotherShapeCenter.right,
                anotherShapeCenter.centerY,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        } else if (targetCenter.right === anotherShapeCenter.left) {
          sketchRef.current._fc.add(
            new fabric.Line(
              [
                targetCenter.right,
                targetCenter.centerY,
                anotherShapeCenter.left,
                anotherShapeCenter.centerY,
              ],
              { stroke: "#184dc9", strokeDashArray: [5, 5] }
            )
          );
        }
      }
    });
  };

  return {
    clearCenterAlignLines,
    connectCenterAlignLine,
  };
};
