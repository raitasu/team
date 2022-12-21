import {
  EmployeeLanguageLevel,
  EmployeeLanguages
} from '~/store/api/employees/employees.schemas';
import {
  type LanguageLevel,
  type LanguageName
} from '~/store/api/employees/employees.types';

const languagePattern = `languages\\[]\\[(?<name>${EmployeeLanguages.join(
  '|'
)})]=(?<level>${EmployeeLanguageLevel.join('|')}|any)(?<end>&|$)`;

type LanguageFilter = { level: 'any' | LanguageLevel; name: LanguageName };
export const getLanguageFilter = (search: string): LanguageFilter[] | null => {
  const regexpLanguages = new RegExp(languagePattern, 'gi');
  const uri = decodeURIComponent(search);
  let currentMatch = regexpLanguages.exec(uri);
  const results: LanguageFilter[] = [];

  while (currentMatch) {
    const { groups } = currentMatch;
    const { level, name } = groups || {};

    if (name && level) {
      results.push({
        name: name as LanguageFilter['name'],
        level: level as LanguageFilter['level']
      });
    }

    currentMatch = regexpLanguages.exec(uri);
  }

  return results.length ? results : null;
};
