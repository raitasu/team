export type PaginatedResponse<TData> = {
  items: TData[];
  page: {
    total_count: number;
    limit: number;
    offset: number;
  };
};
