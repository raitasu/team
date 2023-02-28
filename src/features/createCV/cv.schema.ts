import { z } from 'zod';

const CVPublicationSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  start_date: z.string(),
  description: z.string(),
  file: z.string().or(z.instanceof(File)).nullable()
});

const CVCertificateSchema = z.object({
  id: z.number(),
  name: z.string(),
  issued_by: z.string(),
  start_date: z.string(),
  link: z.string(),
  end_date: z.string(),
  file: z.string().or(z.instanceof(File)).nullable()
});

const CVEducationSchema = z.object({
  id: z.number(),
  university_name: z.string(),
  speciality: z.string(),
  started_at: z.string(),
  graduated_at: z.string().nullable(),
  country: z.string(),
  degree: z.string()
});

const CVWorkExperienceSchema = z.object({
  id: z.number(),
  project_name: z.string(),
  company_name: z.string(),
  description: z.string(),
  responsibilities: z.string(),
  environment: z.string(),
  position: z.string(),
  started_at: z.string(),
  ended_at: z.string()
});

const CVSoftSkillSchema = z.object({
  id: z.number(),
  name: z.string()
});

const CVHardSkillSchema = z.object({
  name: z.string(),
  years_of_experience: z.string()
});

const CVLanguageSchema = z.object({
  id: z.number(),
  name: z.string()
});

export const CVSchema = z.object({
  name: z.string(),
  id: z.number(),
  link: z.string(),
  profile: z.object({
    id: z.number(),
    name: z.string(),
    projects_count: z.string(),
    years_of_experience: z.string(),
    avatar: z.string().nullable(),
    position: z.string().nullable(),
    description: z.string(),
    languages: CVLanguageSchema.array(),
    hard_skills: CVHardSkillSchema.array(),
    soft_skills: CVSoftSkillSchema.array(),
    work_experiences: CVWorkExperienceSchema.array(),
    educations: CVEducationSchema.array(),
    certificates: CVCertificateSchema.array(),
    publications: CVPublicationSchema.array()
  })
});

export type CVFormValues = z.infer<typeof CVSchema>;

export type CVRegisterField =
  | 'name'
  | 'id'
  | 'link'
  | 'profile'
  | 'profile.name'
  | 'profile.id'
  | 'profile.projects_count'
  | 'profile.years_of_experience'
  | 'profile.avatar'
  | 'profile.position'
  | 'profile.description'
  | `profile.certificates.${number}.start_date`
  | `profile.certificates.${number}.end_date`
  | `profile.certificates.${number}.name`
  | `profile.certificates.${number}.link`
  | `profile.educations.${number}.started_at`
  | `profile.educations.${number}.graduated_at`
  | `profile.educations.${number}.university_name`
  | `profile.educations.${number}.country`
  | `profile.educations.${number}.degree`
  | `profile.educations.${number}.speciality`
  | `profile.hard_skills.${number}.name`
  | `profile.hard_skills.${number}.years_of_experience`
  | `profile.hard_skills.${number}.name`
  | `profile.hard_skills.${number}.name`
  | `profile.hard_skills.${number}.name`
  | `profile.hard_skills.${number}.name`
  | `profile.languages.${number}.name`
  | `profile.publications.${number}.start_date`
  | `profile.publications.${number}.name`
  | `profile.publications.${number}.description`
  | `profile.publications.${number}.url`
  | `profile.soft_skills.${number}.name`
  | `profile.work_experiences.${number}.started_at`
  | `profile.work_experiences.${number}.ended_at`
  | `profile.work_experiences.${number}.position`
  | `profile.work_experiences.${number}.company_name`
  | `profile.work_experiences.${number}.description`
  | `profile.work_experiences.${number}.responsibilities`
  | `profile.work_experiences.${number}.environment`;