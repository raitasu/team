import { Flex } from '@chakra-ui/react';

import { type EmployeeCv } from '~/store/api/employees/employees.types';

import { CvThumbnail } from './CvThumbnail';

export const CvSection = ({ cvList }: { cvList: EmployeeCv[] }) => (
  <Flex
    flexDirection="column"
    gap="20px"
  >
    {cvList.map((cv) => (
      <CvThumbnail
        key={cv.id}
        cv={cv}
      />
    ))}
  </Flex>
);
