import CanvasButtons from "../canvasButtons/CanvasButtons";
import CanvasSketchField from "../canvasSketchField/CanvasSketchField";
import classnames from "classnames";

function CanvasSketchPad({
  children,
  contentLoaderState,
  sketchRef,
  tool,
  handleToolChange,
  handleRemoveItemFromKeyboard,
  handleCloneItem,
  activeItemCoords,
  handleMoveItem,
  handleKeyDown,
}) {
  return (
    <div
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
        handleRemoveItemFromKeyboard={handleRemoveItemFromKeyboard}
        handleCloneItem={handleCloneItem}
        activeItemCoords={activeItemCoords}
        handleMoveItem={handleMoveItem}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default CanvasSketchPad;
