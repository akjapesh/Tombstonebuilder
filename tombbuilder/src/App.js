/* eslint-disable react/no-direct-mutation-state */

//utils

import { handleShareCodeAnnotation } from "utils/handleSharedCodeAnnotation";
import { handleShareCodeContentLoaderState } from "utils/handleSharedCodeContentLoader";

//hooks
import { useState, useCallback } from "react";
import { useAnnotation } from "./hooks/useAnnotation";
import { useContentLoader } from "./hooks/useContentLoader";
import { useAnnotationToCanvas } from "./components/appCanvas/canvas/hooks/useAnnotationToCanvas/useAnnotationToCanvas";

//Components
import AppEditor from "./components/appEditor/AppEditor";
import AppCanvas from "./components/appCanvas/AppCanvas";
import Header from "./components/header/Header";
import { SnackbarProvider } from "baseui/snackbar";
//styles
import "./styles/styles.css";

export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation();

  const { updateContentLoader, contentLoaderState, resetContentLoader } =
    useContentLoader([]);

  const [sketchRef, setSketchRef] = useState(null);

  const { handleAnnotationToCanvas } = useAnnotationToCanvas({ sketchRef });

  const handleUpdateSketchRef = useCallback(
    async (newRef) => {
      setSketchRef(newRef);

      const initialValue = await handleShareCodeAnnotation();
      handleAnnotationToCanvas(initialValue);
      const initialLoaderState = await handleShareCodeContentLoaderState();

      resetContentLoader(initialLoaderState);
    },
    [handleAnnotationToCanvas, resetContentLoader]
  );

  return (
    <SnackbarProvider>
      <div className="App">
        <div className="container">
          <Header />
          <AppEditor
            handleAnnotationToCanvas={handleAnnotationToCanvas}
            annotation={annotation}
            contentLoaderState={contentLoaderState}
            updateContentLoader={updateContentLoader}
          />
          <AppCanvas
            annotation={annotation}
            updateAnnotationHandler={updateAnnotationHandler}
            contentLoaderState={contentLoaderState}
            handleUpdateSketchRef={handleUpdateSketchRef}
            updateContentLoader={updateContentLoader}
          />
        </div>
      </div>
    </SnackbarProvider>
  );
}
