//library

import ContentLoader from "react-content-loader";
import { LiveProvider, LivePreview } from "react-live";

//Components
import Canvas from "./canvas/Canvas";
import CanvasConfiguration from "./canvasConfiguration/CanvasConfiguration";

function AppCanvas({
  code,
  updateAnnotationHandler,
  contentLoaderState,
  handleUpdateSketchRef,
  updateContentLoader,
}) {
  return (
    <div>
      <LiveProvider noInline={true} scope={{ ContentLoader }} code={code}>
        <Canvas
          updateAnnotationHandler={updateAnnotationHandler}
          contentLoaderState={contentLoaderState}
          handleUpdateSketchRef={handleUpdateSketchRef}
        >
          <div className="wrapper_div">
            <LivePreview
              style={{
                width: `${contentLoaderState.width}px`,
                height: `${contentLoaderState.height}px`,
              }}
            />
          </div>
        </Canvas>
      </LiveProvider>
      <CanvasConfiguration
        updateContentLoader={updateContentLoader}
        contentLoaderState={contentLoaderState}
      />
    </div>
  );
}

export default AppCanvas;
