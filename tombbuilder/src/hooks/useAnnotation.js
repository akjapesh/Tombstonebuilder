import { useState, useCallback } from "react";
// import useSharedAnotation from "./useSharedAnotation";

export const useAnnotation = (initialValue) => {
  const [annotation, setAnnotation] = useState(initialValue);
  console.log("annotation", annotation);
  console.log("initial value", initialValue);

  const updateAnnotationHandler = useCallback((item) => {
    setAnnotation(item);
    // console.log("hii");
  }, []);
  const onAnnotationChangeHandler = useCallback((onAnnotationChange) => {
    onAnnotationChange();
    // console.log("hii");
  }, []);

  return {
    updateAnnotationHandler,
    annotation,
    onAnnotationChangeHandler,
  };
};
