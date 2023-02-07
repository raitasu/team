import { useEffect, useMemo } from 'react';

import { Grid, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import groupBy from 'lodash/groupBy';
import upperCase from 'lodash/upperCase';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { SIDE_PAGE_PADDING } from '~/shared/layout/layout.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { useSuccessToast } from '~/shared/ui/components/Toast';
import {
  type CategoriesHardSkill,
  type HardSkill
} from '~/store/api/employees/employees.types';
import { useUpdateHardSkillsMutation } from '~/store/api/hardSkills/hardSkills.api';

import {
  type EmployeeHardSkillsFormValues,
  HardSkillsInfoSchema
} from './EditHardSkillsInfo.schemas';
import { HardSkillCheckboxField } from './Fields/HardSkillCheckboxField';

export const EditHardSkillsInfo = ({
  isOpenHardSkillsInfo,
  onCloseHardSkillsInfo,
  skills
}: {
  skills: HardSkill[];
  isOpenHardSkillsInfo: boolean;
  onCloseHardSkillsInfo: () => void;
}) => {
  const [t] = useTranslation();
  const { id } = useParams();
  const [updateHardSkills] = useUpdateHardSkillsMutation();

  const methods = useForm<EmployeeHardSkillsFormValues>({
    defaultValues: { skills },
    mode: 'onBlur',
    resolver: zodResolver(HardSkillsInfoSchema)
  });

  const { reset } = methods;

  const hardSkillsOnCategory = useMemo(
    () => groupBy(skills, 'category'),
    [skills]
  );

  useEffect(() => {
    reset({ skills }, { keepDefaultValues: false });
  }, [reset, skills]);

  const toast = useSuccessToast({
    description: 'Information updated',
    variant: 'toast',
    position: 'bottom-left',
    containerStyle: {
      marginLeft: SIDE_PAGE_PADDING,
      marginBottom: '20px'
    },
    duration: 5000
  });

  return (
    <BaseModal
      autoFocus={false}
      title={upperCase(
        t('domains:employee.titles.profile_tabs.skills.hard_skills')
      )}
      isOpen={isOpenHardSkillsInfo}
      onClose={onCloseHardSkillsInfo}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px',
        maxHeight: '80%',
        overflow: 'auto'
      }}
      footer={
        <ActionsModalFooter
          onCancel={() => {
            onCloseHardSkillsInfo();
            methods.reset();
          }}
          onReset={() => methods.reset()}
          isValid={methods.formState.isValid}
          isTouched={methods.formState.isDirty}
          onSubmit={methods.handleSubmit((data) => {
            const changedVal = data.skills.filter((el) => el.is_show);

            updateHardSkills({ skills: changedVal, id: Number(id) })
              .then(onCloseHardSkillsInfo)
              .catch(onCloseHardSkillsInfo);

            toast();
          })}
          submitTag="save"
        />
      }
    >
      <FormProvider {...methods}>
        {Object.keys(hardSkillsOnCategory).map((categoryName) => (
          <Grid
            key={categoryName}
            rowGap={ROW_GAP}
            marginBottom="20px"
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
                <HardSkillCheckboxField
                  skill={skill}
                  key={skill.id}
                />
              ))}
            </Grid>
          </Grid>
        ))}
      </FormProvider>
    </BaseModal>
  );
};
