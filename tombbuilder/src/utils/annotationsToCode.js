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
      code += `   <rect x="${numberFixed(a.left)}" rx="${numberFixed(
        a.rx
      )}" ry="${numberFixed(a.ry)}"    y="${numberFixed(
        a.top
      )}"  width="${width}" height="${height}"/> 
      \n`;
    } else if (a.type === "circle") {
      const cx = numberFixed(a.left) + numberFixed(a.radius * a.scaleY);
      const cy = numberFixed(a.top) + numberFixed(a.radius * a.scaleY);
      const radius = numberFixed(a.radius * a.scaleX);
      code += `   
       <circle cx="${cx}" cy="${cy}" r="${radius}" /> 
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
