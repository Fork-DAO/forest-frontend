/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tabWidth: 2,
  singleQuote: true,
  trailingComma: "es5",
  printWidth: 120,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "strict",
  singleAttributePerLine: false,
  jsxSingleQuote: true,
};
