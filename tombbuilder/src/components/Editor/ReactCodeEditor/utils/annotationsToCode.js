import { numberFixed } from "../../../../utils/handleFixingNumbers";

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
        export default MyLoader
    `;
  }


  // const sharedCode = atob(window.location.href.substring(22));
  // console.log(code);
  // if(sharedCode.length)
  // {
  //   code = code + sharedCode.substring(257,sharedCode.length - 95);
  // }


  annotationArray.forEach((a) => {
    const height = numberFixed(a.height * a.scaleY);

    const width = numberFixed(a.width * a.scaleX);

    if ((height === 0 && width === 0) || a.r === 1) {
      return null;
    }

    if (a.type === "rect") {
      code += `   <rect x="${
        numberFixed(a.left) - (numberFixed(a.left) % 4)
      }" rx="${numberFixed(a.rx)}" ry="${numberFixed(a.ry)}"    y="${
        numberFixed(a.top) - (numberFixed(a.top) % 4)
      }"  width="${width - (width % 4)}" height="${height - (height % 4)}"/> 
      \n`;
    } else if (a.type === "circle") {
      const cx = numberFixed(a.left) + numberFixed(a.radius * a.scaleY);
      const cy = numberFixed(a.top) + numberFixed(a.radius * a.scaleY);
      const radius = numberFixed(a.radius * a.scaleX);
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
        export default MyLoader
        `;

  return code.trimRight();
};
