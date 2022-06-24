import { numberFixed } from "../../../../utils/handleFixingNumbers";

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
        annotationObject.left = numberFixed(item.getAttribute("x"));
        annotationObject.top = numberFixed(item.getAttribute("y"));
        annotationObject.width = numberFixed(item.getAttribute("width"));
        annotationObject.height = numberFixed(item.getAttribute("height"));
        annotationObject.fill = "transparent";
        annotationObject.ry = item.getAttribute("ry");
        annotationObject.rx = item.getAttribute("rx");
      } else if (element.includes("<circle ")) {
        annotationObject.type = "circle";
        annotationObject.left =
          numberFixed(item.getAttribute("cx")) -
          numberFixed(item.getAttribute("r"));
        annotationObject.top =
          numberFixed(item.getAttribute("cy")) -
          numberFixed(item.getAttribute("r"));
        annotationObject.radius = numberFixed(item.getAttribute("r"));
        annotationObject.fill = "transparent";
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