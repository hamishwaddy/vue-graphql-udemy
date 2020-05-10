module.exports = {
  extends: ['stylelint-config-recommended'],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'at-rule-no-unknown': [true, {
      ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'extend'],
    }],
    'color-hex-case': 'lower',
    'declaration-no-important': true,
    'length-zero-no-unit': true,
    'max-nesting-depth': 4,
    'no-empty-source': null,
    'number-leading-zero': 'always',
    'order/properties-alphabetical-order': true,
    'property-case': 'lower',
    'selector-list-comma-newline-after': 'always',
    'selector-max-compound-selectors': 5,
    'selector-type-case': 'lower',
  },
};
