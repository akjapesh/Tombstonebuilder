import React from "react";
import ReactCodeEditor from "./ReactCodeEditor/ReactCodeEditor";

function Editor({ annotation, contentLoaderState }) {
  
  return (
    <div>
      <ReactCodeEditor
        annotation={annotation}
        contentLoaderState={contentLoaderState}
      />
    </div>
  );
}

export default Editor;