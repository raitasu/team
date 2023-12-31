import set from 'date-fns/set';

import { type PartialProject } from '~/features/project/CreateProjectModal/project.schema';

export const transformToFormDataForCreate = (
  body: FormData,
  filters: PartialProject
) => {
  (Object.keys(filters) as (keyof PartialProject)[]).forEach((key) => {
    switch (key) {
      case 'avatar': {
        const value = filters[key];

        if (value) {
          body.append(key, value);
        }

        break;
      }

      case 'startDate': {
        const value = filters[key];

        if (value) {
          const { year, month } = value;

          const newDate = set(new Date(), {
            year: year ? +year : 0,
            month: month ? +month : 0
          });

          body.append('started_at', newDate.toISOString());
        }

        break;
      }

      case 'endDate': {
        const value = filters[key];

        if (value) {
          const { year, month } = value;

          const newDate = set(new Date(), {
            year: year ? +year : 0,
            month: month ? +month : 0
          });

          body.append('ended_at', newDate.toISOString());
        }

        break;
      }

      case 'managers': {
        const value = filters[key];

        if (value) {
          value.forEach((item) => {
            body.append(`${key}[]`, item.value || '');
          });
        }

        break;
      }

      case 'company_name': {
        const value = filters[key];

        if (value) {
          body.append('customer_id', value.value || '');
        }

        break;
      }

      default: {
        const value = filters[key];

        if (value) {
          body.append(key, value);

          break;
        }
      }
    }
  });
};
