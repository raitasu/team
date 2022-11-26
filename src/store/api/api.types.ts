import { z } from 'zod';

import { supportedLocales } from '~/services/i18n/i18n.constants';
import { RecordOf } from '~/shared/helpers.types';

export const TranslationSchema = RecordOf(
  supportedLocales,
  z.string().optional()
).extend({
  en: z.string()
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
