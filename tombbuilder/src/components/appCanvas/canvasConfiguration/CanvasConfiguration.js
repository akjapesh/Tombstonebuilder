import React, { useState, useEffect } from "react";

//utils
import { handleCanvasConfiguration } from "./utils/handleCanvasConfigurationEvents";
function CanvasConfiguration({ updateContentLoader, contentLoaderState }) {
  const [formContentLoader, setFormContentLoader] =
    useState(contentLoaderState);
  // const {handleInput,handleCheckbox,handleColor,resetColors}=handleCanvasConfiguration({updateContentLoader});
  useEffect(() => {
    setFormContentLoader(contentLoaderState);
  }, [contentLoaderState]);
  return (
    <div className="app-config">
      <div className="row">
        <p className="app-config_caption">Canvas size</p>
        <p className="app-config_inline">
          <input
            type="number"
            id="width"
            name="width"
            onBlur={(e) =>
              handleCanvasConfiguration({ updateContentLoader, actionType: e })
            }
            value={formContentLoader.width}
            onChange={(e) => {
              setFormContentLoader((prevState) => {
                return { ...prevState, width: e.target.value };
              });
            }}
            max="1000"
            min="0"
          />
          <label htmlFor="width">width (in px)</label>
        </p>

        <p className="app-config_inline">
          <input
            type="number"
            id="height"
            name="height"
            onBlur={(e) =>
              handleCanvasConfiguration({ updateContentLoader, actionType: e })
            }
            value={formContentLoader.height}
            onChange={(e) => {
              setFormContentLoader((prevState) => {
                return { ...prevState, height: e.target.value };
              });
            }}
            max="1000"
            min="0"
          />
          <label htmlFor="height">height (in px)</label>
        </p>
      </div>

      <div className="row">
        <p className="app-config_caption">Colors </p>

        <p className="app-config_inline">
          <input
            type="color"
            id="backgroundColor"
            name="backgroundColor"
            value={contentLoaderState.backgroundColor}
            onChange={(e) =>
              handleCanvasConfiguration({ updateContentLoader, actionType: e })
            }
          />
          <label htmlFor="backgroundColor">Background color</label>
        </p>

        <p className="app-config_inline">
          <input
            type="color"
            id="foregroundColor"
            name="foregroundColor"
            value={contentLoaderState.foregroundColor}
            onChange={(e) =>
              handleCanvasConfiguration({ updateContentLoader, actionType: e })
            }
          />
          <label htmlFor="foregroundColor">Foreground color</label>
        </p>
        <p className="app-config_inline">
          <button
            style={{
              color: "#AAAAAA",
              margin: "auto",
              cursor: "pointer",
            }}
            name="reset"
            onClick={(e) => {
              handleCanvasConfiguration({ updateContentLoader, actionType: e });
            }}
          >
            Restore default
          </button>
        </p>
      </div>
      <div className="row">
        <p className="app-config_caption">Configurations</p>
        <p className="app-config_inline">
          <input
            type="number"
            id="speed"
            name="speed"
            value={formContentLoader.speed}
            max="20"
            onChange={(e) => {
              setFormContentLoader((prevState) => {
                return { ...prevState, speed: e.target.value };
              });
            }}
            onBlur={(e) => {
              handleCanvasConfiguration({ updateContentLoader, actionType: e });
            }}
            min="0.1"
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
            onChange={(e) =>
              handleCanvasConfiguration({ updateContentLoader, actionType: e })
            }
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
