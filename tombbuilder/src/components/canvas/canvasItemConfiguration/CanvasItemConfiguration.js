/* eslint-disable react/no-direct-mutation-state */
import React from "react";
import { Button } from "baseui/button";
// import { Input } from "baseui/input";
import { numberFixed } from "../../../utils/handleFixingNumbers";
function CanvasItemConfiguration({
  handleRemoveItemFromKeyboard,
  handleCloneItem,
  activeItemCoords,
  handleMoveItem,
  handleKeyDown,
}) {
  const disableKeyEvents = () => {
    document.removeEventListener("keydown", handleKeyDown, false);
    console.log(activeItemCoords);
  };

  return (
    <div className="app-editor_item-editor">
      <p className="app-config_caption">Size & position of active item</p>
      <div className="row">
        {/* eslint-disable react/no-direct-mutation-state */}
        {/* <button disabled={!activeItemCoords.activeItemCoords} onClick={handleRemoveItemFromKeyboard}>DELETE</button> */}

        <span>
          <Button onClick={handleRemoveItemFromKeyboard}>Delete</Button>
          {/* eslint-disable react/no-direct-mutation-state */}
          <Button onClick={handleCloneItem}>copy</Button>
          {/* eslint-disable react/no-direct-mutation-state */}
        </span>

        {Object.keys(activeItemCoords)
          .filter((e) => e !== "type" && e !== undefined)
          .map((item) => {
            const value = numberFixed(activeItemCoords[item]);
            const onChange = (e) => {
              handleMoveItem(item, numberFixed(Number(e.target.value)));
            };
            return (
              <p className="app-config_inline" key={item}>
                <label>{item}</label>
                {/* eslint-disable react/no-direct-mutation-state */}
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
