export const ProjectsHeaderIds = {
  CompanyName: 'company_name',
  ProjectName: 'project_name',
  Status: 'status',
  Type: 'type',
  Team: 'team',
  Actions: 'actions'
} as const;

export enum ProjectStatus {
  InProgress = 'in_progress',
  OnHold = 'on_hold',
  Completed = 'completed',
  Wasted = 'wasted'
}

export enum ProjectType {
  Internal = 'internal',
  External = 'external'
}
