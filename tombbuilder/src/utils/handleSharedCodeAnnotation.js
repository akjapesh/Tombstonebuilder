// Rename this util to urlData
// It will have below util exported from itself
// const getInitialStateFromUrl = () => { annotations, contentLoaderState }

export const handleShareCodeAnnotation = async () => {
  let returnAnnotation = [];

  try {
    // Remove await
    const urlSearchParams = await new URLSearchParams(window.location.search);
    // Remove await
    const base64AnnotationsString = await urlSearchParams.get("data");
    if (!base64AnnotationsString || base64AnnotationsString.length === 0)
      return [];
    // Remove await
    const stringifiedAnnotations = await atob(base64AnnotationsString);
    const parsedAnnotations = await JSON.parse(stringifiedAnnotations);
    returnAnnotation = parsedAnnotations;
  } catch (error) {
    console.error("Got corrupt data");
    return [];
  }
  return returnAnnotation;
};
