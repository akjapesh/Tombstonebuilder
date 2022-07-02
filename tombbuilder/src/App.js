/* eslint-disable react/no-direct-mutation-state */

import { useEffect } from "react";

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

//styles
import "./styles/styles.css";
import {
  useCanvasSketch,
  ACTION_TYPES as CANVAS_ACTION_TYPES,
} from "hooks/useCanvasSketch";

export default function App() {
  const { updateAnnotationHandler, annotation } = useAnnotation();

  const { updateContentLoader, contentLoaderState, resetContentLoader } =
    // Unnecessary argument
    useContentLoader([]);

  const { sketchRef, onAction: onCanvasAction } = useCanvasSketch();

  useEffect(async () => {
    if (!sketchRef) return;

    const initialAnnotations = await handleShareCodeAnnotation();
    onCanvasAction({
      type: CANVAS_ACTION_TYPES.REDRAW_CANVAS,
      payload: { annotations: initialAnnotations },
    });

    const initialLoaderState = await handleShareCodeContentLoaderState();
    resetContentLoader(initialLoaderState);
  }, [sketchRef, onCanvasAction, resetContentLoader]);

  return (
    <div className="App">
      <div className="container">
        <Header />
        <AppEditor
          annotation={annotation}
          onCanvasAction={onCanvasAction}
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
  );
}
