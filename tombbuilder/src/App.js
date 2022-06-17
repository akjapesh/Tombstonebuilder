import "./styles/styles.css";
import Canvas from "./components/Canvas";
import Editor from "./components/Editor/Editor";
import { useAnnotation } from "./hooks/useAnnotation";
import ContentLoader from "react-content-loader";
import { useContentLoader } from "./hooks/useContentLoader";
import Config from "./components/Config";
import { annotationsToCode } from "./utils/annotationsToCode";
import { LiveProvider, LivePreview } from "react-live";
import { useEffect, useState } from "react";
export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation();
  const { updateContentLoader, contentLoaderState } = useContentLoader();
  const [code, setCode] = useState("");
  useEffect(() => {
    setCode(annotationsToCode(annotation, contentLoaderState));
  }, [annotation, contentLoaderState]);
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
          <Config
            updateContentLoader={updateContentLoader}
            contentLoaderState={contentLoaderState}
          />
        </div>
      </div>
    </div>
  );
}
