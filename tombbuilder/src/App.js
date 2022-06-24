/* eslint-disable react/no-direct-mutation-state */

//library
import ContentLoader from "react-content-loader";
import { LiveProvider, LivePreview } from "react-live";
import { CopyToClipboard } from "react-copy-to-clipboard";

//utils
import { annotationsToCode } from "./utils/annotationsToCode";

//hoooks
import { useEffect, useState, useCallback, useRef } from "react";
import { useAnnotation } from "./hooks/useAnnotation";
import { useContentLoader } from "./hooks/useContentLoader";
import { useAnnotaionToCanvas } from "./components/canvas/hooks/useAnnotationToCanvas/useAnnotationToCanvas";

//Components
import Canvas from "./components/canvas/Canvas";
import CanvasConfiguration from "./components/canvasConfiguration/CanvasConfiguration";
import Editor from "./components/editor/Editor";

//styles
import "./styles/styles.css";

export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation(
    () => {
      try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const base64AnnotationsString = urlSearchParams.get("data");
        if (!base64AnnotationsString) return [];
    
        const stringifiedAnnotations = atob(base64AnnotationsString);
        const parsedAnnotations = JSON.parse(stringifiedAnnotations);
        console.log("parsedAnnotations: ",parsedAnnotations);
        return parsedAnnotations;
      } catch (error) {
        console.error("Got corrupt data");
      } finally {
        return [];
      }
    }
  );


  // const getAnnotationFromUrl = () => {
  //   try {
  //     const urlSearchParams = new URLSearchParams(window.location.search);
  //     const base64AnnotationsString = urlSearchParams.get("data");
  //     if (!base64AnnotationsString) return [];
  
  //     const stringifiedAnnotations = atob(base64AnnotationsString);
  //     const parsedAnnotations = JSON.parse(stringifiedAnnotations);
  
  //     return parsedAnnotations;
  //   } catch (error) {
  //     console.error("Got corrupt data");
  //   } finally {
  //     return [];
  //   }
  // };


  const { updateContentLoader, contentLoaderState } = useContentLoader([]);


  const [code,setCode] = useState(" ");

  useEffect(() => {
    setCode(annotationsToCode(annotation, contentLoaderState));
  }, [annotation, contentLoaderState]);




  const handleShareCode = (event) => {
    event.preventDefault();
    const nextUrl = `http://localhost:3000/?data=${btoa(JSON.stringify(annotation))}`;
    window.history.replaceState({}, "", nextUrl);
  };

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

              <button onClick={handleShareCode}>SHARE</button>

            </div>
            <Editor
              handleAnnotationToCanvas={handleAnnotationToCanvas}
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
      </div>
    </div>
  );
}
