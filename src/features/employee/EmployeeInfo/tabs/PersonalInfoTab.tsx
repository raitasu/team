import { MdAdd } from 'react-icons/md';

import type { EmployeeInfoTab } from '~/features/employee/EmployeeInfo/employeeInfo.types';
import { Button } from '~/shared/ui/components/Button';

import { InfoSection } from './components/InfoSection';

export const PersonalInfoTab: EmployeeInfoTab = ({ employee }) => (
  <div>
    <InfoSection title="Section title">
      <p>{employee.date_of_birth}</p>
      <p>{employee.start_career_at}</p>
    </InfoSection>
    <InfoSection>
      <Button
        m="auto"
        variant="primaryOutline"
        outline="none"
        boxShadow="none"
        leftIcon={<MdAdd />}
      >
        Button
      </Button>
    </InfoSection>
  </div>
);
