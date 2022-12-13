import { Link, type LinkProps } from '@chakra-ui/react';

import { getPrefixedHref, type LinkType } from '~/shared/utils/links.utils';

export const TableLink = ({
  link,
  linkType,
  ...props
}: LinkProps & {
  link: string | null;
  linkType?: LinkType;
}) => {
  if (!link) {
    return <span>-</span>;
  }

  return (
    <Link
      {...props}
      href={getPrefixedHref(link, linkType)}
      color="brand.ghostGray"
      _hover={{ color: 'brand.lightGray' }}
      _active={{ color: 'brand.ghostGray' }}
    >
      {link}
    </Link>
  );
};
