export const handleActions = (sketchRef) => {
  const handleUndo = () => {
    sketchRef.current.undo();
  };

  const handleCloneItem = () => {
    if (sketchRef.current) {
      sketchRef.current.copy();
      sketchRef.current.paste();
    }
  };

  const handleCopyItem = () => {
    if (sketchRef.current) {
      sketchRef.current.copy();
    }
  };

  const handleCutItem = () => {
    if (sketchRef.current) {
      sketchRef.current.copy();
    }
    sketchRef.current.removeSelected();
  };

  const handlePasteItem = () => {
    if (sketchRef.current) {
      sketchRef.current.paste();
    }
  };

  const handleRedo = () => {
    sketchRef.current.redo();
  };
  

  return {
    handleRedo,
    handleUndo,
    handleCloneItem,
    handleCutItem,
    handleCopyItem,
    handlePasteItem,
  };
};
