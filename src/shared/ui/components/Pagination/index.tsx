import { Flex } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  MdArrowBackIosNew,
  MdArrowForwardIos,
  MdFirstPage,
  MdLastPage
} from 'react-icons/md';

import { ControlButton } from '~/shared/ui/components/IconButton/ControlButton';
import { PageSwitcher } from '~/shared/ui/components/Pagination/PageSwitcher';
import { PaginationProps } from '~/shared/ui/components/Pagination/pagination.types';

export const Pagination = ({
  totalPages,
  currentPage,
  onPageSizeChange,
  onPageChange,
  pageSize
}: PaginationProps) => {
  const [t] = useTranslation();

  const ariaLabel = t('titles:pagination.aria_label', {
    current: currentPage
  });

  return (
    <Flex
      role="navigation"
      width="800px"
      justifyContent="space-evenly"
      alignItems="center"
      justifySelf="center"
    >
      <Flex gap={4}>
        <ControlButton
          aria-label={ariaLabel}
          isDisabled={currentPage === 1}
          icon={<MdFirstPage size={3} />}
          onClick={() => {
            onPageChange(1);
          }}
        />
        <ControlButton
          aria-label={ariaLabel}
          isDisabled={currentPage === 1}
          icon={<MdArrowBackIosNew size={6} />}
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        />
      </Flex>
      <PageSwitcher
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        onPageSizeChange={onPageSizeChange}
      />
      <Flex gap={4}>
        <ControlButton
          aria-label={ariaLabel}
          isDisabled={currentPage === totalPages}
          icon={<MdArrowForwardIos size={6} />}
          onClick={() => {
            onPageChange(Number(currentPage) + 1);
          }}
        />
        <ControlButton
          aria-label={ariaLabel}
          isDisabled={currentPage === totalPages}
          icon={<MdLastPage size={3} />}
          onClick={() => {
            onPageChange(totalPages);
          }}
        />
      </Flex>
    </Flex>
  );
};
