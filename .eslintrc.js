module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: false,
      },
    ],
    semi: ["error", "always"],
  },
};
