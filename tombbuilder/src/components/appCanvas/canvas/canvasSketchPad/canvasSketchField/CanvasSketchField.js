import React from "react";
import SketchField from "third-parts/react-sketch/src/SketchField";

// It shouldn't know that there is a ContentLoader being rendered
// It should just get width and height in props
function CanvasSketchField({ contentLoaderState, tool, sketchRef }) {
  return (
    <SketchField
      width={contentLoaderState.width}
      height={contentLoaderState.height}
      tool={tool}
      lineWidth={0}
      color="black"
      ref={sketchRef}
    />
  );
}

export default CanvasSketchField;
