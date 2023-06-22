import {EslintMetadata} from '@src/eslint/models';
import {LIB_VERSIONS} from '@src/versions';

const forbiddenProps = [
  {propName: 'className', nessage: 'Use styled-components to style your component'},
  {propName: 'class', nessage: 'Use `className` instead'},
  {propName: 'id', nessage: 'Use React ref instead'},
];

/* eslint-disable @typescript-eslint/naming-convention */
export const eslintReact: EslintMetadata = {
  plugin: ['react'],
  dependencies: {
    'eslint-plugin-react': '7.32.x',
  },
  settings: {
    react: {
      version: LIB_VERSIONS.react,
    },
  },
  allOff: {
    'react/boolean-prop-naming': 'off',
    'react/button-has-type': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/display-name': 'off',
    'react/forbid-component-props': 'off',
    'react/forbid-dom-props': 'off',
    'react/forbid-elements': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/function-component-definition': 'off',
    'react/hook-use-state': 'off',
    'react/iframe-missing-sandbox': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-closing-bracket-location': 'off',
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-first-prop-new-line': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-handler-names': 'off',
    'react/jsx-indent-props': 'off',
    'react/jsx-indent': 'off',
    'react/jsx-key': 'off',
    'react/jsx-max-depth': 'off',
    'react/jsx-max-props-per-line': 'off',
    'react/jsx-newline': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-no-duplicate-props': 'off',
    'react/jsx-no-leaked-render': 'off',
    'react/jsx-no-literals': 'off',
    'react/jsx-no-script-url': 'off',
    'react/jsx-no-target-blank': 'off',
    'react/jsx-no-undef': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-pascal-case': 'off',
    'react/jsx-props-no-multi-spaces': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': 'off',
    'react/jsx-space-before-closing': 'off',
    'react/jsx-tag-spacing': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/no-adjacent-inline-elements': 'off',
    'react/no-array-index-key': 'off',
    'react/no-arrow-function-lifecycle': 'off',
    'react/no-children-prop': 'off',
    'react/no-danger-with-children': 'off',
    'react/no-danger': 'off',
    'react/no-deprecated': 'off',
    'react/no-direct-mutation-state': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-invalid-html-attribute': 'off',
    'react/no-is-mounted': 'off',
    'react/no-multi-comp': 'off',
    'react/no-namespace': 'off',
    'react/no-object-type-as-default-prop': 'off',
    'react/no-redundant-should-component-update': 'off',
    'react/no-render-return-value': 'off',
    'react/no-set-state': 'off',
    'react/no-string-refs': 'off',
    'react/no-this-in-sfc': 'off',
    'react/no-typos': 'off',
    'react/no-unescaped-entities': 'off',
    'react/no-unknown-property': 'off',
    'react/no-unsafe': 'off',
    'react/no-unused-prop-types': 'off',
    'react/no-unused-state': 'off',
    'react/no-will-update-set-state': 'off',
    'react/prefer-es6-class': 'off',
    'react/prefer-exact-props': 'off',
    'react/prefer-read-only-props': 'off',
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react/require-optimization': 'off',
    'react/require-render-return': 'off',
    'react/self-closing-comp': 'off',
    'react/sort-comp': 'off',
    'react/sort-default-props': 'off',
    'react/sort-prop-types': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/style-prop-object': 'off',
    'react/void-dom-elements-no-children': 'off',
  },
  onlyOn: {
    'react/button-has-type': 'warn',
    'react/destructuring-assignment': ['warn', 'always'],
    'react/display-name': ['warn', {ignoreTranspilerName: true}],
    'react/forbid-component-props': ['warn', {forbid: forbiddenProps}],
    'react/forbid-dom-props': ['warn', {forbid: forbiddenProps}],
    'react/function-component-definition': [
      'warn',
      {namedComponents: 'arrow-function', unnamedComponents: 'arrow-function'},
    ],
    'react/iframe-missing-sandbox': 'warn',
    'react/hook-use-state': ['warn', {allowDestructuredState: true}],
    'react/jsx-boolean-value': 'warn',
    'react/jsx-fragments': ['warn', 'syntax'],
    'react/jsx-handler-names': [
      'warn',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
        checkLocalVariables: true,
      },
    ],
    'react/jsx-key': [
      'warn',
      {checkFragmentShorthand: true, checkKeyMustBeforeSpread: true, warnOnDuplicates: true},
    ],
    'react/jsx-no-comment-textnodes': 'warn',
    'react/jsx-no-bind': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    'react/jsx-no-leaked-render': 'warn',
    'react/jsx-no-script-url': 'warn',
    'react/jsx-no-target-blank': ['warn', {warnOnSpreadAttributes: true}],
    'react/jsx-no-undef': 'warn',
    'react/jsx-pascal-case': ['warn', {allowAllCaps: true, ignore: []}],
    'react/jsx-uses-vars': 'warn',
    'react/no-access-state-in-setstate': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-arrow-function-lifecycle': 'warn',
    'react/no-children-prop': 'warn',
    'react/no-danger-with-children': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-direct-mutation-state': 'warn',
    'react/no-find-dom-node': 'warn',
    'react/no-invalid-html-attribute': 'warn',
    'react/no-is-mounted': 'warn',
    'react/no-multi-comp': 'warn',
    'react/no-namespace': 'warn',
    'react/no-object-type-as-default-prop': 'warn',
    'react/no-redundant-should-component-update': 'warn',
    'react/no-render-return-value': 'warn',
    'react/no-string-refs': 'warn',
    'react/no-this-in-sfc': 'warn',
    'react/no-typos': 'warn',
    'react/no-unsafe': ['warn', {checkAliases: true}],
    'react/no-will-update-set-state': 'warn',
    'react/prefer-exact-props': 'warn',
    'react/prefer-stateless-function': 'warn',
    'react/require-render-return': 'warn',
    'react/state-in-constructor': 'warn',
    'react/style-prop-object': 'warn',
    'react/void-dom-elements-no-children': 'warn',
  },
};
/* eslint-enable @typescript-eslint/naming-convention, no-null/no-null */
