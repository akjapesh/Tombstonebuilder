export const annotationsToCode = (annotationArray, contentLoaderState) => {
  const numberFixed = (num) => Number(Number(num).toFixed());
  if (annotationArray.length === 0) {
    return `
    const MyLoader = (props) => (
      <ContentLoader 
        speed={${contentLoaderState.speed}}
        width={${contentLoaderState.width}}
        height={${contentLoaderState.height}}
        viewBox="0 0 ${contentLoaderState.width} ${contentLoaderState.height}"
        backgroundColor="${contentLoaderState.backgroundColor}"
        foregroundColor="${contentLoaderState.foregroundColor}"
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
    speed={${contentLoaderState.speed}}
    width={${contentLoaderState.width}}
    height={${contentLoaderState.height}}
    viewBox="0 0 ${contentLoaderState.width} ${contentLoaderState.height}"
    backgroundColor="${contentLoaderState.backgroundColor}"
    foregroundColor="${contentLoaderState.foregroundColor}"
    {...props} 
  >
  `;
  annotationArray.forEach((a) => {
    const height = numberFixed(a.height);
    const width = numberFixed(a.width);
    // if ((height === 0 && width === 0) || a.r === 1) {
    //   return null;
    // }

    if (a.type === "rect") {
      code += `   <rect x="${numberFixed(a.left)}" y="${numberFixed(
        a.top
      )}"    width="${width}" height="${height}"/> \n`;
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
