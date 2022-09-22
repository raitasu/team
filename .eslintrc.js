module.exports = {
  extends: ['./configs/eslint/.eslintrc.base.js'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['./configs/eslint/.eslintrc.typescript.js']
    },
    {
      files: ['**/*.stories.*'],
      extends: ['./configs/eslint/.eslint.storybook.js']
    }
  ]
};
