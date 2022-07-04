// constants/shiftOffset.js
// Run Prettier on this file
import { SHIFTING_BY_OFFSET } from "components/appCanvas/canvas/hooks/useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation"; 
import { numberFixed } from "./handleFixingNumbers"; 
// Add line breaks appropriately
export const shiftValueByOffset = (value) => 
{ 
  value = numberFixed(value+0.1); 
  if(value%SHIFTING_BY_OFFSET < SHIFTING_BY_OFFSET/2) 
    return (value - (value % SHIFTING_BY_OFFSET)); 
    return (value + SHIFTING_BY_OFFSET - (value % SHIFTING_BY_OFFSET)); 
};