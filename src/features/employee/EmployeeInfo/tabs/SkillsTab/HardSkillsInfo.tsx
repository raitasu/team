import { Grid } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { type EmployeeHardSkill } from '~/store/api/employees/employees.types';

import { InfoSection } from '../components/InfoSection';
import { HardSkillsInfoItem } from './HardSkillsInfoItem';

export const HardSkillsInfo = ({ skills }: { skills: EmployeeHardSkill[] }) => {
  const [t] = useTranslation();

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.hard_skills')}
    >
      <Grid
        gridTemplateColumns="repeat(auto-fill, 500px)"
        gap="10px"
      >
        {skills.map((skill) => (
          <HardSkillsInfoItem
            key={skill.id}
            skill={skill}
          />
        ))}
      </Grid>
    </InfoSection>
  );
};
