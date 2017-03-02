module.exports = {
    "parser":"babel-eslint",
    "extends": "airbnb",
    "plugins": [
        "react",
        "react-native",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      semi:0,
      "no-multi-spaces":0,
      "no-multiple-empty-lines":0,
      "no-use-before-define":0,
      "arrow-parens":0,
      "import/extensions":0,
      "import/no-extraneous-dependencies":0,
      "padded-blocks": 0,
      "react/jsx-filename-extension": 0,
      "no-constant-condition": ["error", { "checkLoops": false }]
    },
};
