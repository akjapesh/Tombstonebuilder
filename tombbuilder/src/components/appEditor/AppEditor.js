//utils
import { handleShareCode } from "utils/handleShareCode";
import { annotationsToCode } from "utils/annotationsToCode";

import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor from "./editor/Editor";
import { Button,SIZE } from "baseui/button";
import {Input} from "baseui/input"
import {Select} from "baseui/select"
// import { Option } from "baseui/op";
//imports
import {useMutation,useQuery} from "react-query";
import axios from "axios";
import { useState,useEffect } from "react";

const addTombstone=(tombstone)=>{
  return axios.post("http://localhost:4000/tombstone",tombstone);
}
const useAddTombstone=()=>{
  return useMutation(addTombstone);
}
// const fetchTombstone=tombstoneId=>{
//   return axios.get(`http://localhost:4000/tombstone/${tombstoneId}`)
// }
const fetchTombstone=()=>{
return axios.get("http://localhost:4000/tombstone")
}
// const useTombstoneData=(tombstoneId)=>{
//   return useQuery(['tombstone',tombstoneId],()=>fetchTombstone(tombstoneId))
// }
const useTombstoneData=()=>{
  return useQuery('tombstone',fetchTombstone);
}
function AppEditor({
  handleAnnotationToCanvas,
  annotation,
  contentLoaderState,
  updateContentLoader,
  loadContentLoader,
  updateAnnotationHandler
}) {
  const [nameOfTombstone,setNameOfTombstone]=useState("new tombstone");
  const [tombstoneToLoad,setTombstoneToLoad]=useState()
  const {mutate}=useAddTombstone();
  const handleAddTombstone=()=>{
    const tombstone={nameOfTombstone,contentLoaderState,annotation}
    mutate(tombstone);
  }

  const handleLoadTombstone=()=>{
    if(data){
      // console.log("yes");
      const newData=data?.data.filter((e)=>(e.id===Number(tombstoneToLoad)));
      // console.log(newData[0],tombstoneToLoad)
      setNameOfTombstone(newData[0].nameOfTombstone);
      loadContentLoader(newData[0].contentLoaderState);
      updateAnnotationHandler(newData[0].annotation);
    }
    
  }
  // const {isLoading,data,isError,error,refetch}=useTombstoneData(nameOfTombstone);
  const {data}=useTombstoneData();
  // if(data)console.log("data=",data);
  // useEffect(() => {
  //   console.log("data=",data?.data);
  // }, [data?.data]);
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
          <select name="loadAs" value={contentLoaderState.nameOfTombstone} onChange={((e)=>setTombstoneToLoad(e.target.value))}>
            <option>Select Tombstone</option>
            {
              data?.data.map((e,key)=>{
                return <option key={key} value={e.id}>{e.nameOfTombstone} </option>
              })
            }
          </select>
          <Input size="SIZE.compact" name="saveAs" value={nameOfTombstone} onChange={(e)=>setNameOfTombstone(e.target.value)}></Input>
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
