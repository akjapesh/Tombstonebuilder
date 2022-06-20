import CanvasButtons from "../canvasButtons/CanvasButtons";
import CanvasSketchField from "../canvasSketchField/CanvasSketchField";

function CanvasSketchPad({
  children,
  contentLoaderState,
  sketchRef,
  tool,
  handleRedo,
  handleUndo,
  handleToolChange,
}) {
  return (
    <div>
      <div className="app-canvas" key="canvas">
        {children}

        <CanvasSketchField
          contentLoaderState={contentLoaderState}
          tool={tool}
          sketchRef={sketchRef}
        />
        <CanvasButtons
          tool={tool}
          sketchRef={sketchRef}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleToolChange={handleToolChange}
        />
      </div>
    </div>
  );
}

export default CanvasSketchPad;
