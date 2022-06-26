import { SHIFTING_BY_OFFSET } from "../components/canvas/hooks/useSetKeyEvents/useSetKeyPressActions/useArrowKeysNavigation";
export const shiftValueByOffset = (value) => {
  return Math.min(value - (value % SHIFTING_BY_OFFSET));
};
