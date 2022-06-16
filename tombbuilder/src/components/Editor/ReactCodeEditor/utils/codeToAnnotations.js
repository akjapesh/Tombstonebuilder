const createNode = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.firstChild;
export function codeToAnnotations(code) {
  if (!code) return [];
  const codeArray = code.split("\n");
  const annotationArray = codeArray.map((element) => {
    const annotationObject = {};
    const item = createNode(element);
    if (item !== null) {
      if (element.includes("<rect ")) {
        annotationObject.type = "rect";
        annotationObject.x = item.getAttribute("x");
        annotationObject.y = item.getAttribute("y");
        annotationObject.width = item.getAttribute("width");
        annotationObject.height = item.getAttribute("height");
        annotationObject.ry = item.getAttribute("ry");
        annotationObject.rx = item.getAttribute("rx");
      } else if (element.includes("<circle ")) {
        annotationObject.type = "circle";
        annotationObject.cx = item.getAttribute("cx");
        annotationObject.cy = item.getAttribute("r");
        annotationObject.r = item.getAttribute("r");
      }
      // else if (element.includes("<ContentLoader")) {
      //   annotationObject.type = "box";
      //   annotationObject.speed = item.getAttribute("speed");
      //   annotationObject.width = item.getAttribute("width");
      //   annotationObject.backgroundColor = item.getAttribute("backgroundColor");
      //   annotationObject.height = item.getAttribute("height");
      //   annotationObject.foregroundColor = item.getAttribute("foregroundColor");
      // }
      else {
        return null;
      }
      return annotationObject;
    }
    return null;
  });
  return annotationArray.filter((e) => e !== undefined && e);
}
