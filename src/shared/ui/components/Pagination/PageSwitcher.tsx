import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { NumberInput } from '~/shared/ui/components/NumberInput';
import { type PaginationProps } from '~/shared/ui/components/Pagination/pagination.types';
import { Select } from '~/shared/ui/components/Select';

const options = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' }
];

export const PageSwitcher = ({
  totalPages,
  currentPage,
  onPageSizeChange,
  onPageChange,
  pageSize
}: PaginationProps) => {
  const [t] = useTranslation();

  return (
    <Flex alignItems="center">
      <Text
        display={{ base: 'none', md: 'block' }}
        flexShrink="0"
        mr={8}
        sx={{
          '> span': {
            margin: '0 4px',
            fontWeight: 'bold'
          }
        }}
        dangerouslySetInnerHTML={{
          __html: t('domains:pagination.titles.current_page', {
            current: currentPage,
            total: totalPages
          })
        }}
      />
      <Text
        display={{ base: 'none', md: 'block' }}
        flexShrink="0"
      >{`${t('domains:pagination.actions.go_to_page')}:`}</Text>
      <NumberInput
        value={currentPage}
        min={1}
        max={totalPages}
        width="76px"
        marginLeft="8px"
        marginRight="40px"
        onChange={(e) => {
          const page = Number(e);

          if (page >= 1) {
            onPageChange(page);
          }
        }}
        defaultValue={1}
      />
      <Text
        display={{ base: 'none', md: 'block' }}
        flexShrink="0"
        marginRight="8px"
      >{`${t('domains:pagination.titles.show_label')}:`}</Text>
      <Select
        value={{ value: pageSize, label: `${pageSize}` }}
        options={options}
        onChange={(e) => {
          if (e !== null) onPageSizeChange(e.value);
          onPageChange(1);
        }}
        menuPlacement="top"
      />
    </Flex>
  );
};
