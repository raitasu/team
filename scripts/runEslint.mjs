import { ESLint } from 'eslint';

export async function runEslint(shouldAutoFix) {
  const eslint = new ESLint({
    cwd: process.cwd(),
    fix: shouldAutoFix,
    useEslintrc: true,
    errorOnUnmatchedPattern: false,
    reportUnusedDisableDirectives: 'error'
  });
  const results = await eslint.lintFiles('.');
  if (shouldAutoFix) {
    await ESLint.outputFixes(results);
  }

  if (
    results.some(
      ({ errorCount, fatalErrorCount }) => fatalErrorCount > 0 || errorCount > 0
    )
  ) {
    const formatter = await eslint.loadFormatter('stylish');
    console.log(formatter.format(results));
    throw new Error('Eslint failed');
  }

  if (
    results.some(
      ({ warningCount, fixableWarningCount }) =>
        warningCount > 0 || fixableWarningCount > 0
    )
  ) {
    const formatter = await eslint.loadFormatter('stylish');
    console.log(formatter.format(results));
  }

  return results;
}
