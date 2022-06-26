import { useCallback } from "react";

export const useAnnotationToCanvas = ({sketchRef}) => {
  const handleAnnotationToCanvas = useCallback(
    (newAnnotationArray) => {
      const canvas = sketchRef.current && sketchRef.current._fc;
      sketchRef.current.clear();
      if (canvas) {
        newAnnotationArray.forEach((a) => {
          let draw;
          if (a && a.type === "rect") {
            draw = new window.fabric.Rect(a);
          } else if (a && a.type === "circle") {
            draw = new window.fabric.Circle(a);
          }
          draw && canvas.add(draw);
        });

        canvas.renderAll();
      }
    },
    [sketchRef]
  ); 

  return {
    handleAnnotationToCanvas,
  };
};
