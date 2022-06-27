import { SHIFTING_BY_OFFSET } from "components/appCanvas/canvas/hooks/useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";
export const shiftValueByOffset = (value) => {
  return (value - (value % SHIFTING_BY_OFFSET));
};
