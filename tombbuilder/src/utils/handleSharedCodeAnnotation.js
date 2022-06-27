export const handleShareCodeAnnotation = async () => {
  let returnAnnotation = [];

  try {
    const urlSearchParams = await new URLSearchParams(window.location.search);
    const base64AnnotationsString = await urlSearchParams.get("data");
    if (!base64AnnotationsString || base64AnnotationsString.length === 0)
      return [];
    const stringifiedAnnotations = await atob(base64AnnotationsString);
    const parsedAnnotations = await JSON.parse(stringifiedAnnotations);
    returnAnnotation = parsedAnnotations;
  } catch (error) {
    console.error("Got corrupt data");
    return [];
  }
  return returnAnnotation;
};
