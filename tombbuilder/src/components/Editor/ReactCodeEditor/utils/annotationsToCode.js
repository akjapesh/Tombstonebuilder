export const annotationsToCode = (annotationArray) => {
  let code = `
  import React from "react"
  import ContentLoader from "react-content-loader"
  
  const MyLoader = (props) => (
    <ContentLoader 
      rtl
      speed={2}
      width={398}
      height={330}
      viewBox="0 0 398 330"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
  `;
  annotationArray.forEach((a) => {
    console.log(a);
    const height = a.height;
    const width = a.width;
    if ((height === 0 && width === 0) || a.radius === 1) {
      return null;
    }

    if (a.type === "rect") {
      console.log("box", a);
      code += `   <rect x="${a.left}" y="${a.top}"    width="${width}" height="${height}"/> \n`;
    } else if (a.type === "circle") {
      code += `    <circle cx="${a.left + a.radius}" cy="${
        a.top + a.radius
      }" r="${a.radius}" /> \n`;
    }
  });
  code += `
  </ContentLoader>
  )
  
  export default MyLoader
  `;
  return code.trimRight();
};
