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
    const height = numberFixed(a.height) - (numberFixed(a.height) % 4);

    const width = numberFixed(a.width) - (numberFixed(a.width) % 4);

    if ((height === 0 && width === 0) || a.r === 1) {
      return null;
    }

    if (a.type === "rect") {
      code += `   <rect x="${
        numberFixed(a.left) - (numberFixed(a.left) % 4)
      }" rx="${numberFixed(a.rx)}" ry="${numberFixed(a.ry)}"    y="${
        numberFixed(a.top) - (numberFixed(a.top) % 4)
      }"  width="${width}" height="${height}"/> 
      \n`;
    } else if (a.type === "circle") {
      const cx = numberFixed(a.left) + numberFixed(a.radius);
      const cy = numberFixed(a.top) + numberFixed(a.radius);
      const radius = numberFixed(a.radius);
      code += `   
       <circle cx="${cx - (cx % 4)}" cy="${cy - (cy % 4)}" r="${
        radius - (radius % 4)
      }" /> 
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
