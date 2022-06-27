import React from "react";
//utils
import {handleCanvasConfiguration} from "./utils/handleCanvasConfigurationEvents";
function CanvasConfiguration({ updateContentLoader, contentLoaderState }) {
  // const {handleInput,handleCheckbox,handleColor,resetColors}=handleCanvasConfiguration({updateContentLoader});
 

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
            onChange={(e)=>handleCanvasConfiguration({updateContentLoader,actionType:e})}
            max="600"
            min="50"
          />
          <label htmlFor="width">width (in px)</label>
        </p>

        <p className="app-config_inline">
          <input
            type="number"
            id="height"
            name="height"
            value={contentLoaderState.height}
            onChange={(e)=>handleCanvasConfiguration({updateContentLoader,actionType:e})}
            max="500"
            min="50"
          />
          <label htmlFor="height">height (in px)</label>
        </p>
      </div>

      <div className="row">
        <p className="app-config_caption">
          Colors{" "}
          <button className="reset-colors" name="reset" onClick={(e)=>handleCanvasConfiguration({updateContentLoader,actionType:e})}>
            Reset
          </button>
        </p>

        <p className="app-config_inline">
          <input
            type="color"
            id="backgroundColor"
            name="backgroundColor"
            value={contentLoaderState.backgroundColor}
            onChange={(e)=>handleCanvasConfiguration({updateContentLoader,actionType:e})}
          />
          <label htmlFor="backgroundColor">Background color</label>
        </p>

        <p className="app-config_inline">
          <input
            type="color"
            id="foregroundColor"
            name="foregroundColor"
            value={contentLoaderState.foregroundColor}
            onChange={(e)=>handleCanvasConfiguration({updateContentLoader,actionType:e})}
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
            
            onChange={(e)=>handleCanvasConfiguration({updateContentLoader,actionType:e})}
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
            onChange={(e)=>handleCanvasConfiguration({updateContentLoader,actionType:e})}
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

export default CanvasConfiguration;
