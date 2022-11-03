export const getTotalPages = (totalCount: number, elementsPerPage: number) =>
  Math.ceil(totalCount / elementsPerPage);

export const getPageOffset = (page: number, elementsPerPage: number) =>
  elementsPerPage * (page - 1);
