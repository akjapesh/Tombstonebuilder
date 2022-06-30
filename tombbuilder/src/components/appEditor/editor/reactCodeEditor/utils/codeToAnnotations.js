import { numberFixed } from "utils/handleFixingNumbers";
import { shiftValueByOffset } from "utils/shiftValueByOffset";
const createNode = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.firstChild;
export function codeToAnnotations({ code }) {
  if (!code) return [];
  const codeArray = code.split("\n");
  const annotationArray = codeArray.map((element) => {
    const annotationObject = {};
    const item = createNode(element);
    if (item !== null) {
      if (element.includes("<rect ") || element.includes("<Rect ")) {
        annotationObject.type = "rect";

        annotationObject.left = shiftValueByOffset(
          numberFixed(item.getAttribute("x"))
        );

        annotationObject.top = shiftValueByOffset(
          numberFixed(item.getAttribute("y"))
        );

        annotationObject.width = shiftValueByOffset(
          numberFixed(item.getAttribute("width"))
        );

        annotationObject.height = shiftValueByOffset(
          numberFixed(item.getAttribute("height"))
        );

        annotationObject.fill = "transparent";

        annotationObject.ry = item.getAttribute("ry");

        annotationObject.rx = item.getAttribute("rx");
        if (annotationObject.width === 0 || annotationObject.height === 0)
          return null;
      } else if (element.includes("<circle ") || element.includes("<Circle ")) {
        annotationObject.type = "circle";

        annotationObject.left = shiftValueByOffset(
          numberFixed(item.getAttribute("cx")) -
            numberFixed(item.getAttribute("r"))
        );
        annotationObject.top = shiftValueByOffset(
          numberFixed(item.getAttribute("cy")) -
            numberFixed(item.getAttribute("r"))
        );
        annotationObject.radius = shiftValueByOffset(
          numberFixed(item.getAttribute("r"))
        );

        annotationObject.fill = "transparent";
        if (annotationObject.radius <= 1) return null;
      } else {
        return null;
      }
      return annotationObject;
    }
    return null;
  });

  return annotationArray.filter((e) => e !== undefined && e);
}
