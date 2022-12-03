export const getTotalPages = (totalCount: number, elementsPerPage: number) =>
  Math.ceil(totalCount / elementsPerPage) || 1;

export const getPageOffset = (page: number, elementsPerPage: number) => {
  if (page < 1) {
    throw new Error('Incorrect page numbers!');
  }

  return elementsPerPage * (page - 1);
};
