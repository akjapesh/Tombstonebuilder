import CanvasButtons from "./canvasButtons/CanvasButtons";
import CanvasSketchField from "./canvasSketchField/CanvasSketchField";
import classnames from "classnames";
import { styled } from "baseui";

function CanvasSketchPad({
  children,
  contentLoaderState,
  sketchRef,
  tool,
  handleToolChange,
  handleCanvasActions,
  activeItemCoords,
  handleItemActions,
  handleKeyDown,
}) {
  const ScaledDiv = styled('div', ({$theme}) => ({
    color: $theme.colors.accent,
    
    ":before":{
       width:"600px",
       height:"500px",}
  }));
  return (
    <ScaledDiv
    // <div
      className={classnames("app-canvas", {
        "app-canvas__draw": tool === "rectangle" || tool === "circle",
        "app-canvas__grid-visibility-off": !contentLoaderState.gridVisibility,
      })}
      key="canvas"
      style={{
        "::before": {
          width: contentLoaderState.width,
          height: contentLoaderState.height,
        },
      }}
    >Hello world
      {children}

      <CanvasSketchField
        contentLoaderState={contentLoaderState}
        tool={tool}
        sketchRef={sketchRef}
      />
      <CanvasButtons
        tool={tool}
        handleToolChange={handleToolChange}
        handleItemActions={handleItemActions}
        handleCanvasActions={handleCanvasActions}
        activeItemCoords={activeItemCoords}
        handleKeyDown={handleKeyDown}
      />
      {/* </div> */}
    </ScaledDiv>
  );
}

export default CanvasSketchPad;
