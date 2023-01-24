import { Grid, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP, ROW_GAP } from '~/features/employee/employee.styles';
import { isEditable } from '~/features/employee/employee.utils';
import { getTranslation } from '~/services/i18n/i18n.utils';
import { useGetCurrentUserQuery } from '~/store/api/authentication/authentication.api';
import { type SoftSkill } from '~/store/api/employees/employees.types';

import { EditSoftSkillsInfo } from './modals/EditSoftSkillsInfoInfo/EditSoftSkillsInfoModal';
import { InfoSection } from '../components/InfoSection';

export const SoftSkillsInfo = ({
  skills,
  employeeId
}: {
  skills: SoftSkill[];
  employeeId: number;
}) => {
  const [t, { language }] = useTranslation();

  const { data: currentUser } = useGetCurrentUserQuery();

  const {
    isOpen: isOpenSoftSkillsInfo,
    onOpen: onOpenSoftSkillsInfo,
    onClose: onCloseSoftSkillsInfo
  } = useDisclosure();

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.soft_skills')}
      onEdit={
        isEditable(employeeId, currentUser) ? onOpenSoftSkillsInfo : undefined
      }
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
      <EditSoftSkillsInfo
        skills={skills}
        isOpenSoftSkillsInfo={isOpenSoftSkillsInfo}
        onCloseSoftSkillsInfo={onCloseSoftSkillsInfo}
      />
    </InfoSection>
  );
};
