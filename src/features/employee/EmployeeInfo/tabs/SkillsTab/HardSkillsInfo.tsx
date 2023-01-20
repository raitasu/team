import { useMemo } from 'react';

import { Grid, Text, useDisclosure } from '@chakra-ui/react';
import groupBy from 'lodash/groupBy';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { isEditable } from '~/features/employee/employee.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import {
  type HardSkill,
  type CategoriesHardSkill
} from '~/store/api/employees/employees.types';

import { HardSkillsInfoItem } from './HardSkillsInfoItem';
import { EditHardSkillsInfo } from './modals/EditHardSkillsInfo/EditHardSkillsInfoModal';
import { InfoSection } from '../components/InfoSection';

export const HardSkillsInfo = ({
  skills,
  employeeId
}: {
  skills: HardSkill[];
  employeeId: number;
}) => {
  const [t] = useTranslation();

  const { data: currentUser } = useGetCurrentUserQuery();

  const {
    isOpen: isOpenHardSkillsInfo,
    onOpen: onOpenHardSkillsInfo,
    onClose: onCloseHardSkillsInfo
  } = useDisclosure();

  const hardSkillsOnCategory = useMemo(
    () => groupBy(skills, 'category'),
    [skills]
  );

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.hard_skills')}
      onEdit={
        isEditable(employeeId, currentUser) ? onOpenHardSkillsInfo : undefined
      }
    >
      <Grid gap="30px">
        {Object.keys(hardSkillsOnCategory).map(
          (categoryName) =>
            !!hardSkillsOnCategory[categoryName].filter((el) => el.is_show)
              .length && (
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
                  {hardSkillsOnCategory[categoryName].map(
                    (skill) =>
                      skill.is_show && (
                        <HardSkillsInfoItem
                          key={skill.id}
                          skill={skill}
                        />
                      )
                  )}
                </Grid>
              </Grid>
            )
        )}
      </Grid>
      <EditHardSkillsInfo
        skills={skills}
        isOpenHardSkillsInfo={isOpenHardSkillsInfo}
        onCloseHardSkillsInfo={onCloseHardSkillsInfo}
      />
    </InfoSection>
  );
};
