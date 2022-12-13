import { type FunctionComponent, type SVGProps } from 'react';

import { Flex, Link } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';

import {
  type ShortEmployee,
  type SocialNetwork
} from '~/store/api/employees/employees.types';

import { ReactComponent as DiscordIcon } from '../assets/discord.svg';
import { ReactComponent as FacebookIcon } from '../assets/facebook.svg';
import { ReactComponent as GitHubIcon } from '../assets/github.svg';
import { ReactComponent as InstagramIcon } from '../assets/instagram.svg';
import { ReactComponent as LinkedinIcon } from '../assets/linkedin.svg';
import { ReactComponent as TelegramIcon } from '../assets/telegram.svg';
import { ReactComponent as VkIcon } from '../assets/vk.svg';

const SocialNetworkIcons: Record<
  keyof SocialNetwork,
  FunctionComponent<SVGProps<SVGSVGElement>>
> = {
  linkedin: LinkedinIcon,
  github: GitHubIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  vk: VkIcon,
  discord: DiscordIcon
};

export const SocialNetworksCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['social_networks']>) => {
  const employeeNetworks = getValue();

  return (
    <Flex gap="10px">
      {employeeNetworks
        ? (
            Object.keys(
              employeeNetworks
            ) as (keyof ShortEmployee['social_networks'])[]
          ).map((network) => {
            const NetworkIcon: FunctionComponent<SVGProps<SVGSVGElement>> =
              SocialNetworkIcons[network];
            const link: string = employeeNetworks[network];

            if (!link) {
              return null;
            }

            return (
              <Link
                key={network}
                href={link}
                target="_blank"
                display="flex"
                alignItems="center"
                justify-content="center"
                boxSize="24px"
                color="brand.ghostGray"
                _hover={{ color: 'brand.lightGray' }}
                _active={{ color: 'brand.ghostGray' }}
              >
                <NetworkIcon />
              </Link>
            );
          })
        : '-'}
    </Flex>
  );
};
