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
          <Button
            className="app-handler__trash"
            onClick={handleRemoveItemFromKeyboard}
          >
            <img src={trashIcon} alt="remove item" />
          </Button>
          <Button className="app-handler__clone" onClick={handleCloneItem}>
            <img src={cloneIcon} alt="clone tool" />
          </Button>
        </span>
        {Object.keys(activeItemCoords)
          .filter((e) => e !== "type" && e !== undefined)
          .map((item) => {
            let value = numberFixed(activeItemCoords[item]);
            if(isNaN(value))
              value = 0 ;
    // console.log("activeItemCoords: ",item,value);
            const onChange = (e) => {
              handleMoveItem(item, numberFixed(Number(e.target.value)));
            };
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
