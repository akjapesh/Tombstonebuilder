//library

import ContentLoader from "react-content-loader";
import { LiveProvider, LivePreview } from "react-live";

//hooks
import { useState, useEffect } from "react";

//utils
import { annotationsToCode } from "utils/annotationsToCode";

//Components

import Canvas from "./canvas/Canvas";
import CanvasConfiguration from "./canvasConfiguration/CanvasConfiguration";

function AppCanvas({
  updateAnnotationHandler,
  contentLoaderState,
  handleUpdateSketchRef,
  updateContentLoader,
  annotation,
}) {
  const [code, setCode] = useState("");
  useEffect(() => {
    const newLiveCode =
      annotationsToCode({ annotation, contentLoaderState }) +
      `\n render(<MyLoader/>)`;

    setCode(newLiveCode);
  }, [annotation, contentLoaderState]);
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
