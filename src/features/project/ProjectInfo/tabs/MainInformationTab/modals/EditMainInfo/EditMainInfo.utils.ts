import { getMonth, getYear } from 'date-fns';

import { type ProjectResponse } from '~/store/api/projects/projects.types';

export const getInitialState = (project: ProjectResponse) => ({
  avatar: project.avatar || '',
  customer_name: project.customer?.name || '',
  name: project.name || '',
  status: project.status,
  project_type: project.project_type,
  started_at: {
    month: project.started_at
      ? getMonth(new Date(project.started_at)).toString()
      : null,
    year: project.started_at
      ? getYear(new Date(project.started_at)).toString()
      : null
  },
  ended_at: {
    year: project.ended_at
      ? getYear(new Date(project.ended_at)).toString()
      : null,
    month: project.ended_at
      ? getMonth(new Date(project.ended_at)).toString()
      : null
  },
  country_id: project.country ? project.country.id : null,
  business_domain: project.business_domain
    ? {
        label: project.business_domain,
        value: project.id.toString()
      }
    : null,
  hard_skill_ids: project.hard_skills
    ? project.hard_skills.map((item) => item.id)
    : [],
  description: project.description || '',
  challenge: project.challenge || '',
  solution: project.solution || ''
});
