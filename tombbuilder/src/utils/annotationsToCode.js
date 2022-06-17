export const annotationsToCode = (annotationArray) => {
  if (annotationArray.length === 0) {
    return `
    const MyLoader = (props) => (
      <ContentLoader 
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        
      </ContentLoader>
    )
    
    `;
  }
  let code = `
const MyLoader = (props) => {
  return (
  <ContentLoader 
    speed={2}
    width={300}
    height={400}
    viewBox="0 0 300 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props} 
  >
  `;
  annotationArray.forEach((a) => {
    const height = a.height;
    const width = a.width;
    if ((height === 0 && width === 0) || a.radius === 1) {
      return null;
    }

    if (a.type === "rect") {
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
}
  
render(<MyLoader />)
  `;
  return code.trimRight();
};
