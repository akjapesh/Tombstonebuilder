/* eslint-disable react/no-direct-mutation-state */

//utils
import { annotationsToCode } from "./utils/annotationsToCode";

//hooks
import { useEffect, useState, useCallback } from "react";
import { useAnnotation } from "./hooks/useAnnotation";
import { useContentLoader } from "./hooks/useContentLoader";
import { useAnnotaionToCanvas } from "./components/canvas/hooks/useAnnotationToCanvas/useAnnotationToCanvas";

//Components
import AppEditor from "./components/appEditor/AppEditor";
import AppCanvas from "./components/appCanvas/AppCanvas";
import Header from "./components/header/Header";

//styles
import "./styles/styles.css";

export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation(() => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const base64AnnotationsString = urlSearchParams.get("data");
      if (!base64AnnotationsString) return [];

      const stringifiedAnnotations = atob(base64AnnotationsString);
      const parsedAnnotations = JSON.parse(stringifiedAnnotations);
      console.log("parsedAnnotations: ", parsedAnnotations);
      return parsedAnnotations;
    } catch (error) {
      console.error("Got corrupt data");
    } finally {
      return [];
    }
  });

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

  const [code, setCode] = useState(" ");

  useEffect(() => {
    const newLiveCode =
      annotationsToCode({ annotation, contentLoaderState }) +
      `\n render(<MyLoader/>)`;
    setCode(newLiveCode);
  }, [annotation, contentLoaderState]);

  const handleShareCode = (event) => {
    event.preventDefault();
    const nextUrl = `http://localhost:3000/?data=${btoa(
      JSON.stringify(annotation)
    )}`;
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
        <Header />
        <AppEditor
          handleShareCode={handleShareCode}
          handleAnnotationToCanvas={handleAnnotationToCanvas}
          annotation={annotation}
          contentLoaderState={contentLoaderState}
          code={code}
        />
        <AppCanvas
          code={code}
          updateAnnotationHandler={updateAnnotationHandler}
          contentLoaderState={contentLoaderState}
          handleUpdateSketchRef={handleUpdateSketchRef}
          updateContentLoader={updateContentLoader}
        />
      </div>
    </div>
  );
}
