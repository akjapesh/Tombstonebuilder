//libraries
import React from "react";

//component
import ReactCodeEditor from "./ReactCodeEditor/ReactCodeEditor";

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
