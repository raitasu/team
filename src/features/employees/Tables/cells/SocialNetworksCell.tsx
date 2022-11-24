import { Flex, Link } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { type IconType } from 'react-icons';
import { AiOutlineFacebook } from 'react-icons/ai';
import { BsDiscord, BsGithub } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import {
  SlSocialInstagram,
  SlSocialLinkedin,
  SlSocialVkontakte
} from 'react-icons/sl';

import {
  type EmployeeSocialNetwork,
  type ShortEmployee
} from '~/shared/store/api/employees/employees.types';

const SocialNetworkIcons: Record<keyof EmployeeSocialNetwork, IconType> = {
  linkedin: SlSocialLinkedin,
  github: BsGithub,
  facebook: AiOutlineFacebook,
  instagram: SlSocialInstagram,
  telegram: FaTelegramPlane,
  vk: SlSocialVkontakte,
  discord: BsDiscord
};

export const SocialNetworksCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['social_networks']>) => {
  const employeeNetworks = getValue();

  return (
    <Flex gap="10px">
      {(
        Object.keys(
          employeeNetworks
        ) as (keyof ShortEmployee['social_networks'])[]
      ).map((network) => {
        const NetworkIcon = SocialNetworkIcons[network];

        return (
          <Link
            key={network}
            href={employeeNetworks[network]}
            target="_blank"
            display="flex"
            alignItems="center"
            boxSize="20px"
            color="brand.ghostGray"
            _hover={{ color: 'brand.lightGray' }}
            _active={{ color: 'brand.ghostGray' }}
          >
            <NetworkIcon />
          </Link>
        );
      })}
    </Flex>
  );
};
