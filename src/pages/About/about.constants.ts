import snakeCase from 'lodash/snakeCase';

import { PagePaths } from '~/router/router.constants';
import type { DashToSnakeCase } from '~/shared/helpers.types';

export const AboutSections = {
  About: 'company',
  Discord: 'discord',
  Memento: 'memento',
  Schedule: 'schedule',
  SickLeave: 'sick-leave',
  Vacation: 'vacation',
  Perks: 'perks',
  Coworking: 'coworking',
  Help: 'help',
  Birthdays: 'birthdays',
  English: 'english',
  Communications: 'communications',
  Contacts: 'contacts'
} as const;

export const aboutLinks = Object.values(AboutSections).map((section) => ({
  target: `${PagePaths.About}/${section}`,
  translationTag: `navigation:about.${
    snakeCase(section) as DashToSnakeCase<typeof section>
  }` as const
}));

export const hoverNavLinkStyles = {
  textDecoration: 'underline',
  textDecorationColor: 'brand.accentRed'
};

export const activeNavLinkStyles = {
  color: 'brand.accentRed'
};

export const activeLinkStyles = {
  color: 'brand.headline2'
};

export const socialLinks = [
  {
    target: 'https://cybergizer.com/',
    tag: '«Cybergizer»'
  },
  {
    target: 'https://www.linkedin.com/company/cybergizer/mycompany/',
    tag: '«LinkedIn»'
  },
  {
    target: 'https://www.instagram.com/cybergizer/',
    tag: '«Instagram»'
  }
];

export const descriptionItems = [
  {
    term: 'Cyberassist',
    definition: 'text:about.discord.cyberassist'
  },
  {
    term: 'Booklovers',
    definition: 'text:about.discord.booklovers'
  },
  {
    term: 'General',
    definition: 'text:about.discord.general'
  },
  {
    term: 'Meetups',
    definition: 'text:about.discord.meetups'
  },
  {
    term: 'Thanks',
    definition: 'text:about.discord.thanks'
  },
  {
    term: 'Random',
    definition: 'text:about.discord.random'
  },
  {
    term: 'Relocate',
    definition: 'text:about.discord.relocate'
  },
  {
    term: 'CG-branches',
    definition: 'text:about.discord.CG_branches'
  }
] as const;
