import { numberFixed } from "./handleFixingNumbers";

export const annotationsToCode = ({ annotation, contentLoaderState }) => {
  const { speed, width, height, backgroundColor, foregroundColor } =
    contentLoaderState;

  if (annotation.length === 0) {
    return `
    const MyLoader = (props) => {
      return (
      <div> 
        </div>)}
    `;
  }
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
  annotation.forEach((a) => {
    const height = numberFixed(a.height * a.scaleY);

    const width = numberFixed(a.width * a.scaleX);

    if ((height === 0 && width === 0) || a.r === 1) {
      return null;
    }

    if (a.type === "rect") {
      code += `   <rect x="${numberFixed(a.left) - numberFixed(a.left)%16}" rx="${numberFixed(
        a.rx
      )}" ry="${numberFixed(a.ry)}"    y="${numberFixed(a.top)  - numberFixed(a.top)%16}"  
      width="${width- width%16}" height="${height - height%16}"/> 
      \n`;
    } else if (a.type === "circle") {
      const cx = numberFixed(a.left) + numberFixed(a.radius * a.scaleY);
      const cy = numberFixed(a.top) + numberFixed(a.radius * a.scaleY);
      const radius = numberFixed(a.radius * a.scaleX);
      code += `   
       <circle cx="${cx - cx%16}" cy="${cy - cy%16}" r="${radius}" /> 
      \n
      `;
    }
  });
  code += `
          </ContentLoader>
          
          )
        }
       
        `;

  return code.trimRight();
};
