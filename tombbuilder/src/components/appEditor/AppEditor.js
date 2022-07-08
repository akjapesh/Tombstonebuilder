//utils
import { handleShareCode } from "utils/handleShareCode";
import { annotationsToCode } from "utils/annotationsToCode";

//Components
import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor from "./editor/Editor";
import { Button } from "baseui/button";
import { useState } from "react";


function AppEditor({
  handleAnnotationToCanvas,
  annotation,
  contentLoaderState,
  handleUpdateSketchRef,
  updateContentLoader,
}) {
  // const [localName,setLocalName] = useState(null);
  return (
    <div className="app-column">
      <div className="app-editor">
        <div className="app-mode">
          <Button className="active">Editor</Button>

          <CopyToClipboard
            text={`${window.location.origin}/?data=${btoa(
              JSON.stringify(annotation)
            )}&canvas=${btoa(JSON.stringify(contentLoaderState))}`}
            onCopy={() => {
              alert("Link Copied");
            }}
          >
            <Button
              onClick={(e) =>
                handleShareCode(e, { annotation, contentLoaderState })
              }
            >
              Share
            </Button>
          </CopyToClipboard>
          <Button>
            <a href={window.location.origin} style={{ color: "#aaaaaa" }}>
              <span>Reset</span>
            </a>
          </Button>
          <CopyToClipboard
            text={
              annotationsToCode({ annotation, contentLoaderState }) +
              `\n render(<MyLoader/>)`
            }
            onCopy={() => {
              alert("Code Copied");
            }}
          >
            <span className="copy-to-clipboard">Copy to clipboard</span>
          </CopyToClipboard>
        </div>
        <Editor
          handleAnnotationToCanvas={handleAnnotationToCanvas}
          annotation={annotation}
          contentLoaderState={contentLoaderState}
          updateContentLoader={updateContentLoader}
        />
        <div className="app-editor__language-selector">
          {/* <input onChange={
            (e)=>{setLocalName(e.target.value)}
            }></input> */}
        <button onClick={
            ()=>{
              // localStorage.setItem('current_name',JSON.stringify(localName));
              localStorage.setItem('annotation', JSON.stringify(annotation));
              localStorage.setItem('codeContentLoader',JSON.stringify(contentLoaderState));
          }} id="save-to-local">
            Save to Local
          </button>
          <button id="revert" onClick={
            ()=>{
            handleUpdateSketchRef(null);
            }
          }>
            Revert
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default AppEditor;
