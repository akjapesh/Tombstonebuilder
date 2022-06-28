import { numberFixed } from "utils/handleFixingNumbers";

const createNode = (html) =>
  new DOMParser().parseFromString(html, "text/html").body.firstChild;
export const handleCodeToContentLoader = ({ code, updateContentLoader }) => {
  if (!code) return [];
  const codeArray = code.split("\n");
  const temp = codeArray.map((element) => {
    const item = createNode(element);
    if (item !== null) {
      if (element.includes("<ContentLoader ")) {
        if (item.getAttribute("speed")) {
          updateContentLoader(
            "speed",
            numberFixed(
              item
                .getAttribute("speed")
                .substring(1, item.getAttribute("speed").length - 1)
            )
          );
        }
        if (item.getAttribute("width")) {
          updateContentLoader(
            "width",
            numberFixed(
              item
                .getAttribute("width")
                .substring(1, item.getAttribute("width").length - 1)
            )
          );
        }
        if (item.getAttribute("height")) {
          updateContentLoader(
            "height",
            numberFixed(
              item
                .getAttribute("height")
                .substring(1, item.getAttribute("height").length - 1)
            )
          );
        }
        if (item.getAttribute("backgroundColor")) {
          updateContentLoader(
            "backgroundColor",
            item.getAttribute("backgroundColor")
          );
        }
        if (item.getAttribute("foregroundColor")) {
          updateContentLoader(
            "foregroundColor",
            item.getAttribute("foregroundColor")
          );
        }
      }
    }
    return {};
  });
};
