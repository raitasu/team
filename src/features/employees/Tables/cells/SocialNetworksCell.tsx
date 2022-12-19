import { type FunctionComponent, type SVGProps } from 'react';

import { Flex, Link, useClipboard } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';

import { IconButton } from '~/shared/ui/components/IconButton';
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

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSize: '24px',
  color: 'brand.darkGray',
  _hover: { color: 'brand.lightGray' },
  _active: { color: 'brand.ghostGray' }
};

export const SocialNetworksCell = ({
  getValue
}: CellContext<ShortEmployee, ShortEmployee['social_networks']>) => {
  const employeeNetworks = getValue();
  const { onCopy, setValue } = useClipboard('');

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

            const isDiscord = /\w+#\d{4}/i.test(link);

            return isDiscord ? (
              <IconButton
                key={network}
                icon={<NetworkIcon />}
                aria-label={network}
                onClick={() => {
                  setValue(link);
                  onCopy();
                }}
                sx={styles}
                variant="iconButtonSmall"
              />
            ) : (
              <Link
                key={network}
                href={link}
                target="_blank"
                sx={styles}
              >
                <NetworkIcon />
              </Link>
            );
          })
        : '-'}
    </Flex>
  );
};
