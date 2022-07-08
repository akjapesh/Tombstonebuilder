import { useState, useCallback } from "react";

export const useContentLoader = () => {
  const [contentLoaderState, setContentLoader] = useState({
    width: 600,
    height: 500,
    backgroundColor: "#f3f3f3",
    foregroundColor: "#ecebeb",
    gridVisibility: true,
    speed: 2,
  });
  const updateContentLoader = useCallback((item, value) => {
    if (item === "height" || item === "width") {
      value = Math.max(1, value);
      value = Math.min(1000, value);
    }
    setContentLoader((prevState) => ({ ...prevState, [item]: value }));
  }, []);
  const resetContentLoader = useCallback((newState) => {
    setContentLoader(newState);
  }, []);
  const loadContentLoader=useCallback((item)=>{
    setContentLoader(item);
  },[]);
  return {
    updateContentLoader,
    contentLoaderState,
    resetContentLoader,
    loadContentLoader,
  };
};
