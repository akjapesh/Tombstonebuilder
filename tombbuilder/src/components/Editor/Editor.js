import React from "react";
import ReactCodeEditor from "./ReactCodeEditor/ReactCodeEditor";
function Editor({ annotation }) {
  return (
    <div>
      <ReactCodeEditor annotation={annotation} />
    </div>
  );
}

export default Editor;
