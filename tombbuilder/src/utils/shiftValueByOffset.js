import { SHIFTING_BY_OFFSET } from "components/appCanvas/canvas/hooks/useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";
export const shiftValueByOffset = (value) => {
  return Math.min(value - (value % SHIFTING_BY_OFFSET));
};
