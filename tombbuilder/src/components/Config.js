import React from "react";
function Config({ updateContentLoader, contentLoaderState }) {
  const handleInput = ({ target: { value, name, max } }) => {
    updateContentLoader(name, Number(value <= max ? value : max));
  };
  const handleColor = (e) => {
    // debounceHandlecolor(e.target.name,e.target.value)
    updateContentLoader(e.target.name, e.target.value);
  };
  // const debounceHandlecolor=debounce(250,(name,value)=>{
  //     updateContentLoader(name,value);
  // })
  const resetColors = () => {
    updateContentLoader("backgroundColor", "#f3f3f3");
    updateContentLoader("foregroundColor", "#ecebeb");
  };
  const handleCheckbox = ({ target: { value, name } }) => {
    updateContentLoader(name, value);
  };

  return (
    <div className="app-config">
      <div className="row">
        <p className="app-config_caption">Canvas size</p>

        <p className="app-config_inline">
          <input
            type="number"
            id="width"
            name="width"
            value={contentLoaderState.width}
            onChange={handleInput}
            max="600"
          />
          <label htmlFor="width">width (in px)</label>
        </p>

        <p className="app-config_inline">
          <input
            type="number"
            id="height"
            name="height"
            value={contentLoaderState.height}
            onChange={handleInput}
            max="1000"
          />
          <label htmlFor="height">height (in px)</label>
        </p>
      </div>

      <div className="row">
        <p className="app-config_caption">
          Colors{" "}
          <button className="reset-colors" onClick={resetColors}>
            Reset
          </button>
        </p>

        <p className="app-config_inline">
          <input
            type="color"
            id="backgroundColor"
            name="backgroundColor"
            value={contentLoaderState.backgroundColor}
            onChange={handleColor}
          />
          <label htmlFor="backgroundColor">Background color</label>
        </p>

        <p className="app-config_inline">
          <input
            type="color"
            id="foregroundColor"
            name="foregroundColor"
            value={contentLoaderState.foregroundColor}
            onChange={handleColor}
          />
          <label htmlFor="foregroundColor">Foreground color</label>
        </p>
      </div>
      <div className="row">
        <p className="app-config_caption">Configurations</p>
        <p className="app-config_inline">
          <input
            type="number"
            id="speed"
            name="speed"
            value={contentLoaderState.speed}
            max="20"
            onChange={handleInput}
          />
          <label htmlFor="speed">speed (in s)</label>
        </p>
        <p className="app-config_caption">Grid visibility</p>

        <label htmlFor="gridVisibility" className="toggle">
          <input
            type="checkbox"
            className="toggle-input"
            checked={contentLoaderState.gridVisibility}
            name="gridVisibility"
            id="gridVisibility"
            onChange={handleCheckbox}
          />
          <span
            className={`toggle-check ${
              contentLoaderState.gridVisibility ? "checked" : ""
            }`}
          />
        </label>
      </div>
      <p className="app-config_grid-col"></p>
    </div>
  );
}

export default Config;