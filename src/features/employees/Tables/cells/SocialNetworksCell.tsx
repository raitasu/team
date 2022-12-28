import { type FunctionComponent, type SVGProps } from 'react';

import { Flex, Link, useClipboard } from '@chakra-ui/react';
import { type CellContext } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { SIDE_PAGE_PADDING } from '~/shared/layout/layout.constants';
import { IconButton } from '~/shared/ui/components/IconButton';
import { useSuccessToast } from '~/shared/ui/components/Toast';
import { Tooltip } from '~/shared/ui/components/Tooltip';
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
import { DISCORD_RE } from '../tables.constants';

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
  const [t] = useTranslation();
  const employeeNetworks = getValue();
  const { onCopy, setValue } = useClipboard('');

  const toast = useSuccessToast({
    description: 'ID Copied',
    variant: 'toast',
    position: 'bottom-left',
    containerStyle: {
      marginLeft: SIDE_PAGE_PADDING,
      marginBottom: '20px'
    },
    duration: 5000
  });

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

            const isDiscord = DISCORD_RE.test(link);

            return isDiscord ? (
              <Tooltip
                key={network}
                hasArrow
                place="top"
                labelText={t('general_actions:copy_id')}
              >
                <IconButton
                  icon={<NetworkIcon />}
                  aria-label={network}
                  onClick={() => {
                    setValue(link);
                    onCopy();
                    toast();
                  }}
                  sx={styles}
                  variant="iconButtonSmall"
                />
              </Tooltip>
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
