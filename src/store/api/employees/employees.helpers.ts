import { type EmployeesFilters } from '~/store/slices/employees/employees.types';

export const assignFilterParams = (
  params: URLSearchParams,
  filters: EmployeesFilters
) => {
  (Object.keys(filters) as (keyof EmployeesFilters)[]).forEach((key) => {
    switch (key) {
      case 'languages': {
        const value = filters[key];

        if (value) {
          value.forEach(({ level, name }) => {
            params.append(`${key}[][${name}]`, level || 'any');
          });
        }

        break;
      }

      case 'work_experience_start': {
        const value = filters[key];

        if (value) {
          params.append(`experience_years[min]`, `${value}`);
        }

        break;
      }

      case 'work_experience_end': {
        const value = filters[key];

        if (value) {
          params.append(`experience_years[max]`, `${value}`);
        }

        break;
      }

      default: {
        const value = filters[key];

        if (Array.isArray(value)) {
          value.forEach((item) => {
            params.append(`${key}[]`, `${item}`);
          });
          break;
        }

        if (value) {
          params.append(key, value);
        }
      }
    }
  });
};
