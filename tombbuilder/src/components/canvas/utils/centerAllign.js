
import { fabric } from "fabric";
import { numberFixed } from "../../../utils/handleFixingNumbers";
import { SHIFTING_BY_OFFSET } from "../hooks/useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";


export const centerAllign=(sketchRef)=>{

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
    
    return center;
  }


  const clearCenterAllignLines=()=>{
    sketchRef.current._fc._objects.forEach((o)=>{
      if(o.type==="line"){
        sketchRef.current._fc.remove(o);
      }
    });
  
  
  }


  const connectCenterAllignLine=(target)=>{
    clearCenterAllignLines();
    const center=calculateCenter(target);
    sketchRef.current._fc._objects.forEach(o => {
      if(o!==target){
      const prCenter=calculateCenter(o);
      if(center.centerX===prCenter.centerX){
        sketchRef.current._fc.add(new fabric.Line([center.centerX,center.centerY,prCenter.centerX,prCenter.centerY],{stroke:"red",}));
        // console.log("----------Y line---------",center,prCenter);
      }
      else if(center.centerY===prCenter.centerY){
        sketchRef.current._fc.add(new fabric.Line([center.centerX,center.centerY,prCenter.centerX,prCenter.centerY],{stroke:"red"}));
        // console.log("---------X line----------",center,prCenter);
      }
    }
    });
  
  }

  return {
    clearCenterAllignLines,
    connectCenterAllignLine,
  };
}