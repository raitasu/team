module.exports = {
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'react/static-property-placement': 'off',
  'react/react-in-jsx-scope': 'off',
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function'
    }
  ],
  'react/sort-comp': [
    'error',
    {
      order: [
        'static-methods',
        'instance-variables',
        'lifecycle',
        '/^on.+$/',
        '/^handle.+$/',
        'getters',
        'setters',
        '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
        'everything-else',
        '/^render.+$/',
        'render'
      ]
    }
  ],
  'react/destructuring-assignment': [
    'error',
    'always',
    { ignoreClassFields: true }
  ],
  'react/no-find-dom-node': 'error',
  'react/jsx-fragments': 'error',
  'react/jsx-props-no-spreading': 'off',
  'react/require-default-props': 'off',
  'react/default-props-match-prop-types': [
    'error',
    { allowRequiredDefaults: true }
  ]
};
