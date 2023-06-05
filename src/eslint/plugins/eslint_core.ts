import {EslintMetadata} from '@src/eslint/models';

/* eslint-disable @typescript-eslint/naming-convention */
export const eslintCore: EslintMetadata = {
  plugin: [],
  dependencies: {},
  settings: {},
  allOff: {
    'accessor-pairs': 'off',
    'array-bracket-newline': 'off',
    'array-bracket-spacing': 'off',
    'array-callback-return': 'off',
    'array-element-newline': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'arrow-spacing': 'off',
    'block-scoped-var': 'off',
    'block-spacing': 'off',
    // Use @typescript-eslint/ban-types
    'brace-style': 'off',
    // Use @typescript-eslint/brace-style
    'callback-return': 'off',
    camelcase: 'off',
    'capitalized-comments': 'off',
    'class-methods-use-this': 'off',
    // @Use typescript-eslint/comma-dangle
    'comma-dangle': 'off',
    // Use @typescript-eslint/comma-spacing
    'comma-spacing': 'off',
    'comma-style': 'off',
    complexity: 'off',
    'computed-property-spacing': 'off',
    'consistent-return': 'off',
    'consistent-this': 'off',
    'constructor-super': 'off',
    curly: 'off',
    'default-case-last': 'off',
    'default-case': 'off',
    // Use @typescript-eslint/default-param-last
    'default-param-last': 'off',
    // Use @typescript-eslint/dot-notation
    'dot-location': 'off',
    'eol-last': 'off',
    eqeqeq: 'off',
    'for-direction': 'off',
    // Use @typescript-eslint/func-call-spacing
    'func-call-spacing': 'off',
    'func-name-matching': 'off',
    'func-names': 'off',
    'func-style': 'off',
    'function-call-argument-newline': 'off',
    'function-paren-newline': 'off',
    'generator-star-spacing': 'off',
    'getter-return': 'off',
    'global-require': 'off',
    'grouped-accessor-pairs': 'off',
    'guard-for-in': 'off',
    'handle-callback-err': 'off',
    'id-blacklist': 'off',
    'id-denylist': 'off',
    'id-length': 'off',
    'id-match': 'off',
    'implicit-arrow-linebreak': 'off',
    'indent-legacy': 'off',
    // Use @typescript-eslint/indent
    indent: 'off',
    // Use @typescript-eslint/init-declarations
    'init-declarations': 'off',
    'jsx-quotes': 'off',
    'key-spacing': 'off',
    // Use @typescript-eslint/keyword-spacing
    'keyword-spacing': 'off',
    'line-comment-position': 'off',
    'linebreak-style': 'off',
    'lines-around-comment': 'off',
    'lines-around-directive': 'off',
    // Use @typescript-eslint/lines-between-class-members
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'max-depth': 'off',
    'max-len': 'off',
    'max-lines-per-function': 'off',
    'max-lines': 'off',
    'max-nested-callbacks': 'off',
    'max-params': 'off',
    'max-statements-per-line': 'off',
    'max-statements': 'off',
    'multiline-comment-style': 'off',
    'multiline-ternary': 'off',
    'new-cap': 'off',
    'new-parens': 'off',
    'newline-after-var': 'off',
    'newline-before-return': 'off',
    'newline-per-chained-call': 'off',
    'no-alert': 'off',
    // Use @typescript-eslint/no-array-constructor
    'no-array-constructor': 'off',
    'no-async-promise-executor': 'off',
    'no-await-in-loop': 'off',
    'no-bitwise': 'off',
    'no-buffer-constructor': 'off',
    'no-caller': 'off',
    'no-case-declarations': 'off',
    'no-catch-shadow': 'off',
    'no-class-assign': 'off',
    'no-compare-neg-zero': 'off',
    'no-cond-assign': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'off',
    'no-const-assign': 'off',
    'no-constant-binary-expression': 'off',
    'no-constant-condition': 'off',
    'no-constructor-return': 'off',
    'no-continue': 'off',
    'no-control-regex': 'off',
    'no-debugger': 'off',
    'no-delete-var': 'off',
    'no-div-regex': 'off',
    'no-dupe-args': 'off',
    // Use @typescript-eslint/no-dupe-class-members
    'no-dupe-class-members': 'off',
    'no-dupe-else-if': 'off',
    'no-dupe-keys': 'off',
    'no-duplicate-case': 'off',
    // Use @typescript-eslint/no-duplicate-imports
    'no-duplicate-imports': 'off',
    'no-else-return': 'off',
    'no-empty-character-class': 'off',
    // Use @typescript-eslint/no-empty-function
    'no-empty-function': 'off',
    'no-empty-pattern': 'off',
    'no-empty': 'off',
    'no-eq-null': 'off',
    'no-eval': 'off',
    'no-ex-assign': 'off',
    'no-extend-native': 'off',
    'no-extra-bind': 'off',
    'no-extra-boolean-cast': 'off',
    'no-extra-label': 'off',
    // Use @typescript-eslint/no-extra-parens
    'no-extra-parens': 'off',
    // Use @typescript-eslint/no-extra-semi
    'no-extra-semi': 'off',
    'no-fallthrough': 'off',
    'no-floating-decimal': 'off',
    'no-func-assign': 'off',
    'no-global-assign': 'off',
    'no-implicit-coercion': 'off',
    'no-implicit-globals': 'off',
    'no-implied-eval': 'off',
    'no-import-assign': 'off',
    'no-inline-comments': 'off',
    'no-inner-declarations': 'off',
    'no-invalid-regexp': 'off',
    // Use @typescript-eslint/no-invalid-this
    'no-invalid-this': 'off',
    'no-irregular-whitespace': 'off',
    'no-iterator': 'off',
    'no-label-var': 'off',
    'no-labels': 'off',
    'no-lone-blocks': 'off',
    'no-lonely-if': 'off',
    // Use @typescript-eslint/no-loop-func
    'no-loop-func': 'off',
    // Use @typescript-eslint/no-loss-of-precision
    'no-loss-of-precision': 'off',
    // Use @typescript-eslint/no-magic-numbers
    'no-magic-numbers': 'off',
    'no-misleading-character-class': 'off',
    'no-mixed-operators': 'off',
    'no-mixed-requires': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-multi-assign': 'off',
    'no-multi-spaces': 'off',
    'no-multi-str': 'off',
    'no-multiple-empty-lines': 'off',
    'no-native-reassign': 'off',
    'no-negated-condition': 'off',
    'no-negated-in-lhs': 'off',
    // Use unicorn/no-nested-ternary
    'no-nested-ternary': 'off',
    'no-new-func': 'off',
    'no-new-object': 'off',
    'no-new-require': 'off',
    'no-new-symbol': 'off',
    'no-new-wrappers': 'off',
    'no-new': 'off',
    'no-nonoctal-decimal-escape': 'off',
    'no-obj-calls': 'off',
    'no-octal-escape': 'off',
    'no-octal': 'off',
    'no-param-reassign': 'off',
    'no-path-concat': 'off',
    'no-plusplus': 'off',
    'no-process-env': 'off',
    'no-process-exit': 'off',
    'no-promise-executor-return': 'off',
    'no-proto': 'off',
    'no-prototype-builtins': 'off',
    // Use @typescript-eslint/no-redeclare
    'no-redeclare': 'off',
    'no-regex-spaces': 'off',
    'no-restricted-exports': 'off',
    'no-restricted-globals': 'off',
    // Use @typescript-eslint/no-restricted-imports
    'no-restricted-imports': 'off',
    'no-restricted-modules': 'off',
    'no-restricted-properties': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    // Use @typescript-eslint/return-await
    'no-return-await': 'off',
    'no-script-url': 'off',
    'no-self-assign': 'off',
    'no-self-compare': 'off',
    'no-sequences': 'off',
    'no-setter-return': 'off',
    'no-shadow-restricted-names': 'off',
    // Use @typescript-eslint/no-shadow
    'no-shadow': 'off',
    'no-spaced-func': 'off',
    'no-sparse-arrays': 'off',
    'no-sync': 'off',
    'no-tabs': 'off',
    'no-template-curly-in-string': 'off',
    'no-ternary': 'off',
    'no-this-before-super': 'off',
    'no-throw-literal': 'off',
    'no-trailing-spaces': 'off',
    'no-undef-init': 'off',
    'no-undef': 'off',
    'no-undefined': 'off',
    'no-underscore-dangle': 'off',
    'no-unexpected-multiline': 'off',
    'no-unmodified-loop-condition': 'off',
    'no-unneeded-ternary': 'off',
    'no-unreachable-loop': 'off',
    'no-unreachable': 'off',
    'no-unsafe-finally': 'off',
    'no-unsafe-negation': 'off',
    'no-unsafe-optional-chaining': 'off',
    // Use @typescript-eslint/no-unused-expressions
    'no-unused-expressions': 'off',
    'no-unused-labels': 'off',
    // Use @typescript-eslint/no-unused-vars
    'no-unused-vars': 'off',
    // Use @typescript-eslint/no-use-before-define
    'no-use-before-define': 'off',
    'no-useless-backreference': 'off',
    'no-useless-call': 'off',
    'no-useless-catch': 'off',
    'no-useless-computed-key': 'off',
    'no-useless-concat': 'off',
    // Use @typescript-eslint/no-useless-constructor
    'no-useless-constructor': 'off',
    'no-useless-escape': 'off',
    'no-useless-rename': 'off',
    'no-useless-return': 'off',
    'no-var': 'off',
    'no-void': 'off',
    'no-warning-comments': 'off',
    'no-whitespace-before-property': 'off',
    'no-with': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
    // Use @typescript-eslint/object-curly-spacing
    'object-curly-spacing': 'off',
    'object-property-newline': 'off',
    'object-shorthand': 'off',
    'one-var-declaration-per-line': 'off',
    'one-var': 'off',
    'operator-assignment': 'off',
    'operator-linebreak': 'off',
    'padded-blocks': 'off',
    'padding-line-between-statements': 'off',
    'prefer-arrow-callback': 'off',
    'prefer-const': 'off',
    'prefer-destructuring': 'off',
    'prefer-exponentiation-operator': 'off',
    'prefer-message-ids': 'off',
    'prefer-named-capture-group': 'off',
    'prefer-numeric-literals': 'off',
    'prefer-object-has-own': 'off',
    'prefer-object-spread': 'off',
    'prefer-promise-reject-errors': 'off',
    'prefer-reflect': 'off',
    'prefer-regex-literals': 'off',
    'prefer-rest-params': 'off',
    'prefer-spread': 'off',
    'prefer-template': 'off',
    'quote-props': 'off',
    // Use @typescript-eslint/quotes
    quotes: 'off',
    radix: 'off',
    'require-atomic-updates': 'off',
    // Use @typescript-eslint/require-await
    'require-await': 'off',
    'require-jsdoc': 'off',
    'require-meta-docs-url': 'off',
    'require-unicode-regexp': 'off',
    'require-yield': 'off',
    'rest-spread-spacing': 'off',
    'semi-spacing': 'off',
    'semi-style': 'off',
    // Use @typescript-eslint/semi
    semi: 'off',
    'sort-imports': 'off',
    'sort-keys': 'off',
    'sort-vars': 'off',
    'space-before-blocks': 'off',
    // Use @typescript-eslint/space-before-function-paren
    'space-before-function-paren': 'off',
    'space-in-parens': 'off',
    'space-infix-ops': 'off',
    'space-unary-ops': 'off',
    'spaced-comment': 'off',
    strict: 'off',
    'switch-colon-spacing': 'off',
    'symbol-description': 'off',
    'template-curly-spacing': 'off',
    'template-tag-spacing': 'off',
    'unicode-bom': 'off',
    'use-isnan': 'off',
    'valid-jsdoc': 'off',
    'valid-typeof': 'off',
    'vars-on-top': 'off',
    'wrap-iife': 'off',
    'wrap-regex': 'off',
    'yield-star-spacing': 'off',
    yoda: 'off',
  },
  onlyOn: {
    'array-callback-return': 'warn',
    'constructor-super': 'warn',
    curly: 'warn',
    'default-case': 'warn',
    eqeqeq: ['warn', 'always'],
    'getter-return': 'warn',
    'guard-for-in': 'warn',
    'id-match': 'warn',
    'no-async-promise-executor': 'warn',
    'no-await-in-loop': 'warn',
    'no-bitwise': 'warn',
    'no-caller': 'warn',
    'no-case-declarations': 'warn',
    'no-class-assign': 'warn',
    'no-cond-assign': 'warn',
    'no-const-assign': 'warn',
    'no-constant-binary-expression': 'warn',
    'no-constant-condition': ['warn', {checkLoops: false}],
    'no-constructor-return': 'warn',
    'no-control-regex': 'warn',
    'no-debugger': 'warn',
    'no-delete-var': 'warn',
    'no-dupe-args': 'warn',
    'no-dupe-else-if': 'warn',
    'no-dupe-keys': 'warn',
    'no-duplicate-case': 'warn',
    'no-duplicate-imports': 'warn',
    'no-else-return': 'warn',
    'no-empty-character-class': 'warn',
    'no-empty-pattern': 'warn',
    'no-empty': 'warn',
    'no-eval': 'warn',
    'no-ex-assign': 'warn',
    'no-extend-native': 'warn',
    'no-extra-bind': 'warn',
    'no-extra-boolean-cast': 'warn',
    'no-extra-label': 'warn',
    'no-fallthrough': 'warn',
    'no-func-assign': 'warn',
    'no-global-assign': 'warn',
    'no-implicit-coercion': ['warn', {disallowTemplateShorthand: true}],
    'no-implicit-globals': 'warn',
    'no-import-assign': 'warn',
    'no-invalid-regexp': 'warn',
    'no-iterator': 'warn',
    'no-label-var': 'warn',
    'no-labels': ['warn', {allowLoop: true, allowSwitch: false}],
    'no-lone-blocks': 'warn',
    'no-lonely-if': 'warn',
    'no-loop-func': 'warn',
    'no-loss-of-precision': 'warn',
    'no-misleading-character-class': 'warn',
    'no-mixed-requires': 'warn',
    'no-multi-assign': 'warn',
    'no-multi-str': 'warn',
    'no-negated-in-lhs': 'warn',
    'no-new-func': 'warn',
    'no-new-object': 'warn',
    'no-new-symbol': 'warn',
    'no-new-wrappers': 'warn',
    'no-new': 'warn',
    'no-nonoctal-decimal-escape': 'warn',
    'no-obj-calls': 'warn',
    'no-octal-escape': 'warn',
    'no-octal': 'warn',
    'no-promise-executor-return': 'warn',
    'no-proto': 'warn',
    'no-prototype-builtins': 'warn',
    'no-regex-spaces': 'warn',
    'no-restricted-globals': [
      'warn',
      'addEventListener',
      'blur',
      'close',
      'closed',
      'confirm',
      'defaultStatus',
      'defaultstatus',
      'event',
      'external',
      'find',
      'focus',
      'frameElement',
      'frames',
      'history',
      'innerHeight',
      'innerWidth',
      'length',
      'location',
      'locationbar',
      'menubar',
      'moveBy',
      'moveTo',
      'name',
      'onblur',
      'onerror',
      'onfocus',
      'onload',
      'onresize',
      'onunload',
      'open',
      'opener',
      'opera',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'parent',
      'print',
      'removeEventListener',
      'resizeBy',
      'resizeTo',
      'screen',
      'screenLeft',
      'screenTop',
      'screenX',
      'screenY',
      'scroll',
      'scrollbars',
      'scrollBy',
      'scrollTo',
      'scrollX',
      'scrollY',
      'self',
      'status',
      'statusbar',
      'stop',
      'toolbar',
      'top',
    ],
    'no-return-await': 'warn',
    'no-script-url': 'warn',
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-setter-return': 'warn',
    'no-shadow-restricted-names': 'warn',
    'no-sparse-arrays': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-this-before-super': 'warn',
    'no-undef-init': 'warn',
    'no-underscore-dangle': [
      'warn',
      {
        enforceInMethodNames: true,
        enforceInClassFields: true,
      },
    ],
    'no-unmodified-loop-condition': 'warn',
    'no-unneeded-ternary': 'warn',
    'no-unreachable-loop': 'warn',
    'no-unreachable': 'warn',
    'no-unsafe-finally': 'warn',
    'no-unused-labels': 'warn',
    'no-useless-call': 'warn',
    'no-useless-catch': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-rename': [
      'warn',
      {ignoreDestructuring: false, ignoreImport: false, ignoreExport: false},
    ],
    'no-useless-return': 'warn',
    'no-var': 'warn',
    'no-void': 'warn',
    'no-with': 'warn',
    'object-shorthand': 'warn',
    'one-var': ['warn', 'never'],
    'operator-assignment': 'warn',
    'prefer-const': ['warn', {destructuring: 'all'}],
    'prefer-destructuring': ['warn', {array: false}],
    'prefer-exponentiation-operator': 'warn',
    'prefer-named-capture-group': 'warn',
    'prefer-object-spread': 'warn',
    'prefer-promise-reject-errors': 'warn',
    'prefer-regex-literals': ['warn', {disallowRedundantWrapping: true}],
    'prefer-rest-params': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'warn',
    radix: 'warn',
    'require-atomic-updates': 'warn',
    'require-unicode-regexp': 'warn',
    'require-yield': 'warn',
    strict: ['warn', 'never'],
    'use-isnan': 'warn',
    'valid-typeof': 'warn',
    yoda: 'warn',
    'no-return-assign': ['warn', 'always'],
    // // Turn on to list/flag all the todo comments
    // 'no-warning-comments': ['warn', {terms: ['todo'], location: 'start'}],
  },
};
/* eslint-enable @typescript-eslint/naming-convention, no-null/no-null */
