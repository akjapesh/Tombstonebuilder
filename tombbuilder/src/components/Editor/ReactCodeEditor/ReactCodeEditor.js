import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import { useState, useEffect } from "react";
import { codeToAnnotations } from "./utils/codeToAnnotations";
import { formatCode } from "./utils/formatCode";
import { annotationsToCode } from "../../../utils/annotationsToCode";
function ReactCodeEditor({ annotation }) {
  const [code, setCode] = useState("");
  const onChangeHandler = (newValue) => {
    const formattedValue = formatCode(newValue);
    setCode(formattedValue);
    const newAnnotationArray = codeToAnnotations(formattedValue);
    console.log(newAnnotationArray);
  };
  useEffect(() => {
    const newCode = formatCode(annotationsToCode(annotation));
    setCode(newCode);
  }, [annotation]);
  return (
    <div>
      <AceEditor
        placeholder="Placeholder Text"
        mode="javascript"
        theme="monokai"
        name="blah2"
        fontSize={15}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        height="400px"
        width="600px"
        onChange={onChangeHandler}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          useWorker: false,
        }}
      />
    </div>
  );
}

export default ReactCodeEditor;
