import { socialFieldsNames } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditSocialNetworksInfo/EditSocialNetworks.constants';
import { type EditSocialNetworksValues } from '~/features/employee/EmployeeInfo/tabs/PersonalInfoTab/modals/EditSocialNetworksInfo/EditSocialNetworks.schema';
import { type SocialNetwork } from '~/store/api/employees/employees.types';

export const getInitialState = (
  networks: SocialNetwork
): EditSocialNetworksValues =>
  socialFieldsNames.reduce((acc, network) => {
    acc[network] = networks[network];

    return acc;
  }, {} as EditSocialNetworksValues);
