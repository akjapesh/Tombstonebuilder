import "./styles/styles.css";
import Canvas from "./components/Canvas";
import Editor from "./components/Editor/Editor";
import { useAnnotation } from "./hooks/useAnnotation";
import { useEffect } from "react";

export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation();
  return (
    <div className="App">
      <div className="container">
        <div className="app-header">
          <div className="app-header__logo">
            <h1>
              <strong>Tomb stone builder</strong>
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
            <Editor annotation={annotation} />
            <div className="app-editor__language-selector">
              <button className="app-editor__language-button current">
                <span>React</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <Canvas updateAnnotationHandler={updateAnnotationHandler} />
        </div>
      </div>
    </div>
  );
}
