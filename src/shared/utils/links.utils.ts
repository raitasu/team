export type LinkType = 'phone' | 'email' | 'web';

function getLinkPrefix(type?: LinkType) {
  switch (type) {
    case 'email':
      return 'mailto:';
    case 'phone':
      return 'tel:';
    default:
      return '';
  }
}

export function getPrefixedHref(link: string, linkType?: LinkType) {
  return `${getLinkPrefix(linkType)}${link}`;
}
