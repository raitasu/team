import snakeCase from 'lodash/snakeCase';

import { PagePaths } from '~/router/router.constants';
import { DashToSnakeCase } from '~/shared/helpers.types';

export const OnboardingSections = {
  About: 'about',
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

export const onboardingLinks = Object.values(OnboardingSections).map(
  (section) => ({
    target: `${PagePaths.Onboarding}/${section}`,
    translationTag: `navigation:onboarding.${
      snakeCase(section) as DashToSnakeCase<typeof section>
    }` as const
  })
);

export const hoverLinkStyles = {
  textDecoration: 'underline',
  textDecorationColor: 'brand.accentRed'
};

export const activeLinkStyles = {
  color: 'brand.accentRed'
};

export const socialLinks = [
  {
    target: 'https://cybergizer.com/',
    tag: '«Cybergizer»'
  },
  {
    target: 'http://www.linkedin.com/',
    tag: '«LinkedIn»'
  },
  {
    target: 'http://www.instagram.com/',
    tag: '«Instagram»'
  }
];
