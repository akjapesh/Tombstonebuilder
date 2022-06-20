//libraries
import React from "react";

//component
import ReactCodeEditor from "./ReactCodeEditor/ReactCodeEditor";

function Editor({ annotation, contentLoaderState, handleAnnotationToCanvas }) {
  return (
    <div>
      <ReactCodeEditor
        handleAnnotationToCanvas={handleAnnotationToCanvas}
        annotation={annotation}
        contentLoaderState={contentLoaderState}
      />
    </div>
  );
}

export default Editor;
