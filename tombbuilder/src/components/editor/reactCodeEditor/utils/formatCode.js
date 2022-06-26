import prettier from "prettier/esm/standalone.mjs";
import PRETTIER_CODE_FORMATTER_PROPERTIES from "./PrettierCodeFormatterProperties";

export const formatCode = ({ code }) => {
  const newCode = prettier.format(code, {
    ...PRETTIER_CODE_FORMATTER_PROPERTIES,
  });

  return newCode;
};
