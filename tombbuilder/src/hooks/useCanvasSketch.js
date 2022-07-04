import { useAnnotationToCanvas } from "components/appCanvas/canvas/hooks/useAnnotationToCanvas/useAnnotationToCanvas";
import { useCallback, useState } from "react";

export const ACTION_TYPES = {
  INITIALISE_SKETCH_REF: "INITIALISE_SKETCH_REF",
  REDRAW_CANVAS: "REDRAW_CANVAS",
};

export const useCanvasSketch = ({}) => {
  const [sketchRef, setSketchRef] = useState();
  const { handleAnnotationToCanvas } = useAnnotationToCanvas({ sketchRef });

  const onAction = useCallback((action) => {
    switch (action.type) {
      case "INITIALISE_SKETCH_REF":
        setSketchRef(action.payload.sketchRef);
        break;
      case "REDRAW_CANVAS":
        handleAnnotationToCanvas(action.payload.annotations);
    }
  }, []);

  return { sketchRef, onAction };
};
