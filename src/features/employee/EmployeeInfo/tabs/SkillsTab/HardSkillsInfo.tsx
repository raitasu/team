import { useMemo } from 'react';

import { Grid, Text } from '@chakra-ui/react';
import groupBy from 'lodash/groupBy';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import {
  type CategoriesHardSkill,
  type HardSkill
} from '~/store/api/employees/employees.types';

import { HardSkillsInfoItem } from './HardSkillsInfoItem';
import { InfoSection } from '../components/InfoSection';

export const HardSkillsInfo = ({ skills }: { skills: HardSkill[] }) => {
  const [t] = useTranslation();

  const hardSkillsOnCategory = useMemo(
    () => groupBy(skills, 'category'),
    [skills]
  );

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.hard_skills')}
    >
      <Grid gap="30px">
        {Object.keys(hardSkillsOnCategory).map((categoryName) => (
          <Grid
            key={categoryName}
            gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
          >
            <Text
              color="brand.ghostGray"
              fontWeight={500}
              variant="l"
            >
              {t(
                `domains:employee.titles.profile_tabs.skills.category.${
                  categoryName as CategoriesHardSkill
                }`
              )}
            </Text>
            <Grid
              gridTemplateColumns={`${LEFT_COLUMN_WIDTH} 1fr`}
              columnGap={COLUMN_GAP}
              rowGap={ROW_GAP}
            >
              {hardSkillsOnCategory[categoryName].map((skill) => (
                <HardSkillsInfoItem
                  key={skill.id}
                  skill={skill}
                />
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </InfoSection>
  );
};
