import { Grid, Text, useDisclosure } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { COLUMN_GAP, ROW_GAP } from '~/features/employee/employee.styles';
import { type SoftSkill } from '~/store/api/employees/employees.types';

import { EditSoftSkillsInfo } from './modals/EditSoftSkillsInfoInfo/EditSoftSkillsInfoModal';
import { InfoSection } from '../components/InfoSection';

export const SoftSkillsInfo = ({
  skills,
  canEdit
}: {
  skills: SoftSkill[];
  canEdit: boolean;
}) => {
  const [t] = useTranslation();

  const {
    isOpen: isOpenSoftSkillsInfo,
    onOpen: onOpenSoftSkillsInfo,
    onClose: onCloseSoftSkillsInfo
  } = useDisclosure();

  return (
    <InfoSection
      title={t('domains:employee.titles.profile_tabs.skills.soft_skills')}
      onEdit={canEdit ? onOpenSoftSkillsInfo : undefined}
    >
      <Grid
        gridTemplateColumns="repeat(auto-fill, 240px)"
        columnGap={COLUMN_GAP}
        rowGap={ROW_GAP}
      >
        {skills.map((skill) => (
          <Text key={skill.id}>{skill.name}</Text>
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
