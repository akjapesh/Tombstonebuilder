//libraries
import React from "react";

//component
import ReactCodeEditor from "./reactCodeEditor/ReactCodeEditor";

function Editor({
  annotation,
  contentLoaderState,
  handleAnnotationToCanvas,
  updateContentLoader,
}) {
  return (
    <div>
      <ReactCodeEditor
        updateContentLoader={updateContentLoader}
        handleAnnotationToCanvas={handleAnnotationToCanvas}
        annotation={annotation}
        contentLoaderState={contentLoaderState}
      />
    </div>
  );
}

export default Editor;
