//libraries
import React from "react";
import ReactCodeEditor from "./ReactCodeEditor/ReactCodeEditor";

//component
import ReactCodeEditor from "./reactCodeEditor/ReactCodeEditor";

function Editor({ annotation, contentLoaderState, handleAnnotationToCanvas }) {
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
