import chalk from 'chalk';
import fs from 'fs-extra';
import diff from 'lodash/difference.js';
import uniq from 'lodash/uniq.js';
import path from 'path';
import { icons } from './helper.mjs';

const localizationPath = path.resolve(
  process.cwd(),
  'src/services/i18n/locales'
);

const getKeysMap = (source, parentKey) => {
  const keys = Object.keys(source);
  return keys.flatMap((key) => {
    const path = `${parentKey ? `${parentKey}.` : ''}${key}`;

    return typeof source[key] === 'string'
      ? path.replace(/_(few|many|one|other|plural|two|zero)$/, '')
      : getKeysMap(source[key], path);
  });
};

export async function validateLocalization() {
  const enBase = await fs.readJson(path.resolve(localizationPath, 'en.json'));
  const ruBase = await fs.readJson(path.resolve(localizationPath, 'ru.json'));
  const allEnKeys = uniq(getKeysMap(enBase));
  const allRuKeys = uniq(getKeysMap(ruBase));

  const hasSameAmountOfKeys = allEnKeys.length === allRuKeys.length;
  const absentRussianKeys = diff(allEnKeys, allRuKeys);
  const absentEnglishKeys = diff(allRuKeys, allEnKeys);

  if (!hasSameAmountOfKeys) {
    console.error(
      chalk.yellow(
        `${icons.warning} Localization files are NOT equal:\n - en.json: ${allEnKeys.length} keys\n - ru.json: ${allRuKeys.length} keys\n`
      )
    );
  }

  if (absentRussianKeys.length) {
    console.error(
      chalk.red(
        `${icons.error} Next keys exist in en.json, but absent in ru.json:`
      )
    );
    absentRussianKeys.forEach((key) => console.error(`${icons.bullet} ${key}`));
    console.log('');
  }

  if (absentEnglishKeys.length) {
    console.error(
      chalk.red(
        `${icons.error} Next keys exist in ru.json, but absent in en.json:`
      )
    );
    absentEnglishKeys.forEach((key) => console.error(`${icons.bullet} ${key}`));
    console.log('');
  }

  if (
    !hasSameAmountOfKeys ||
    absentEnglishKeys.length ||
    absentRussianKeys.length
  ) {
    throw new Error('Localization check failed!');
  }
}
