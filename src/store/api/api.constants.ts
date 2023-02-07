export const Patterns = {
  Linkedin: /^https:\/\/www.linkedin.com\/in\/[\w\d_-]{1,25}\/?$/i,
  GitHub: /^https:\/\/github\.com\/[\w\d_-]{1,25}$/i,
  Discord: /\w+#\d{4}/i,
  Telegram: /^https:\/\/telegram|t\.me\/[\w\d_-]*\/?$/,
  Facebook: /^https:\/\/www\.facebook\.com\/[\w\d_\-.]+/im,
  Instagram: /^https:\/\/www\.instagram\.com\/[\w\d_\-.]+/im,
  VKontakte: /^https:\/\/vk\.com|vkontakte\.ru\/id[\w\d_\-.]+/im
};

export const ApiTags = {
  Authentication: 'authentication',
  Employees: 'employees',
  Positions: 'positions',
  HardSkills: 'hardSkills',
  SoftSkills: 'softSkills',
  WorkExperience: 'workExperience'
} as const;
