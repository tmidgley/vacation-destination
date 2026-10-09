export default [
    {
        files: ["src/**/*.{js,mjs}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                document: "readonly",
                window: "readonly",
                localStorage: "readonly",
                console: "readonly",
                setInterval: "readonly",
                clearInterval: "readonly",
                fetch: "readonly",
                URL: "readonly",
                importMeta: "readonly"
            }
        },
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error"
        }
    }
];