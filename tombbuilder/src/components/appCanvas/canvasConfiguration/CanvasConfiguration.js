//hooks
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme, darkThemePrimitives } from "baseui";
//utils
import { handleCanvasConfiguration } from "./utils/handleCanvasConfigurationEvents";

//components
import { Button, SIZE } from "baseui/button";
import { Input } from "baseui/input";
import { Checkbox, STYLE_TYPE } from "baseui/checkbox";

function CanvasConfiguration({ updateContentLoader, contentLoaderState }) {
  const [formContentLoader, setFormContentLoader] =
    useState(contentLoaderState);
  // const {handleInput,handleCheckbox,handleColor,resetColors}=handleCanvasConfiguration({updateContentLoader});
  useEffect(() => {
    setFormContentLoader(contentLoaderState);
  }, [contentLoaderState]);
  return (
    <ThemeProvider
      theme={createTheme(darkThemePrimitives, {
        colors: {
          inputFill: "#2F3134",
          inputFillActive: "#2F3134",
          inputBorder: "#2F3134",
          inputBorderActive: "#2F3134",
        },
      })}
    >
      <div className="app-config">
        <div className="row">
          <p className="app-config_caption">Canvas size</p>
          <p className="app-config_inline">
            <Input
              size={SIZE.compact}
              type="number"
              id="width"
              name="width"
              onBlur={(e) =>
                handleCanvasConfiguration({
                  updateContentLoader,
                  actionType: e,
                })
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
            <Input
              size={SIZE.compact}
              type="number"
              id="height"
              name="height"
              onBlur={(e) =>
                handleCanvasConfiguration({
                  updateContentLoader,
                  actionType: e,
                })
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
            <Input
              size={SIZE.compact}
              type="color"
              id="backgroundColor"
              name="backgroundColor"
              value={contentLoaderState.backgroundColor}
              onChange={(e) =>
                handleCanvasConfiguration({
                  updateContentLoader,
                  actionType: e,
                })
              }
            />
            <label htmlFor="backgroundColor">Background color</label>
          </p>

          <p className="app-config_inline">
            <Input
              size={SIZE.compact}
              type="color"
              id="foregroundColor"
              name="foregroundColor"
              value={contentLoaderState.foregroundColor}
              onChange={(e) =>
                handleCanvasConfiguration({
                  updateContentLoader,
                  actionType: e,
                })
              }
            />
            <label htmlFor="foregroundColor">Foreground color</label>
          </p>
          <p className="app-config_inline">
            <Button
              colors={"#AAAAAA"}
              size={SIZE.compact}
              style={{
                color: "#AAAAAA",
                margin: "auto",
                cursor: "pointer",
              }}
              name="reset"
              onClick={(e) => {
                handleCanvasConfiguration({
                  updateContentLoader,
                  actionType: e,
                });
              }}
            >
              Restore default
            </Button>
          </p>
        </div>
        <div className="row">
          <p className="app-config_caption">Configurations</p>
          <p className="app-config_inline">
            <Input
              size={SIZE.compact}
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
                handleCanvasConfiguration({
                  updateContentLoader,
                  actionType: e,
                });
              }}
              min="0.1"
            />
            <label htmlFor="speed">speed (in s)</label>
          </p>

          <label htmlFor="gridVisibility" className="toggle">
            <Checkbox
              className="toggle-input"
              name="gridVisibility"
              id="gridVisibility"
              checked={contentLoaderState.gridVisibility}
              onChange={(e) =>
                handleCanvasConfiguration({
                  updateContentLoader,
                  actionType: e,
                })
              }
              checkmarkType={STYLE_TYPE.toggle_round}
            >
              Grid Visibility
            </Checkbox>
          </label>
        </div>
        <p className="app-config_grid-col"></p>
      </div>
    </ThemeProvider>
  );
}

export default CanvasConfiguration;
