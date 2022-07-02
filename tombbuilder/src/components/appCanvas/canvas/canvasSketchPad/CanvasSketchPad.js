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
  // Remove this unused code
  const ScaledDiv = styled("div", () => ({
    color: "red",

    ":before": {
      width: `${contentLoaderState.width}px`,
      height: `${contentLoaderState.height}px`,
    },
  }));
  return (
    // <ScaledDiv
    <div
      className={classnames("app-canvas", {
        "app-canvas__draw": tool === "rectangle" || tool === "circle",
        "app-canvas__grid-visibility-off": !contentLoaderState.gridVisibility,
      })}
      key="canvas"
      style={{
        "&:before": {
          width: `${contentLoaderState.width}px`,
          height: `${contentLoaderState.height}px`,
        },
      }}
    >
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
    </div>
    // {/* </ScaledDiv> */}
  );
}

export default CanvasSketchPad;
