export const Patterns = {
  Linkedin: /^https:\/\/www.linkedin.com\/in\/[\w\d_-]{1,25}\/?$/i,
  GitHub: /^https:\/\/github\.com\/[\w\d_-]{1,25}$/i,
  Discord: /\w+#\d{4}/i,
  Telegram: /^https:\/\/telegram|t\.me\/[\w\d_-]*\/?$/,
  Facebook: /^https:\/\/www\.facebook\.com\/[\w\d_\-.]+/im,
  Instagram: /^https:\/\/www\.instagram\.com\/[\w\d_\-.]+/im,
  VKontakte: /^https:\/\/vk\.com|vkontakte\.ru\/id[\w\d_\-.]+/im,
  URL:
    '^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' + //
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$'
};

export const ApiTags = {
  Authentication: 'authentication',
  Employees: 'employees',
  Positions: 'positions',
  HardSkills: 'hardSkills',
  SoftSkills: 'softSkills',
  WorkExperience: 'workExperience',
  Projects: 'projects',
  CVs: 'cvs'
} as const;

export const CountriesCode = [
  'AF',
  'DZ',
  'AS',
  'AD',
  'AO',
  'AI',
  'AQ',
  'AG',
  'AR',
  'AM',
  'AW',
  'AU',
  'AT',
  'AZ',
  'BS',
  'BH',
  'BD',
  'BB',
  'BY',
  'BE',
  'BZ',
  'BJ',
  'BM',
  'BT',
  'BO',
  'BA',
  'BW',
  'BV',
  'BR',
  'IO',
  'BN',
  'BG',
  'BF',
  'BI',
  'KH',
  'CM',
  'CA',
  'CV',
  'KY',
  'CF',
  'TD',
  'CL',
  'CN',
  'CX',
  'CO',
  'KM',
  'CK',
  'CR',
  'CI',
  'CU',
  'CY',
  'CZ',
  'DK',
  'DJ',
  'DM',
  'DO',
  'EC',
  'EG',
  'SV',
  'GQ',
  'ER',
  'EE',
  'ET',
  'FO',
  'FJ',
  'FI',
  'FR',
  'GF',
  'PF',
  'TF',
  'GA',
  'GM',
  'GE',
  'DE',
  'GH',
  'GI',
  'GR',
  'GL',
  'GD',
  'GP',
  'GU',
  'GT',
  'GN',
  'GW',
  'GY',
  'HT',
  'HM',
  'HN',
  'HK',
  'HU',
  'IS',
  'IN',
  'ID',
  'IQ',
  'IE',
  'IL',
  'IT',
  'JM',
  'JP',
  'JO',
  'KZ',
  'KE',
  'KW',
  'KG',
  'LA',
  'LV',
  'LB',
  'LS',
  'LR',
  'LY',
  'LI',
  'LT',
  'LU',
  'MO',
  'MG',
  'MW',
  'MY',
  'MV',
  'ML',
  'MT',
  'MH',
  'MQ',
  'MR',
  'MU',
  'YT',
  'MX',
  'MC',
  'MN',
  'MS',
  'MA',
  'MZ',
  'MM',
  'NA',
  'NR',
  'NP',
  'NL',
  'AN',
  'NC',
  'NZ',
  'NI',
  'NE',
  'NG',
  'NU',
  'NF',
  'MP',
  'NO',
  'OM',
  'PK',
  'PW',
  'PA',
  'PG',
  'PY',
  'PE',
  'PH',
  'PN',
  'PL',
  'PT',
  'PR',
  'QA',
  'RE',
  'RO',
  'RU',
  'RW',
  'SH',
  'LC',
  'PM',
  'VC',
  'WS',
  'SM',
  'ST',
  'SA',
  'SN',
  'CS',
  'SC',
  'SL',
  'SG',
  'SK',
  'SI',
  'SB',
  'SO',
  'ZA',
  'GS',
  'ES',
  'LK',
  'SD',
  'SR',
  'SJ',
  'SZ',
  'SE',
  'CH',
  'SY',
  'TW',
  'TJ',
  'TH',
  'TL',
  'TG',
  'TK',
  'TO',
  'TT',
  'TN',
  'TR',
  'TM',
  'TC',
  'TV',
  'UG',
  'UA',
  'AE',
  'GB',
  'US',
  'UM',
  'UY',
  'UZ',
  'VU',
  'VE',
  'VN',
  'WF',
  'EH',
  'YE',
  'ZM',
  'ZW'
] as const;
