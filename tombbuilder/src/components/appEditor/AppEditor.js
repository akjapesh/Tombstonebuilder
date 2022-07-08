//utils
import { handleShareCode } from "utils/handleShareCode";
import { annotationsToCode } from "utils/annotationsToCode";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor from "./editor/Editor";
import { Button,SIZE } from "baseui/button";
import {Input} from "baseui/input"
import {Select} from "baseui/select"
import { useSaveTombstone } from "./editor/reactCodeEditor/hooks/useSaveTombstone";
import { useLoadTombstone } from "./editor/reactCodeEditor/hooks/useLoadTombstone";
//imports
import { useState,useEffect } from "react";



function AppEditor({
  handleAnnotationToCanvas,
  annotation,
  contentLoaderState,
  updateContentLoader,
  resetContentLoader,
  updateAnnotationHandler
}) {
  const [tombstoneName,settombstoneName]=useState("new tombstone");
  const [tombstoneToLoad,setTombstoneToLoad]=useState()
  const {mutate}=useSaveTombstone();

  const handleAddTombstone=()=>{
    const tombstone={tombstoneName,contentLoaderState,annotation}
    mutate(tombstone);
    alert(`"${tombstoneName}" saved successfully!! `)
  }

  const handleLoadTombstone=()=>{
    if(data){
      const newData=data?.data.filter((e)=>(e.id===Number(tombstoneToLoad)));
      settombstoneName(newData[0].tombstoneName);
      resetContentLoader(newData[0].contentLoaderState);
      updateAnnotationHandler(newData[0].annotation);
      handleAnnotationToCanvas(newData[0].annotation);
    }
    
  }
  const {data}=useLoadTombstone();
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
          <Button onClick={handleAddTombstone}>
            Save
          </Button>
          <Button onClick={handleLoadTombstone}>
            Load
          </Button>
          <select name="loadAs" value={contentLoaderState.tombstoneName} onChange={((e)=>setTombstoneToLoad(e.target.value))}>
            <option>Select Tombstone</option>
            {
              data?.data.map((e,key)=>{
                return <option key={key} value={e.id}>{e.tombstoneName} </option>
              })
            }
          </select>
          <Input size="SIZE.compact" name="saveAs" value={tombstoneName} onChange={(e)=>settombstoneName(e.target.value)}></Input>
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
