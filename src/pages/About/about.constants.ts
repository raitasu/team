import snakeCase from 'lodash/snakeCase';

import { PagePaths } from '~/router/router.constants';
import { type DashToSnakeCase } from '~/shared/helpers.types';

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
  translationTag: `navigation:about_sections.${
    snakeCase(section) as DashToSnakeCase<typeof section>
  }` as const
}));

export const hoverNavLinkStyles = {
  backgroundColor: 'brand.ghostWhite'
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
    definition: 'domains:about_sections.text.discord.cyberassist'
  },
  {
    term: 'Booklovers',
    definition: 'domains:about_sections.text.discord.booklovers'
  },
  {
    term: 'General',
    definition: 'domains:about_sections.text.discord.general'
  },
  {
    term: 'Meetups',
    definition: 'domains:about_sections.text.discord.meetups'
  },
  {
    term: 'Thanks',
    definition: 'domains:about_sections.text.discord.thanks'
  },
  {
    term: 'Random',
    definition: 'domains:about_sections.text.discord.random'
  },
  {
    term: 'Relocate',
    definition: 'domains:about_sections.text.discord.relocate'
  },
  {
    term: 'CG-branches',
    definition: 'domains:about_sections.text.discord.cg_branches'
  }
] as const;
