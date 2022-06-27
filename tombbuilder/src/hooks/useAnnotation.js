import { useState, useCallback, useEffect } from "react";
import { handleShareCodeAnnotation } from "utils/handleSharedCodeAnnotation";

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
