import { AppLocale } from '~/services/i18n/i18n.types';

export type Translation = { en: string } & Partial<
  Record<Exclude<AppLocale, 'en'>, string>
>;

interface Paging {
  total_count: number;
  limit: number;
  offset: number;
}

export type PaginatedResponse<TData> = {
  items: TData[];
  paging: Paging;
};
