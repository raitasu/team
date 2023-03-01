import { z } from 'zod';

const CVPublicationSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  url: z.string().nullable(),
  start_date: z.string().nullable(),
  description: z.string().nullable()
});

const CVCertificateSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  issued_by: z.string().nullable(),
  start_date: z.string().nullable(),
  link: z.string().nullable(),
  end_date: z.string().nullable()
});

const CVEducationSchema = z.object({
  id: z.number(),
  university_name: z.string().nullable(),
  speciality: z.string().nullable(),
  started_at: z.string().nullable(),
  graduated_at: z.string().nullable(),
  country: z.string().nullable(),
  degree: z.string().nullable()
});

const CVWorkExperienceSchema = z.object({
  id: z.number(),
  project_name: z.string().nullable(),
  company_name: z.string().nullable(),
  description: z.string().nullable(),
  responsibilities: z.string().nullable(),
  environment: z.string().nullable(),
  position: z.string().nullable(),
  started_at: z.string().nullable(),
  ended_at: z.string().nullable()
});

const CVSoftSkillSchema = z.object({
  id: z.number(),
  name: z.string().nullable()
});

const CVHardSkillSchema = z.object({
  name: z.string().nullable(),
  years_of_experience: z.string().nullable()
});

const CVLanguageSchema = z.object({
  id: z.number(),
  name: z.string().nullable()
});

export const CVSchema = z.object({
  name: z.string().nullable(),
  id: z.number(),
  link: z.string().nullable(),
  profile: z.object({
    id: z.number(),
    name: z.string(),
    projects_count: z.string(),
    years_of_experience: z.string(),
    avatar: z.string().nullable(),
    position: z.string().nullable(),
    description: z.string().nullable(),
    languages: CVLanguageSchema.array().nullable(),
    hard_skills: CVHardSkillSchema.array().nullable(),
    soft_skills: CVSoftSkillSchema.array().nullable(),
    work_experiences: CVWorkExperienceSchema.array().nullable(),
    educations: CVEducationSchema.array().nullable(),
    certificates: CVCertificateSchema.array().nullable(),
    publications: CVPublicationSchema.array().nullable()
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
  | `profile.work_experiences.${number}.project_name`
  | `profile.work_experiences.${number}.company_name`
  | `profile.work_experiences.${number}.description`
  | `profile.work_experiences.${number}.responsibilities`
  | `profile.work_experiences.${number}.environment`;
