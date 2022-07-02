//libraries
import React from "react";

//component
import ReactCodeEditor from "./reactCodeEditor/ReactCodeEditor";

function Editor({
  annotation,
  contentLoaderState,
  onCanvasAction,
  updateContentLoader,
}) {
  return (
    <div>
      <ReactCodeEditor
        updateContentLoader={updateContentLoader}
        annotation={annotation}
        onCanvasAction={onCanvasAction}
        contentLoaderState={contentLoaderState}
      />
    </div>
  );
}

export default Editor;
