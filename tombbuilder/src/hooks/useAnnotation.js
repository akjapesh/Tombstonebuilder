import { useState, useCallback } from "react";
import useSharedAnotation from "./useSharedAnotation";

export const useAnnotation = (initialValue) => {

  const [annotation, setAnnotation] = useState(initialValue);
  console.log("annotation",annotation);

  const updateAnnotationHandler = useCallback((item) => {
    setAnnotation(item);
  }, []);
  const onAnnotationChangeHandler = useCallback((onAnnotationChange) => {
    onAnnotationChange();
  }, []);

  return {
    updateAnnotationHandler,
    annotation,
    onAnnotationChangeHandler,
  };
};
