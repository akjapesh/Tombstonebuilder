import prettier from "prettier/esm/standalone.mjs";
import parserBabel from "prettier/esm/parser-babel.mjs";
import parserHtml from "prettier/esm/parser-html.mjs";

export const formatCode = (code) => {
  const newCode = prettier.format(code, {
    parser: "babel",
    plugins: [parserBabel, parserHtml],
    arrowParens: "always",
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    htmlWhitespaceSensitivity: "css",
    insertPragma: false,
    jsxSingleQuote: false,
    printWidth: 80,
    proseWrap: "preserve",
    quoteProps: "as-needed",
    printWidth: 80,
    requirePragma: false,
    semi: true,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    useTabs: false,
    vueIndentScriptAndStyle: false,
  });

  return newCode;
};