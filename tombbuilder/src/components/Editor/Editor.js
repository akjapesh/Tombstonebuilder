//libraries
import React from "react";

//component
import ReactCodeEditor from "./reactCodeEditor/ReactCodeEditor";

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