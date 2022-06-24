import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import parserHtml from "prettier/esm/parser-html.mjs";

export const formatCode = (code) => {
  const newCode = prettier.format(code, {
    ...PRETTIER_CODE_FORMATTER_PROPERTIES,
  });

  return newCode;
};
