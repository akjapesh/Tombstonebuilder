import CanvasButtons from "../canvasButtons/CanvasButtons";
import CanvasSketchField from "../canvasSketchField/CanvasSketchField";
import classnames from "classnames";

function CanvasSketchPad({
  children,
  contentLoaderState,
  sketchRef,
  tool,
  handleRedo,
  handleUndo,
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
<<<<<<< HEAD
      key="canvas"
=======
      key="canvas" style={{"::before":{width:contentLoaderState.width,height:contentLoaderState.height}}}
>>>>>>> 15f690f (Merge branch 'abhinav' of https://github.com/akjapesh/Tombstonebuilder into abhinav)
    >
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
<<<<<<< HEAD
        handleRemoveItemFromKeyboard={handleRemoveItemFromKeyboard}
        handleCloneItem={handleCloneItem}
        activeItemCoords={activeItemCoords}
        handleMoveItem={handleMoveItem}
        handleKeyDown={handleKeyDown}
=======
>>>>>>> 15f690f (Merge branch 'abhinav' of https://github.com/akjapesh/Tombstonebuilder into abhinav)
      />
    </div>
  );
}

export default CanvasSketchPad;
