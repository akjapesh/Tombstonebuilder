//libraries

import AceEditor from "react-ace";

//utils

import { codeToAnnotations } from "./utils/codeToAnnotations";
import { formatCode } from "./utils/formatCode";
import { annotationsToCode } from "utils/annotationsToCode";
import { handleCodeToContentLoader } from "./utils/handleCodeToContentLoader";

//hooks

import { useState } from "react";
import { useDebouncedEffect } from "hooks/useDebouncedEffect";

//constants

import { CODE_EDITOR_PROPERTIES } from "./utils/codeEditorProperties";

//styles

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import { ACTION_TYPES } from "hooks/useCanvasSketch";

function ReactCodeEditor({
  updateContentLoader,
  annotation,
  contentLoaderState,
  onCanvasAction,
}) {
  const [code, setCode] = useState("");

  const handleOnChange = (newValue) => {
    // eslint-disable-next-line no-undef
    setCode(newValue);
  };

  const handleOnBlur = () => {
    const formattedValue = formatCode({ code, printWidth: 150 }); //for content Loader
    const newAnnotationArray = codeToAnnotations({ code: formattedValue });

    handleCodeToContentLoader({ code: formattedValue, updateContentLoader });
    onCanvasAction({
      type: ACTION_TYPES.REDRAW_CANVAS,
      payload: { annotations: newAnnotationArray },
    });
  };

  // This is a derived state
  // Don't sync it via annotation, contentLoaderState
  // Derive it in memo
  useDebouncedEffect(
    () => {
      const codeGenerated =
        annotationsToCode({ annotation, contentLoaderState }) +
        ` \n export default MyLoader`;

      const newCode = formatCode({
        code: codeGenerated,
      });

      setCode(newCode);
    },
    [annotation, formatCode, contentLoaderState],
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
