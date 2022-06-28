//Components
import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor from "./editor/Editor";

function AppEditor({
  handleShareCode,
  handleAnnotationToCanvas,
  annotation,
  contentLoaderState,
  updateContentLoader,
  code,
}) {
  return (
    <div className="app-column">
      <div className="app-editor">
        <div className="app-mode">
          <button className="active">Editor</button>

          <button onClick={handleShareCode}>Share</button>
        </div>
        <Editor
          handleAnnotationToCanvas={handleAnnotationToCanvas}
          annotation={annotation}
          contentLoaderState={contentLoaderState}
          updateContentLoader={updateContentLoader}
        />
        <div className="app-editor__language-selector">
          <CopyToClipboard
            text={code}
            onCopy={() => {
              alert("Code Copied");
            }}
          >
            <span className="copy-to-clipboard">Copy to clipboard</span>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
}

export default AppEditor;
