import { ThemeProvider, LightTheme } from "baseui";
import { Input, SIZE } from "baseui/input";
import { numberFixed } from "utils/handleFixingNumbers";
function CanvasItemConfiguration({
  activeItemCoords,
  handleItemActions,
  handleKeyDown,
}) {
  const disableKeyEvents = () => {
    document.removeEventListener("keydown", handleKeyDown, false);
  };

  return (
    <ThemeProvider theme={LightTheme}>
      <div>
        <div className="row ">
          {Object.keys(activeItemCoords)
            .filter((e) => e !== "type" && e !== undefined)
            .map((item) => {
              let value = numberFixed(activeItemCoords[item]);
              const onChange = (e) => {
                e.target.value = Math.min(e.target.value, 600);
                handleItemActions({
                  type: "Move",
                  payLoad: {
                    key: item,
                    value: numberFixed(Number(e.target.value)),
                  },
                });
              };
              if (isNaN(value)) value = 0;
              return (
                <p key={item}>
                  <label>{item}</label>
                  <Input
                    size={SIZE.compact}
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
    </ThemeProvider>
  );
}

export default CanvasItemConfiguration;
