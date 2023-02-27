import { useMemo } from 'react';

import { Grid, Text, useDisclosure } from '@chakra-ui/react';
import groupBy from 'lodash/groupBy';
import { useTranslation } from 'react-i18next';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { InfoSection } from '~/features/employee/EmployeeInfo/tabs/components/InfoSection';
import { HardSkillsInfoItem } from '~/features/employee/EmployeeInfo/tabs/SkillsTab/HardSkillsInfoItem';
import { EditEnvironmentInfoModal } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditEnvironmentInfo/EditEnvironmentInfoModal';
import { type CategoriesHardSkill } from '~/store/api/employees/employees.types';
import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const EnvironmentInfo = ({
  project,
  canEdit
}: {
  project: ProjectResponse;
  canEdit: boolean;
}) => {
  const { t } = useTranslation();
  const {
    isOpen: isOpenEnvironmentInfo,
    onOpen: onOpenEnvironmentInfo,
    onClose: onCloseEnvironmentInfo
  } = useDisclosure();

  const hardSkillsOnCategoryProjects = useMemo(
    () => groupBy(project.hard_skills, 'category'),
    [project.hard_skills]
  );

  const skillCategories = Object.keys(hardSkillsOnCategoryProjects);

  return (
    <InfoSection
      title={`${t(
        'domains:employee.titles.profile_tabs.work_experience.environment'
      )}`}
      onEdit={canEdit ? onOpenEnvironmentInfo : undefined}
    >
      <Grid gap="30px">
        {skillCategories.length ? (
          skillCategories.map((categoryName) => (
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
                {hardSkillsOnCategoryProjects[categoryName].map((skill) => (
                  <HardSkillsInfoItem
                    key={skill.id}
                    skill={skill}
                  />
                ))}
              </Grid>
            </Grid>
          ))
        ) : (
          <InfoSection style={{ gap: 0 }}>
            <Text color="brand.lightGray">
              {t('domains:employee.errors.no_data')}
            </Text>
          </InfoSection>
        )}
      </Grid>
      <EditEnvironmentInfoModal
        project={project}
        isOpenEnvironmentInfo={isOpenEnvironmentInfo}
        onCloseEnvironmentInfo={onCloseEnvironmentInfo}
      />
    </InfoSection>
  );
};
