import { z } from 'zod';

import { Patterns } from '~/store/api/api.constants';
import { SocialNetworkSchema } from '~/store/api/employees/employees.schemas';

import { socialFieldsNames } from './EditSocialNetworks.constants';

const PatternsSocialNetwork = {
  linkedin: Patterns.Linkedin,
  github: Patterns.GitHub,
  discord: Patterns.Discord,
  telegram: Patterns.Telegram,
  facebook: Patterns.Facebook,
  instagram: Patterns.Instagram,
  vk: Patterns.VKontakte
};

export const EditSocialNetworksSchema = SocialNetworkSchema.superRefine(
  (data, ctx) => {
    for (const key of socialFieldsNames) {
      const regExp = new RegExp(PatternsSocialNetwork[key]);

      const networkValue = data[key]?.toString();

      if (networkValue && !regExp.test(networkValue)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${key}`,
          path: [`${key}`]
        });
      }
    }
  }
);

export type EditSocialNetworksValues = z.infer<typeof EditSocialNetworksSchema>;
