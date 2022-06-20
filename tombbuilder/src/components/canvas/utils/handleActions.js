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
  
    const handleRedo = () => {
      sketchRef.current.redo();
    };
    return {
      handleRedo,
      handleUndo,
      handleCloneItem,
    };
  };