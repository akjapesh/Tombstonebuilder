//library
import ContentLoader from "react-content-loader";
import { LiveProvider, LivePreview } from "react-live";

//utils
import { annotationsToCode } from "./utils/annotationsToCode";

//hoooks
import { useEffect, useState, useCallback } from "react";
import { useAnnotation } from "./hooks/useAnnotation";
import { useContentLoader } from "./hooks/useContentLoader";
import { useAnnotaionToCanvas } from "./components/canvas/hooks/useAnnotationToCanvas/useAnnotationToCanvas";

//Components
import Canvas from "./components/canvas/Canvas";
import CanvasConfiguration from "./components/canvasConfiguration/CanvasConfiguration";
import Editor from "./components/Editor/Editor";

//styles
import "./styles/styles.css";

export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation();

  const { updateContentLoader, contentLoaderState } = useContentLoader();

  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(annotationsToCode(annotation, contentLoaderState));
  }, [annotation, contentLoaderState]);

  const [sketchRef, setSketchRef] = useState(null);

  const handleUpdateSketchRef = useCallback((newRef) => {
    setSketchRef(newRef);
  }, []);

  const { handleAnnotationToCanvas } = useAnnotaionToCanvas(sketchRef);

  return (
    <div className="App">
      <div className="container">
        <div className="app-header">
          <div className="app-header__logo">
            <h1>
              <strong>TombStone builder</strong>
            </h1>
            <h2>Build your custom content loader</h2>
          </div>
          <div className="app-header__aside"></div>
        </div>
        <div className="app-column">
          <div className="app-editor">
            <div className="app-mode">
              <button className="active">Editor</button>
            </div>
            <Editor
              handleAnnotationToCanvas={handleAnnotationToCanvas}
              annotation={annotation}
              contentLoaderState={contentLoaderState}
            />
            <div className="app-editor__language-selector">
              <button className="app-editor__language-button current">
                <span>React</span>
              </button>
            </div>
          </div>
        </div>
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
          {/* <Canvas updateAnnotationHandler={updateAnnotationHandler} contentLoaderState={contentLoaderState}/> */}
          <CanvasConfiguration
            updateContentLoader={updateContentLoader}
            contentLoaderState={contentLoaderState}
          />
        </div>
      </div>
    </div>
  );
}
