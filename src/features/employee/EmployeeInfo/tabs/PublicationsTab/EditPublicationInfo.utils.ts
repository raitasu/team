import { Patterns } from '~/store/api/api.constants';
import { type EmployeePublication } from '~/store/api/employees/employees.types';

export const getInitialState = (publication: EmployeePublication) => ({
  name: publication.name,
  description: publication.description,
  url: publication.url || null,
  file: publication.file
    ? `${import.meta.env.VITE_GALLERY_BASE_URL}${publication.file}`
    : null,
  start_date: publication.start_date
});

export const initialPublicationValues = () => ({
  name: null,
  description: null,
  url: null,
  file: null,
  start_date: null
});

export const isValidUrl = (url: string) => {
  const urlPattern = new RegExp(Patterns.URL as unknown as RegExp);

  return urlPattern.test(url);
};
