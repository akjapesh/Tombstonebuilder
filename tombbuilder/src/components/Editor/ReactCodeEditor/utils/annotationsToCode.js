export const annotationsToCode = (annotationArray) => {
  let code = "";
  annotationArray.forEach((a) => {
    console.log(a);
    const height = a.height;
    const width = a.width;
    // if ((height === 0 && width === 0) || a.r === 1) {
    //   return null;
    // }

    if (a.type === "rect") {
      console.log("box", a);
      code += `    <rect x="${a.left}" y="${a.top}"    width="${width}" height="${height}"/> \n`;
    } else if (a.type === "circle") {
      code += `    <circle cx="${a.left + a.radius}" cy="${
        a.top + a.radius
      }" r="${a.radius}" /> \n`;
    }
  });
  console.log(code);
  return code.trimRight();
};
