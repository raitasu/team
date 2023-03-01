import { getMonth, getYear } from 'date-fns';

import { type WorkExperiencePositions } from '~/store/api/projects/projects.schemas';

export const getInitialState = (
  workExperiencePositions: Array<WorkExperiencePositions | null>
) => ({
  work_experience_positions: workExperiencePositions.map((item) => ({
    position_id: item?.position_id || null,
    start_date: {
      month: item?.start_date
        ? String(getMonth(new Date(item.start_date)))
        : null,
      year: item?.start_date ? String(getYear(new Date(item.start_date))) : null
    },
    end_date: {
      month: item?.end_date ? String(getMonth(new Date(item.end_date))) : null,
      year: item?.end_date ? String(getYear(new Date(item.end_date))) : null
    },
    work_experience_id: item?.work_experience_id,
    id: item?.id
  }))
});
