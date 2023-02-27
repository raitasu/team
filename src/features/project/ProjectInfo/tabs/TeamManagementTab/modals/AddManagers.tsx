import { useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { toastConfig } from '~/shared/shared.constants';
import { BaseModal } from '~/shared/ui/components/BaseModal';
import { ActionsModalFooter } from '~/shared/ui/components/BaseModal/ActionsModalFooter';
import { FormControl } from '~/shared/ui/components/FormControl';
import { AsyncSelect } from '~/shared/ui/components/Select';
import { useErrorToast, useSuccessToast } from '~/shared/ui/components/Toast';
import { useLazyGetEmployeesQuery } from '~/store/api/employees/employees.api';
import { useAddManagerMutation } from '~/store/api/projects/projects.api';

export const AddManagers = ({
  isOpen,
  onCloseTab,
  projectIdNumber
}: {
  isOpen: boolean;
  onCloseTab: () => void;
  projectIdNumber: number;
}) => {
  const [t] = useTranslation();

  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    value: number;
  } | null>(null);

  const [addNewManager, { isLoading }] = useAddManagerMutation();

  const errorToast = useErrorToast(toastConfig);
  const successToast = useSuccessToast(toastConfig);

  const closeModal = () => {
    setSelectedOption(null);
    onCloseTab();
  };

  const addNewManagerToTeam = async (values: number) => {
    try {
      await addNewManager({ projectId: projectIdNumber, id: values }).unwrap();
      successToast({
        description: t('domains:global.confirmations.descriptions.saved')
      });
      closeModal();
    } catch (e) {
      console.error(e);
      errorToast({
        description: t('domains:global.errors.descriptions.unknown_error')
      });
    }
  };

  const [trigger] = useLazyGetEmployeesQuery();

  const loadEmployeeOptions = useCallback(
    async (inputValue: string) => {
      const data = await trigger({
        page: 1,
        elementsPerPage: 100,
        filters: {
          name: inputValue
        }
      }).unwrap();

      return data.items.map((employee) => ({
        value: employee.id,
        label: `${employee.first_name} ${employee.last_name}`
      }));
    },
    [trigger]
  );

  return (
    <BaseModal
      autoFocus={false}
      title={t(
        'domains:projects.titles.project_tabs.team_management.add_manager'
      ).toUpperCase()}
      isOpen={isOpen}
      onClose={closeModal}
      shouldUseOverlay
      isCentered
      contentProps={{
        maxWidth: '688px',
        justifyContent: 'flex-end'
      }}
      footer={
        <ActionsModalFooter
          onCancel={closeModal}
          onSubmit={() =>
            selectedOption ? addNewManagerToTeam(selectedOption.value) : null
          }
          isValid={Boolean(selectedOption && selectedOption.value)}
          isTouched={Boolean(selectedOption && selectedOption.value)}
          submitTag="add"
          isLoading={isLoading}
          variantButton="secondaryGhost"
        />
      }
    >
      <FormControl
        label={t(
          'domains:projects.titles.project_tabs.team_management.name_manager'
        )}
      >
        <AsyncSelect
          placeholder={t('general_placeholders:select')}
          loadOptions={loadEmployeeOptions}
          onChange={(option) => {
            if (option) {
              setSelectedOption(option);
            }
          }}
          value={selectedOption}
          defaultOptions
          cacheOptions
          isMulti={false}
          size="md"
        />
      </FormControl>
    </BaseModal>
  );
};
