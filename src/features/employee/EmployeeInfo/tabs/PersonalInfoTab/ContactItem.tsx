import { useEffect } from 'react';

import { Box, Flex, Link, Text, useClipboard } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MdOutlineContentCopy } from 'react-icons/md';

import {
  COLUMN_GAP,
  LEFT_COLUMN_WIDTH,
  ROW_GAP
} from '~/features/employee/employee.styles';
import { toastConfig } from '~/shared/shared.constants';
import { IconButton } from '~/shared/ui/components/IconButton';
import { useSuccessToast } from '~/shared/ui/components/Toast';
import { Tooltip } from '~/shared/ui/components/Tooltip';
import { getPrefixedHref, type LinkType } from '~/shared/utils/links.utils';

const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '12px',
  width: '12px',
  height: '12px',
  color: 'brand.headline2',
  _hover: { color: 'brand.lightGray' },
  _active: { color: 'brand.ghostGray' }
};

export const ContactItem = ({
  name,
  link,
  linkType,
  canCopy
}: {
  name?: string;
  link?: string;
  linkType?: LinkType;
  canCopy?: boolean;
}) => {
  const [t] = useTranslation();
  const { onCopy, hasCopied } = useClipboard(link || '');

  const toast = useSuccessToast({ ...toastConfig });

  useEffect(() => {
    if (hasCopied) {
      toast({
        description: `${name || 'Social network'} ${t(
          'domains:global.confirmations.descriptions.link_copied'
        )}`
      });
    }
  }, [hasCopied, name, t, toast]);

  return (
    <Flex gap={COLUMN_GAP}>
      <Text
        width={LEFT_COLUMN_WIDTH}
        color="brand.headline2"
      >
        {name}
      </Text>
      <Flex
        flexDirection="column"
        gap={ROW_GAP}
      >
        <Flex gap={ROW_GAP}>
          {linkType ? (
            <Link
              href={getPrefixedHref(link || '', linkType)}
              target="_blank"
            >
              <Text>{link}</Text>
            </Link>
          ) : (
            <Text>{link}</Text>
          )}
          {canCopy && link ? (
            <Tooltip
              hasArrow
              place="top"
              labelText={t('general_actions:copy')}
              maxWidth="min-content"
            >
              <IconButton
                icon={<MdOutlineContentCopy />}
                aria-label={link}
                onClick={onCopy}
                sx={styles}
                variant="iconButtonSmall"
              />
            </Tooltip>
          ) : null}
        </Flex>
      </Flex>
      <Box />
    </Flex>
  );
};
