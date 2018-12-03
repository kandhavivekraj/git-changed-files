module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        "jasmine": true,
        "commonjs": true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 2017,
        'sourceType': 'module'
    },
    'rules': {
      'func-call-spacing': [
          'error',
          'never'
        ],
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
        'brace-style': [
          'error',
          '1tbs',
          { "allowSingleLine": true }
        ],
        'object-curly-newline': [
          "error",
          { "minProperties": 1 }
        ],
        'object-curly-spacing': [
          "error",
          "always"
        ],
        'no-var': "error",
        'no-undef': 'off',
        'no-unused-vars': 'off',
        "comma-dangle": ["error", "never"],
        "no-console": 'off'
    }
};
