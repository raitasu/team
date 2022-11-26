import { Grid, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP, ROW_GAP } from '~/features/employee/employee.styles';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { type EmployeeSoftSkill } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';

export const SoftSkillsInfo = ({ skills }: { skills: EmployeeSoftSkill[] }) => {
  const [t, { language }] = useTranslation();

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.soft_skills')}
    >
      <Grid
        gridTemplateColumns="repeat(auto-fill, 240px)"
        columnGap={COLUMN_GAP}
        rowGap={ROW_GAP}
      >
        {skills.map((skill) => (
          <Text key={skill.id}>
            {getTranslation(skill.name_translations, language)}
          </Text>
        ))}
      </Grid>
    </InfoSection>
  );
};
