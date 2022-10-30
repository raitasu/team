export type Translation = { en: string } & Partial<Record<string, string>>;

interface Paging {
  total_count: number;
  limit: number;
  offset: number;
}

export type PaginatedResponse<TData> = {
  items: TData[];
  paging: Paging;
};
