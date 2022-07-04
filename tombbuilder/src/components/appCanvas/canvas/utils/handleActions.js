// can be clubbed in a global useCanvasActions
export const handleActions = (sketchRef) => {
  const handleCanvasActions = ({ type }) => {
    switch (type) {
      case "Undo":
        sketchRef.current.undo();
        break;
      case "Clone":
        if (sketchRef.current) {
          sketchRef.current.copy();
          sketchRef.current.paste();
        }
        break;
      case "Copy":
        sketchRef.current.copy();
        break;
      case "Cut":
        if (sketchRef.current) {
          sketchRef.current.copy();
        }
        sketchRef.current.removeSelected();
        break;
      case "Paste":
        if (sketchRef.current) {
          sketchRef.current.paste();
        }
        break;
      case "Redo":
        sketchRef.current.redo();
        break;
      default:
        break;
    }
  };
  return {
    handleCanvasActions,
  };
};
