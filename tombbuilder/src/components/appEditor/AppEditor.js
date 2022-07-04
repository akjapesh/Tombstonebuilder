//utils
import { handleShareCode } from "utils/handleShareCode";
import { annotationsToCode } from "utils/annotationsToCode";

//Components
import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor from "./editor/Editor";

function AppEditor({
  onCanvasAction,
  annotation,
  contentLoaderState,
  updateContentLoader,
}) {
  return (
    <div className="app-column">
      <div className="app-editor">
        <div className="app-mode">
          <button className="active">Editor</button>

          <CopyToClipboard
            text={`${window.location.origin}/?data=${btoa(
              JSON.stringify(annotation)
            )}&canvas=${btoa(JSON.stringify(contentLoaderState))}`}
            onCopy={() => {
              alert("Link Copied");
            }}
          >
            <button
              onClick={(e) =>
                handleShareCode(e, { annotation, contentLoaderState })
              }
            >
              Share
            </button>
          </CopyToClipboard>
          <a href={window.location.origin} style={{ color: "#aaaaaa" }}>
            <span>Reset App</span>
          </a>
        </div>
        <Editor
          annotation={annotation}
          onCanvasAction={onCanvasAction}
          contentLoaderState={contentLoaderState}
          updateContentLoader={updateContentLoader}
        />
        <div className="app-editor__language-selector">
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
      </div>
    </div>
  );
}

export default AppEditor;
