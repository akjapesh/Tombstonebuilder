/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Button } from "baseui/button";
// import { Input } from "baseui/input";
import { numberFixed } from "../../../utils/handleFixingNumbers";
import trashIcon from "../../../assets/trash.svg";
import cloneIcon from "../../../assets/clone.svg";

function CanvasItemConfiguration({
  handleRemoveItemFromKeyboard,
  handleCloneItem,
  activeItemCoords,
  handleMoveItem,
  handleKeyDown,
}) {
  const disableKeyEvents = () => {
    document.removeEventListener("keydown", handleKeyDown, false);
    // console.log(activeItemCoords);
  };

  return (
    <div className="app-editor_item-editor">
      <p className="app-config_caption">Size & position of active item</p>
      <div className="row ">

        <span>
          <Button className="app-handler__trash" onClick={handleRemoveItemFromKeyboard}><img src={trashIcon} alt="remove item" /></Button>
          <Button className="app-handler__clone" onClick={handleCloneItem}><img src={cloneIcon} alt="clone tool" /></Button>
        </span>
        {Object.keys(activeItemCoords)
          .filter((e) => e!== 'type' && e !== undefined)
          .map((item) => {
            let value = numberFixed(activeItemCoords[item]);
            
            const onChange = (e) => {                                       //  changed as we have to convert cx,cy into left right
              const maxLimit = 1000;                                        //  hard coded maxLIMIT
              let NEW_VALUE = e.target.value;
              if(item ==='cx')
              {
                item = 'left';
                NEW_VALUE = Number(e.target.value - activeItemCoords['radius']);
              }
              else if(item ==='cy')
              {
                item='top';
                NEW_VALUE = Number(e.target.value - activeItemCoords['radius']);
              }

              NEW_VALUE = Math.max(NEW_VALUE-e.target.value,Math.min(maxLimit,NEW_VALUE));
              handleMoveItem(item,NEW_VALUE);
            };

            if(activeItemCoords['type']==='circle' && item!=='radius')     //  changed as we have to convert cx,cy into left right
            {
              if(item==='left'){
              item = 'cx';
              }
              else if(item==='top'){
              item = 'cy';
              }
              value= value + Number(activeItemCoords['radius']);
            }

            return (
              <p className="app-config_inline" key={item}>
                <label>{item}</label>
                <input
                  type="number"
                  onChange={onChange}
                  value={value}
                  onKeyDown={disableKeyEvents}
                />
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default CanvasItemConfiguration;