import React from "react";
import SketchField from "../../../third-parts/react-sketch/src/SketchField";

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
