/* eslint-disable react/no-direct-mutation-state */

//library
import ContentLoader from "react-content-loader";
import { LiveProvider, LivePreview } from "react-live";
import { CopyToClipboard } from "react-copy-to-clipboard";

//utils
import { annotationsToCode } from "./utils/annotationsToCode";

//hooks
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
  const { updateAnnotationHandler, annotation } = useAnnotation([]);

  const SharedAnotation = () => {
    // const sharedCode = JSON.parse(atob(window.location.href.substring(22)));

    try {
      const currentURL = window.location.href.substring(22);
      console.log("CurrentURL: ", currentURL);
      if (!currentURL.length) {
        console.log("hiii");
        return [];
      }

      console.log("ookkkkk");
      const base64toAnnotation = atob(currentURL);
      console.log(base64toAnnotation);
      const SharedAnnotation = JSON.parse(base64toAnnotation);
      return SharedAnnotation;
    } catch (error) {
      return [];
    }
  };

  const { updateContentLoader, contentLoaderState } = useContentLoader([]);

  const [code, setCode] = useState(" ");

  useEffect(() => {
    setCode(annotationsToCode(annotation, contentLoaderState));
  }, [annotation, contentLoaderState]);

  // const sharedCode = JSON.parse(atob(window.location.href.substring(22)));

  const handleShareCode = (event) => {
    event.preventDefault();
    const nextUrl = `http://localhost:3000/?data=${btoa(
      JSON.stringify(annotation)
    )}`;
    window.history.replaceState({}, "", nextUrl);
  };

  const currentURL = window.location.href.substring(22);

  const [sketchRef, setSketchRef] = useState(null);

  const handleUpdateSketchRef = useCallback((newRef) => {
    setSketchRef(newRef);
  }, []);

  const { handleAnnotationToCanvas } = useAnnotaionToCanvas(sketchRef);

  useEffect(() => {
    updateAnnotationHandler(SharedAnotation());
  }, []);
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

              <button onClick={handleShareCode}>SHARE</button>
              {currentURL.length && (
                <button
                  onClick={() => {
                    updateAnnotationHandler(SharedAnotation);
                  }}
                >
                  Use shared Code
                </button>
              )}
            </div>
            <Editor
              updateAnnotationHandler={updateAnnotationHandler}
              annotation={annotation}
              contentLoaderState={contentLoaderState}
            />
            <div className="app-editor__language-selector">
              <CopyToClipboard
                text={code}
                onCopy={() => {
                  alert("Code Copied");
                }}
              >
                <span className="copy-to-clipboard">Copy to clipboard</span>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        <div>
          <LiveProvider noInline={true} scope={{ ContentLoader }} code={code}>
            <Canvas
              updateAnnotationHandler={updateAnnotationHandler}
              contentLoaderState={contentLoaderState}
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
      </div>
    </div>
  );
}