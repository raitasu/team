import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { businessDomains } from '~/features/employee/employee.constants';
import { type ProjectMainInfoFormValues } from '~/features/project/ProjectInfo/tabs/MainInformationTab/modals/EditMainInfo/EditMainInfo.schemas';
import { FormControl } from '~/shared/ui/components/FormControl';
import { Select } from '~/shared/ui/components/Select';

export const BusinessDomainField = () => {
  const [t] = useTranslation();
  const { field } = useController<ProjectMainInfoFormValues, 'business_domain'>(
    {
      name: 'business_domain'
    }
  );

  const { value: currentValue } = field;

  const businessDomainsOptions = businessDomains.map((domain, index) => ({
    value: String(index),
    label: t(`enums:business_domains.${domain}`)
  }));

  const selectedBusinessDomain = currentValue
    ? businessDomainsOptions.find(
        (item) =>
          +item.value ===
          businessDomains.findIndex((value) => value === currentValue.label)
      )
    : null;

  return (
    <FormControl label={t('domains:projects.business_domain')}>
      <Select
        placeholder={t('domains:filters.placeholders.placeholder_select')}
        options={businessDomainsOptions}
        value={selectedBusinessDomain}
        onChange={(option) => {
          if (option) {
            field.onChange(option);
          }
        }}
        size="md"
      />
    </FormControl>
  );
};
