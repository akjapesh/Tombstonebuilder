export const handleCanvasConfiguration = ({
  updateContentLoader,
  actionType,
}) => {
  // console.log(actionType.target);

  switch (actionType.target.name) {
    case "width":
    case "height":
    case "speed":
      updateContentLoader(
        actionType.target.name,
        Number(
          Number(actionType.target.value) <= Number(actionType.target.max)
            ? Number(actionType.target.value) <= Number(actionType.target.min)
              ? Number(actionType.target.min)
              : Number(actionType.target.value)
            : Number(actionType.target.max)
        )
      );
      break;
    case "backgroundColor":
    case "foregroundColor":
      updateContentLoader(actionType.target.name, actionType.target.value);
      break;
    case "reset":
      updateContentLoader("backgroundColor", "#f3f3f3");
      updateContentLoader("foregroundColor", "#ecebeb");
      break;
    case "gridVisibility":
      updateContentLoader(actionType.target.name, actionType.target.checked);
      break;
    default:
      break;
  }
  //   return {handleInput,handleColor,resetColors,handleCheckbox};
};