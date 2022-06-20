import { useState } from "react";
import AceEditor from "react-ace";

//utils

import { codeToAnnotations } from "./utils/codeToAnnotations";
import { formatCode } from "./utils/formatCode";
import { annotationsToCode } from "../../../utils/annotationsToCode";

//hooks

import { useState } from "react";
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect";

//constatnts

import CODE_EDITOR_PROPERTIES from "./utils/codeEditorProperties";

//styles

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import { codeToAnnotations } from "./utils/codeToAnnotations";
import { formatCode } from "./utils/formatCode";
import { annotationsToCode } from "../../../utils/annotationsToCode";
import { useDebouncedEffect } from "../../../hooks/useDebouncedEffect";

function ReactCodeEditor({ annotation, contentLoaderState }) {
  const [code, setCode] = useState("");

  const handleOnChange = (newValue) => {
    // eslint-disable-next-line no-undef
    setCode(newValue);
  };
  const handleOnBlur = () => {
    const formattedValue = formatCode(code);
    const newAnnotationArray = codeToAnnotations(formattedValue);
    // eslint-disable-next-line no-undef
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
        {...CODE_EDITOR_PROPERTIES}
        value={code}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default ReactCodeEditor;