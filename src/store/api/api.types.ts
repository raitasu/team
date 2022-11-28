import { z } from 'zod';

import { supportedLocales } from '~/services/i18n/i18n.constants';
import { createRecordOf } from '~/shared/helpers.zod';

export const TranslationSchema = createRecordOf(
  supportedLocales,
  z.string().min(1).optional()
).extend({
  en: z.string().min(1)
});

export type Translation = z.infer<typeof TranslationSchema>;

export type PaginatedResponse<TData> = {
  items: TData[];
  page: {
    total_count: number;
    limit: number;
    offset: number;
  };
};
