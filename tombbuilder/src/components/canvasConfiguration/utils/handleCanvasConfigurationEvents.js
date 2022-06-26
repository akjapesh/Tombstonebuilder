export const handleCanvasConfiguration=({updateContentLoader,actionType})=>{ 
    // const updateContentLoader=actionType.target.updateContentLoader;
    console.log(actionType.target);
// const handleInput = ({ target: { value, name, max } }) => {
//     updateContentLoader(
//       name,
//       Number(Number(value) <= Number(max) ? Number(value) : Number(max))
//     );
//   };
//   const handleColor = (e) => {
//     // debounceHandlecolor(e.target.name,e.target.value)
//     updateContentLoader(e.target.name, e.target.value);
//   };
//   // const debounceHandlecolor=debounce(250,(name,value)=>{
//   //     updateContentLoader(name,value);
//   // })
//   const resetColors = () => {
//     updateContentLoader("backgroundColor", "#f3f3f3");
//     updateContentLoader("foregroundColor", "#ecebeb");
//   };
//   const handleCheckbox = ({ target: { checked, name } }) => {
//     updateContentLoader(name, checked);
//   };

  switch(actionType.target.name){
    case "width":
    case "height":
    case "speed":
        updateContentLoader(
            actionType.target.name,
            Number(Number(actionType.target.value) <= Number(actionType.target.max) ? Number(actionType.target.value) : Number(actionType.target.max))
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
       
           
  }
//   return {handleInput,handleColor,resetColors,handleCheckbox};
}