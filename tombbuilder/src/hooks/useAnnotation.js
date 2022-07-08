import { useState, useCallback } from "react";

export const useAnnotation = () => {
  const [annotation, setAnnotation] = useState([]);

  const updateAnnotationHandler = useCallback((item) => {
    setAnnotation(item);
  }, []);

  return {
    updateAnnotationHandler,
    annotation,
  };
};
