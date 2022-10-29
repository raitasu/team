import { Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdFirstPage,
  MdLastPage
} from 'react-icons/md';

import { IconButton } from '~/shared/ui/components/IconButton';
import { NumberInput } from '~/shared/ui/components/NumberInput';
import { Select } from '~/shared/ui/components/Select';

const options = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' },
  { value: 50, label: '50' }
];

export const Pagination = ({
  totalPages,
  currentPage,
  onPageSizeChange,
  onPageChange,
  pageSize
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
}) => {
  const [t] = useTranslation();

  const ariaLabel = `${t('titles:pagination.current_page')}, ${t(
    'titles:pagination.page'
  )} ${currentPage}`;

  return (
    <Flex
      role="navigation"
      width="800px"
      justifyContent="space-evenly"
      alignItems="center"
      justifySelf="center"
    >
      <Flex>
        <IconButton
          variant="iconButton"
          aria-label={ariaLabel}
          aria-current
          onClick={() => {
            onPageChange(1);
          }}
          isDisabled={currentPage === 1}
          icon={<MdFirstPage size={3} />}
          boxShadow="none"
          bg="transparent"
          _hover={{ boxShadow: 'none' }}
          _active={{ boxShadow: 'none' }}
          _disabled={{
            boxShadow: 'none',
            color: 'brand.lightGray',
            cursor: 'not-allowed'
          }}
          mr={4}
        />
        <IconButton
          variant="iconButton"
          aria-label={ariaLabel}
          aria-current
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
          isDisabled={currentPage === 1}
          icon={<MdArrowBackIosNew size={6} />}
          boxShadow="none"
          bg="transparent"
          _hover={{ boxShadow: 'none' }}
          _active={{ boxShadow: 'none' }}
          _disabled={{
            boxShadow: 'none',
            color: 'brand.lightGray',
            cursor: 'not-allowed'
          }}
        />
      </Flex>
      <Flex alignItems="center">
        <Text
          flexShrink="0"
          mr={8}
        >
          {t('titles:pagination.page')}{' '}
          <Text
            fontWeight="bold"
            as="span"
          >
            {currentPage}
          </Text>{' '}
          {t('titles:pagination.of')}{' '}
          <Text
            fontWeight="bold"
            as="span"
          >
            {totalPages}
          </Text>
        </Text>
        <Text flexShrink="0">{t('actions:general.go_to_page')}:</Text>{' '}
        <NumberInput
          value={currentPage}
          min={1}
          max={totalPages}
          width="76px"
          marginLeft="8px"
          marginRight="20px"
          onChange={(e) => {
            const page = Number(e);

            if (page >= 1) {
              onPageChange(page);
            }
          }}
          defaultValue={1}
        />
        <Select
          value={{ value: pageSize, label: `${pageSize}` }}
          options={options}
          onChange={(e) => {
            if (e !== null) onPageSizeChange(e.value);
          }}
          menuPlacement="top"
        />
      </Flex>
      <Flex>
        <IconButton
          variant="iconButton"
          aria-label={ariaLabel}
          aria-current
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
          isDisabled={currentPage === totalPages}
          icon={<MdArrowForwardIos size={6} />}
          boxShadow="none"
          bg="transparent"
          _hover={{ boxShadow: 'none' }}
          _active={{ boxShadow: 'none' }}
          _disabled={{
            boxShadow: 'none',
            color: 'brand.lightGray',
            cursor: 'not-allowed'
          }}
        />
        <IconButton
          variant="iconButton"
          aria-label={ariaLabel}
          aria-current
          onClick={() => {
            onPageChange(totalPages);
          }}
          isDisabled={currentPage === totalPages}
          icon={<MdLastPage size={3} />}
          ml={4}
          boxShadow="none"
          bg="transparent"
          _hover={{ boxShadow: 'none' }}
          _active={{ boxShadow: 'none' }}
          _disabled={{
            boxShadow: 'none',
            color: 'brand.lightGray',
            cursor: 'not-allowed'
          }}
        />
      </Flex>
    </Flex>
  );
};
