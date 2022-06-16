import { useState, useCallback } from "react";
export const useContentLoader = () => {
  const [contentLoaderState, setContentLoader] = useState({
    width: 300,
    height: 400,
    backgroundColor: "#ffffff",
    foregroundColor: "#ecebeb",
    gridVisibility: true,
    speed: 2,
  });
  const updateContentLoader = useCallback((item, value) => {
    setContentLoader((prevState) => ({ ...prevState, [item]: value }));
  }, []);
  return {
    updateContentLoader,
    contentLoaderState,
  };
};
