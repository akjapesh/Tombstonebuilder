import { useEffect } from "react";
import tools from "../../../../third-parts/react-sketch/src/tools";
import { fabric } from "fabric";
import { numberFixed } from "../../../../utils/handleFixingNumbers";
export const useSetupCanvas = (
  sketchRef,
  updateAnnotationHandler,
  setCoords,
  handleAddItemInCanvas,
  resetActiveItemhandler,
  handleKeyDown,
  handleToolChange
) => {
  const calculateCenter=(target)=>{
    const center={centerX:0,centerY:0};
      center.centerY=numberFixed(target.top+target.height/2);
      center.centerX=numberFixed(target.left+target.width/2);
    
    
    // console.log(target.type,center);
    return center;
  }
  const clearLines=()=>{
    sketchRef.current._fc._objects.forEach((o)=>{
      if(o.type==="line"){
        sketchRef.current._fc.remove(o);
      }
    });
  
  
  }
  const connectLines=(target)=>{
    clearLines();
    const center=calculateCenter(target);
    sketchRef.current._fc._objects.forEach(o => {
      if(o!==target){
      const prCenter=calculateCenter(o);
      // console.log(target.type,center,prCenter);
      if(center.centerX===prCenter.centerX){
        sketchRef.current._fc.add(new fabric.Line([center.centerX,center.centerY,prCenter.centerX,prCenter.centerY],{stroke:"red",}));
        console.log("----------Y line---------",center,prCenter);
      }
      else if(center.centerY===prCenter.centerY){
        sketchRef.current._fc.add(new fabric.Line([center.centerX,center.centerY,prCenter.centerX,prCenter.centerY],{stroke:"red"}));
        console.log("---------X line----------",center,prCenter);
      }
    }
    });
  
  }

  useEffect(() => {
    sketchRef.current._fc.on({
      "mouse:up": () => {
        handleToolChange(tools.Select);
      },
      "after:render": () => {
        updateAnnotationHandler([...sketchRef.current._fc._objects]);
      },
      "selection:created": (item) => {
        // console.log("item: ",item);
        setCoords(item.selected[0]);
        item.target = handleAddItemInCanvas(item.target);
      },
      "selection:updated": (item) => {
        // console.log("item: ",item);
        setCoords(item.selected[0]);
      },
      "selection:cleared": () => {
        resetActiveItemhandler();
        clearLines();
      },
      "object:modified": (item) => {
        setCoords(item.target);
        updateAnnotationHandler([...sketchRef.current._fc._objects]);
      },
      "object:added": (item) =>
        (item.target = handleAddItemInCanvas(item.target)),
      "object:moving": (item) =>{
        (item.target = handleAddItemInCanvas(item.target));
        connectLines(item.target);
        // console.log("------moving-------",calculateCenter(item.target));
        
      },
    });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, false);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [handleKeyDown]);
};