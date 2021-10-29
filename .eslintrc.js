module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        },
        project: "./tsconfig.json"
    },
    env: {
        node: true,
        browser: true,
        es2020: true
    },
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    settings: {
        react: {
            version: "detect"
        }
    },
    ignorePatterns: ["*.js"],
    rules: {
        eqeqeq: 2,
        "no-else-return": 2,
        "@typescript-eslint/array-type": 2,
        "@typescript-eslint/consistent-type-assertions": 2,
        "@typescript-eslint/consistent-type-definitions": [2, "interface"],
        "@typescript-eslint/member-ordering": [
            2,
            {
                default: ["static-field", "instance-field", "constructor", "instance-method"]
            }
        ],
        "@typescript-eslint/naming-convention": [
            2,
            {
                selector: "default",
                format: ["camelCase"]
            },
            {
                selector: "variable",
                format: ["camelCase", "UPPER_CASE"]
            },
            {
                selector: "variable",
                types: ["function"],
                format: ["camelCase", "PascalCase"]
            },
            {
                selector: "variable",
                modifiers: ["global", "const"],
                types: ["boolean", "string", "number"],
                format: ["UPPER_CASE"]
            },
            {
                selector: "objectLiteralProperty",
                leadingUnderscore: "allowDouble",
                format: ["camelCase", "PascalCase"]
            },
            {
                selector: "parameter",
                modifiers: ["destructured"],
                format: ["camelCase", "PascalCase"]
            },
            {
                selector: "typeLike",
                format: ["PascalCase"]
            },
            {
                selector: ["interface", "typeAlias"],
                format: ["PascalCase"],
                custom: {
                    regex: "^I[A-Z][a-z]",
                    match: false
                }
            }
        ],
        "@typescript-eslint/no-empty-function": 0,
        "@typescript-eslint/no-explicit-any": 2,
        "@typescript-eslint/no-floating-promises": 0,
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/no-require-imports": 2,
        "@typescript-eslint/no-unused-vars": 0,
        "@typescript-eslint/prefer-optional-chain": 2,
        "@typescript-eslint/prefer-readonly": 2,
        "@typescript-eslint/prefer-regexp-exec": 0,
        "@typescript-eslint/restrict-template-expressions": 0,
        "@typescript-eslint/switch-exhaustiveness-check": 2,

        "no-constant-condition": 0,
        "no-restricted-syntax": [
            "error",
            {
                selector: "TSEnumDeclaration",
                message: "Use union type instead"
            }
        ],

        "import/order": [
            1,
            {
                alphabetize: {order: "asc"},
                "newlines-between": "always"
            }
        ],

        "react/prop-types": 0,
        "react/display-name": 0
    }
};
