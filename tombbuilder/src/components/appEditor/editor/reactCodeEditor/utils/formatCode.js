import prettier from "prettier/esm/standalone.mjs";
import { PRETTIER_CODE_FORMATTER_PROPERTIES } from "./PrettierCodeFormatterProperties";

export const formatCode = ({ code, printWidth = 80 }) => {
  const newCode = prettier.format(code, {
    ...PRETTIER_CODE_FORMATTER_PROPERTIES,
    printWidth: printWidth,
  });

  return newCode;
};
