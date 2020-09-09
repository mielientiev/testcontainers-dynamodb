module.exports = {
  parser:  '@typescript-eslint/parser',
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "array-bracket-newline": ["error", { "multiline": true }],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "dot-location": ["error", "property"],
    "eol-last": ["error", "always"],
    "eqeqeq": ["error", "always"],
    "indent": [
      "error",
      2, {
        "SwitchCase": 1
      }
    ],
    "keyword-spacing": [
      "error",
      {
        "after": true
      }
    ],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "max-len": [
      "error",
      {
        "code": 120,
        "ignorePattern": 'it\\(\"will.*',
        "tabWidth": 2,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ],
    "newline-before-return": 2,
    "no-console": 0,
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 1,
        "maxEOF": 1
      }
    ],
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "object-curly-newline": [
      "error",
      {
        "ObjectExpression": { "multiline": true, "consistent": true },
        "ObjectPattern": { "multiline": true, "consistent": true },
        "ImportDeclaration": { "multiline": true, "consistent": true },
        "ExportDeclaration": { "multiline": true, "consistent": true }
      }
    ],
    "object-property-newline": [
      "error",
      { "allowAllPropertiesOnSameLine": true }
    ],
    "padded-blocks": ["error", "never"],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "spaced-comment": ["error", "always"],
    "@typescript-eslint/semi": ["error", "never"],
    "@typescript-eslint/indent": [
      "error",
      2, {
        "SwitchCase": 1
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "none"
        },
      }
    ],
    "@typescript-eslint/interface-name-prefix": ["off"],
    "@typescript-eslint/camelcase": ["off"],
    "@typescript-eslint/no-use-before-define": ["off"],
    "@typescript-eslint/ban-ts-ignore": ["off"],
    "@typescript-eslint/no-inferrable-types": ["off"],
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_"
    }
    ]
  },
  env: {
    "jest": true
  },
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module",
  }
}
