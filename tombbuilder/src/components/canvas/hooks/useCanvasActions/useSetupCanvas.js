import { useEffect } from "react";
import tools from "../../../../third-parts/react-sketch/src/tools";
import { fabric } from "fabric";
import { numberFixed } from "../../../../utils/handleFixingNumbers";
import { SHIFTING_BY_OFFSET } from "../useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";
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
      // center.centerY=numberFixed(numberFixed(target.top) - (numberFixed(target.top) % SHIFTING_BY_OFFSET)+(numberFixed(target.height) - (numberFixed(target.height) % SHIFTING_BY_OFFSET))/2);
      // center.centerX=numberFixed(numberFixed(target.left) - (numberFixed(target.left) % SHIFTING_BY_OFFSET)+(numberFixed(target.width) - (numberFixed(target.width) % SHIFTING_BY_OFFSET))/2);
      const newtop=numberFixed(target.top)-numberFixed(target.top)%SHIFTING_BY_OFFSET;
      const newleft=numberFixed(target.left)-numberFixed(target.left)%SHIFTING_BY_OFFSET;
      const newheight=numberFixed(target.height)-numberFixed(target.height)%SHIFTING_BY_OFFSET;
      const newwidth=numberFixed(target.width)-numberFixed(target.width)%SHIFTING_BY_OFFSET;
      center.centerY=newtop+newheight/2;
      center.centerX=newleft+newwidth/2;
      center.centerX=numberFixed(center.centerX)-numberFixed(center.centerX)%SHIFTING_BY_OFFSET;

      center.centerY=numberFixed(center.centerY)-numberFixed(center.centerY)%SHIFTING_BY_OFFSET;
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
        updateAnnotationHandler([...sketchRef.current._fc.toJSON().objects]);
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