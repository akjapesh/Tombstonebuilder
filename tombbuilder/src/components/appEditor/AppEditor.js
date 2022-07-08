//utils
import { handleShareCode } from "utils/handleShareCode";
import { annotationsToCode } from "utils/annotationsToCode";

//Components
import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor from "./editor/Editor";
import { Button } from "baseui/button";
import Check from "baseui/icon/check";
import DeleteAlt from "baseui/icon/delete-alt";
import { useSnackbar } from "baseui/snackbar";
//styles

function AppEditor({
  handleAnnotationToCanvas,
  annotation,
  contentLoaderState,
  updateContentLoader,
}) {
  const { enqueue } = useSnackbar();

  return (
    <div className="app-column">
      <div className="app-editor">
        <div className="app-mode">
          <Button className="active">Editor</Button>

          <Button
            onClick={async (e) => {
              const res = await handleShareCode(e, {
                annotation,
                contentLoaderState,
              });
              enqueue({
                message: `${res}`,
                startEnhancer: ({ size }) => {
                  if (res === "Copied to clipboard")
                    return <Check size={size} />;
                  else return <DeleteAlt size={size} />;
                },
              });
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
