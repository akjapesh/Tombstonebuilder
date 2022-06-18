import { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import { codeToAnnotations } from "./utils/codeToAnnotations";
import { formatCode } from "./utils/formatCode";
import { annotationsToCode } from "../../../utils/annotationsToCode";
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect";

function ReactCodeEditor({
  annotation,
  contentLoaderState,
  updateAnnotationHandler,
}) {
  const [code, setCode] = useState("");
<<<<<<< HEAD
  const onChangeHandler = (newValue) => {
    const formattedValue = formatCode(newValue);
    setCode(formattedValue);
=======

  const handleOnChange = (newValue) => {
    setCode(newValue);
  };
  const handleOnBlur = () => {
    const formattedValue = formatCode(code);
>>>>>>> 6f39a65 (feat(ReactCodeEditor):Code to AnnotationsArray)
    const newAnnotationArray = codeToAnnotations(formattedValue);
    updateAnnotationHandler(newAnnotationArray);
  };
  useDebouncedEffect(
    () => {
      const newCode = formatCode(
        annotationsToCode(annotation, contentLoaderState)
      );
      setCode(newCode);
    },
    [annotation, formatCode],
    200
  );

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
<<<<<<< HEAD
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
=======
        onBlur={handleOnBlur}
        onChange={handleOnChange}
>>>>>>> 6f39a65 (feat(ReactCodeEditor):Code to AnnotationsArray)
      />
    </div>
  );
}

export default ReactCodeEditor;
