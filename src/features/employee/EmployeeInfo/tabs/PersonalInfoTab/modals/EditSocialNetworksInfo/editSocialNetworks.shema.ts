import { type z } from 'zod';

import { SocialNetworkSchema } from '~/store/api/employees/employees.schemas';

export const EditSocialNetworksSchema = SocialNetworkSchema;

export type EditSocialNetworksValues = z.infer<typeof EditSocialNetworksSchema>;
