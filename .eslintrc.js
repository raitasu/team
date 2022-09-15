module.exports = {
  extends: ['./.eslintrc.base.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['./.eslintrc.typescript.js']
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-default-export': 'off'
      }
    }
  ]
};
