import React from "react";
import ReactCodeEditor from "./reactCodeEditor/ReactCodeEditor";

function Editor({ annotation, contentLoaderState, updateAnnotationHandler }) {
  return (
    <div>
      <ReactCodeEditor
        updateAnnotationHandler={updateAnnotationHandler}
        annotation={annotation}
        contentLoaderState={contentLoaderState}
      />
    </div>
  );
}

export default Editor;
