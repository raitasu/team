import { RootState } from '~/shared/store/store.types';

export const projectsSelector = (state: RootState) => state.projects.projects;
