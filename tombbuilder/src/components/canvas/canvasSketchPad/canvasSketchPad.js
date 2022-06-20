import CanvasButtons from "../canvasButtons/CanvasButtons";
import CanvasSketchField from "../CanvasSketchField/CanvasSketchField";
import classnames from "classnames";

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
    
      <div className={classnames('app-canvas', {
            'app-canvas__draw': tool === 'rectangle' || tool === 'circle',
            'app-canvas__grid-visibility-off': !contentLoaderState.gridVisibility,
          })} key="canvas">
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
    
  );
}

export default CanvasSketchPad;