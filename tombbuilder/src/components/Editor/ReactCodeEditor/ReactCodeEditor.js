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

  const handleOnChange = (newValue) => {
    setCode(newValue);
  };
  const handleOnBlur = () => {
    const formattedValue = formatCode(code);
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
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default ReactCodeEditor;
