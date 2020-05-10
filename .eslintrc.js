// module.exports = {
//     "extends": "airbnb-base"
// };

module.exports = {
    root: true,
    env: {
      node: true,
      mocha: true,
    },
    extends: [
      'plugin:vue/recommended',
      '@vue/airbnb',
    ],
    rules: {
      'max-len': [2, 120, 2, {}],
      'no-param-reassign': ['error', { props: false }],
    },
    parserOptions: {
      parser: 'babel-eslint',
    },
  };
  