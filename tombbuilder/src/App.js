/* eslint-disable react/no-direct-mutation-state */

//utils
import { annotationsToCode } from "./utils/annotationsToCode";
import { handleShareCodeAnnotation } from "utils/handleSharedCodeAnnotation";
import { handleShareCode } from "utils/handleShareCode";

//hooks
import { useEffect, useState, useCallback } from "react";
import { useAnnotation } from "./hooks/useAnnotation";
import { useContentLoader } from "./hooks/useContentLoader";
import { useAnnotationToCanvas } from "./components/appCanvas/canvas/hooks/useAnnotationToCanvas/useAnnotationToCanvas";

//Components
import AppEditor from "./components/appEditor/AppEditor";
import AppCanvas from "./components/appCanvas/AppCanvas";
import Header from "./components/header/Header";

//styles
import "./styles/styles.css";

export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation();

  const { updateContentLoader, contentLoaderState } = useContentLoader([]);

  const [code, setCode] = useState(" ");

  useEffect(() => {
    const newLiveCode =
      annotationsToCode({ annotation, contentLoaderState }) +
      `\n render(<MyLoader/>)`;
    setCode(newLiveCode);
  }, [annotation, contentLoaderState]);

  const [sketchRef, setSketchRef] = useState(null);
  const { handleAnnotationToCanvas } = useAnnotationToCanvas({ sketchRef });
  const handleUpdateSketchRef = useCallback(
    async (newRef) => {
      setSketchRef(newRef);
      const initialValue = await handleShareCodeAnnotation();
      handleAnnotationToCanvas(initialValue);
    },
    [handleAnnotationToCanvas]
  );

  return (
    <div className="App">
      <div className="container">
        <Header />
        <AppEditor
          handleShareCode={(e) => handleShareCode(e, annotation)}
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
