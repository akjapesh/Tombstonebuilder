import React from "react";
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
    console.log(activeItemCoords);
  };

  return (
    <div className="app-editor_item-editor">
      <div className="row ">
        <span>
          <button
            className="app-handler__trash"
            onClick={handleRemoveItemFromKeyboard}
          >
            <img src={trashIcon} alt="remove item" />
          </button>
          <button className="app-handler__clone" onClick={handleCloneItem}>
            <img src={cloneIcon} alt="clone tool" />
          </button>
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
