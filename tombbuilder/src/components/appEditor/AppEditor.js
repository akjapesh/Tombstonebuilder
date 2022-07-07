//utils
import { handleShareCode } from "utils/handleShareCode";
import { annotationsToCode } from "utils/annotationsToCode";

//Components
import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor from "./editor/Editor";
import { Button } from "baseui/button";

function AppEditor({
  handleAnnotationToCanvas,
  annotation,
  contentLoaderState,
  updateContentLoader,
}) {
  return (
    <div className="app-column">
      <div className="app-editor">
        <div className="app-mode">
          <Button className="active">Editor</Button>
          <Button
            onClick={(e) => {
              handleShareCode(e, { annotation, contentLoaderState });
              alert("code copied");
            }}
          >
            Share
          </Button>
          <Button>
            <a href={window.location.origin} style={{ color: "#aaaaaa" }}>
              <span>Reset</span>
            </a>
          </Button>
        </div>
        <Editor
          handleAnnotationToCanvas={handleAnnotationToCanvas}
          annotation={annotation}
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
