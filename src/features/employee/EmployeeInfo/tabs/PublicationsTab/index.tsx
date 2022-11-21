import { Box } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdAdd } from 'react-icons/md';

import { type Employee } from '~/shared/store/api/employees/employees.types';
import { Button } from '~/shared/ui/components/Button';

import { InfoSection } from '../components/InfoSection';
import { PublicationsInfoItem } from './PublicationsInfoItem';

export const PublicationsTab = ({ employee }: { employee: Employee }) => {
  const [t] = useTranslation();

  return (
    <Box>
      {employee.publications.map((publication) => (
        <PublicationsInfoItem
          key={publication.id}
          publication={publication}
        />
      ))}
      <InfoSection isEditable={false}>
        <Button
          variant="primaryOutline"
          outline="none"
          boxShadow="none"
          leftIcon={<MdAdd />}
          margin="auto"
        >
          {t('actions:employee.add_publication')}
        </Button>
      </InfoSection>
    </Box>
  );
};
