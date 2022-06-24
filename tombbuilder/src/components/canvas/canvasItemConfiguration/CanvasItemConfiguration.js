import React from "react";
// import { Input } from "baseui/input";
import { numberFixed } from "../../../utils/handleFixingNumbers";
function CanvasItemConfiguration({
  activeItemCoords,
  handleMoveItem,
  handleKeyDown,
}) {
  const disableKeyEvents = () => {
    document.removeEventListener("keydown", handleKeyDown, false);
    console.log(activeItemCoords);
  };

  return (
    <div>
      <div className="row ">
        {Object.keys(activeItemCoords)
          .filter((e) => e !== "type" && e !== undefined)
          .map((item) => {
            const value = numberFixed(activeItemCoords[item]);
            const onChange = (e) => {
              handleMoveItem(item, numberFixed(Number(e.target.value)));
            };
            return (
              <p key={item}>
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
