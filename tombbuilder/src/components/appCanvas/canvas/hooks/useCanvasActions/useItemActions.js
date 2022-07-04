// Reactive code - declarative
// JS Code - imperative

// What you want to achieve - How is taken care of by framework
// React: setState({ }) + (state, props) => JSX

// useItemActions
// What: My item is moved - tell canvas to move itself

export const useItemActions = ({
  handleActiveItemActions,
  activeItemCoords,
  onCanvasAction,
}) => {
  const handleItemActions = (action) => {
    const { type, payLoad } = action;
    switch (type) {
      case "Move":
        let { key, value } = payLoad;

        if (isNaN(value)) value = 0;

        onCanvasAction({ type: "MOVE_ACTIVE_ITEM", payload: {} });
        handleActiveItemActions({ type: "Move", payLoad: { key, value } });
        break;
      case "Remove":
        const { event } = payLoad;
        const isItemSelected = Object.keys(activeItemCoords).length > 0;

        if (isItemSelected) {
          event.preventDefault();
          if (sketchRef.current) {
            sketchRef.current.removeSelected();
          }
        }
        break;
      case "Add":
        const { target } = payLoad;
        const newTarget = target;
        const hasCircle =
          newTarget &&
          (newTarget.type === "circle" ||
            (newTarget.type === "activeSelection" &&
              newTarget._objects.some((o) => o.type === "circle")));
        const hasRect =
          newTarget &&
          (newTarget.type === "rect" ||
            (newTarget.type === "activeSelection" &&
              newTarget._objects.some((o) => o.type === "rect")));
        if (hasCircle || hasRect) {
          newTarget.lockRotation = true;
          newTarget.angle = 0;
          newTarget.originY = "top";
          newTarget.lockUniScaling = true;
        }
        return newTarget;
        break;
      default:
        break;
    }
  };

  return {
    handleItemActions,
  };
};
