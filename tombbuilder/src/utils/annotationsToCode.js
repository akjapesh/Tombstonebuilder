import { SHIFTING_BY_OFFSET } from "../components/canvas/hooks/useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";
import { numberFixed } from "./handleFixingNumbers";
export const annotationsToCode = (annotationArray, contentLoaderState) => {
  const { speed, width, height, backgroundColor, foregroundColor } =
    contentLoaderState;

  let code = `
    const MyLoader = (props) => {
      return (
      <ContentLoader 
        speed={${speed}}
        width={${width}}
        height={${height}}
        viewBox="0 0 ${width} ${height}"
        backgroundColor="${backgroundColor}"
        foregroundColor="${foregroundColor}"
        {...props} 
      >
      `;

  if (annotationArray.length === 0) {
    return `
      ${code}
        </ContentLoader>)}
    `;
  }

  annotationArray.forEach((a) => {
    const height = numberFixed(a.height * a.scaleY);

    const width = numberFixed(a.width * a.scaleX);

    if ((height === 0 && width === 0) || a.r === 1) {
      return null;
    }

    if (a.type === "rect") {
      code += `   <rect x="${
        numberFixed(a.left) - (numberFixed(a.left) % SHIFTING_BY_OFFSET)
      }" rx="${numberFixed(a.rx)}" ry="${numberFixed(a.ry)}"    y="${
        numberFixed(a.top) - (numberFixed(a.top) % SHIFTING_BY_OFFSET)
      }"  width="${width - (width % SHIFTING_BY_OFFSET)}" height="${
        height - (height % SHIFTING_BY_OFFSET)
      }"/> 
      \n`;
    } else if (a.type === "circle") {
      const cx = numberFixed(a.left) + numberFixed(a.radius * a.scaleY);
      const cy = numberFixed(a.top) + numberFixed(a.radius * a.scaleY);
      const radius = numberFixed(a.radius * a.scaleX);
      code += `   
       <circle cx="${cx - (cx % SHIFTING_BY_OFFSET)}" cy="${
        cy - (cy % SHIFTING_BY_OFFSET)
      }" r="${radius - (radius % SHIFTING_BY_OFFSET)}" /> 
      \n
      `;
    }
  });

  code += `
          </ContentLoader>
          
          )
        }
       render(<MyLoader />)
        `;

  return code.trimRight();
};