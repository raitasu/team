import chalk from 'chalk';
import { ESLint } from 'eslint';

const shouldAutoFix = process.argv[2] === '--fix';

const globPaths = [
  '*.{js,jsx,ts,tsx}',
  'src/**/*.{js,jsx,ts,tsx}',
  'src/*.{js,jsx,ts,tsx}',
  '.storybook/**/*.{js,jsx,ts,tsx}',
  '.storybook/*.{js,jsx,ts,tsx}'
];

(async function() {
  console.log(
    chalk.blue(`Checking${shouldAutoFix ? ' and fixing' : ''} eslint rules...\n`)
  );

  const eslint = new ESLint({
    cwd: process.cwd(),
    fix: shouldAutoFix,
    useEslintrc: true,
    errorOnUnmatchedPattern: false,
    reportUnusedDisableDirectives: 'error'
  });
  const results = await eslint.lintFiles(globPaths);
  if (shouldAutoFix) {
    await ESLint.outputFixes(results);
  }

  if (results.some(({ errorCount, fatalErrorCount }) => fatalErrorCount > 0 || errorCount > 0)) {
    const formatter = await eslint.loadFormatter('stylish');
    console.log(formatter.format(results));
    console.log(
      chalk.red.bold(`\u2718 Eslint failed due to the above errors`)
    );
    process.exit(1);
  } else {
    console.log(chalk.green(`\u2714 Linter success`));
  }
})();
