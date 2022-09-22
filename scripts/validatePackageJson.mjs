import chalk from 'chalk';
import { execaSync } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import { check as checkPackageFormat, format as prettyFormatPackage } from 'prettier-package-json';

const packagePath = path.resolve(process.cwd(), 'package.json');

const shouldFormat = process.argv[2] === '--fix';

function isValidVersion (version) {
  const isValidVersion =
    /^([0-9]|http|git|(\/|)[a-z-_]+(\/[a-z-_]+)*)/gi.test(version);
  const isRange = / (-|\|\|) /gi.test(version);
  const hasLooseMatch = /\.x$/gi.test(version);

  return isValidVersion && !isRange && !hasLooseMatch;
}

(async function() {
  console.log(chalk.blue.bold('Checking package.json file...'));

  const packageJSON = await fs.readJson(packagePath);
  const {
    dependencies,
    devDependencies
  } = packageJSON;

  const invalidDependencies = Object.keys(dependencies).reduce((acc, dependency) => {
    if (!isValidVersion(dependencies[dependency])) {
      acc.push(`${dependency}@${dependencies[dependency]}`);
    }
    return acc;
  }, []);

  const invalidDevDependencies = Object.keys(devDependencies).reduce((acc, dependency) => {
    if (!isValidVersion(devDependencies[dependency])) {
      acc.push(`${dependency}@${devDependencies[dependency]}`);
    }
    return acc;
  }, []);

  if (invalidDevDependencies.length || invalidDependencies.length) {
    console.log('Dependencies in package.json must be absolute.');
    console.log(
      `The following dependencies are invalid:\n - ${[...invalidDependencies, ...invalidDevDependencies].join(
        '\n - '
      )}`);
    console.log(
      chalk.red.bold('package.json validation failed!')
    );
    process.exit(1);
  }

  const isValidFormatting = checkPackageFormat(
    packageJSON
  );

  if (!isValidFormatting && shouldFormat) {
    console.log(chalk.blue.bold('Formatting package.json file...'));
    const appPackage = prettyFormatPackage(packageJSON);
    fs.writeFileSync(packagePath, appPackage, { encoding: 'utf8' });
    execaSync('prettier', ['-u', '-w', '--loglevel=warn', packagePath], {
      cwd: process.cwd(),
      preferLocal: true
    });
  } else if (!isValidFormatting) {
    console.error(
      chalk.red(
        `\u2718 Package format is invalid, run with --fix to correct`
      )
    );
    process.exit(1);
  }

  console.log(
    chalk.green.bold('\u2714 File package.json has been successfully validated!')
  );

})();
