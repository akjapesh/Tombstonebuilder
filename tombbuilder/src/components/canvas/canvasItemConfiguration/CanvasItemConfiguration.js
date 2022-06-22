import React from "react";
import { Input } from "baseui/input";
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
      <div className="row ">
        {Object.keys(activeItemCoords)
          .filter((e) => e !== "type" && e !== undefined)
          .map((item) => {
            const value = numberFixed(activeItemCoords[item]);
            const onChange = (e) => {
              handleMoveItem(item, numberFixed(Number(e.target.value)));
            };
            return (
              <>
                <label>{item} (in px)</label>
                <Input
                  type="number"
                  onChange={onChange}
                  value={value}
                  onKeyDown={disableKeyEvents}
                />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default CanvasItemConfiguration;
