import React from "react";
import { Button } from "baseui/button";
// import { Input } from "baseui/input";
import { numberFixed } from "../../../utils/handleFixingNumbers";
function CanvasItemConfiguration({
  handleRemoveItemFromKeyboard,
  handleCloneItem,
  activeItemCoords,
  handleMoveItem,
}) {
  return (
    <div className="app-editor_item-editor">
      <p className="app-config_caption">Size & position of active item</p>
      <div className="row">
        {/* <button disabled={!activeItemCoords.activeItemCoords} onClick={handleRemoveItemFromKeyboard}>DELETE</button> */}

        <span>
          <Button onClick={handleRemoveItemFromKeyboard}>Delete</Button>
          <Button onClick={handleCloneItem}>copy</Button>
        </span>

        {Object.keys(activeItemCoords.activeItemCoords)
          .filter((e) => e !== "type" && e !== undefined)
          .map((item) => {
            const value = numberFixed(activeItemCoords.activeItemCoords[item]);
            const onChange = (e) => {
              handleMoveItem(item, numberFixed(Number(e.target.value)));
            };
            return (
              <p className="app-config_inline" key={item}>
                <label>{item}</label>
                <input type="number" onChange={onChange} value={value} />
              </p>
            );
          })}
      </div>
    </div>
  );
}

export default CanvasItemConfiguration;
