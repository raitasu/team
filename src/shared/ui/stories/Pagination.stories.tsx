import { useState } from 'react';

import { Pagination } from '~/shared/layout/Pagination';

export default {
  title: 'UI/Pagination',
  component: Pagination
};

export const Variants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalPages = 6;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      onPageChange={setCurrentPage}
    />
  );
};
