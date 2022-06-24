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
    const height = numberFixed(a.height);

    const width = numberFixed(a.width);

    if ((height === 0 && width === 0) || a.r === 1) {
      return null;
    }

    if (a.type === "rect") {
      code += `   <rect x="${numberFixed(a.left)}" rx="${numberFixed(a.rx)}" ry="${numberFixed(a.ry)}"    y="${numberFixed(
        a.top
      )}"  width="${width}" height="${height}"/> 
      \n`;
    } else if (a.type === "circle") {
      code += `    <circle cx="${
        numberFixed(a.left) + numberFixed(a.radius)
      }" cy="${numberFixed(a.top) + numberFixed(a.radius)}" r="${numberFixed(
        a.radius
      )}" /> \n`;
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