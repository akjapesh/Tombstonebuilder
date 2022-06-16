import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import { useState, useEffect } from "react";
import { codeToAnnotations } from "./utils/codeToAnnotations";
import { formatCode } from "./utils/formatCode";
import { annotationsToCode } from "./utils/annotationsToCode";
function ReactCodeEditor({ annotation }) {
  // console.log(annotation);
  const [code, setCode] = useState("");
  const onChangeHandler = (newValue) => {
    const formattedValue = formatCode(newValue);
    setCode(formattedValue);
  };
  useEffect(() => {
    const newCode = annotationsToCode(annotation);
    // const formattedValue = formatCode(newCode);
    // setCode(formattedValue);
    setCode(newCode);
  }, [annotation]);
  return (
    <div>
      <AceEditor
        placeholder="Placeholder Text"
        mode="javascript"
        theme="solarized_dark"
        name="blah2"
        fontSize={13}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        height="400px"
        width="600px"
        // onChange={onChangeHandler}
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
