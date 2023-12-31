import { getMonth, getYear } from 'date-fns';

import { type EmployeeCertificate } from '~/store/api/employees/employees.types';

export const getInitialState = (certificate: EmployeeCertificate) => ({
  name: certificate.name,
  issued_by: certificate.issued_by,
  file:
    typeof certificate.file === 'string'
      ? `${import.meta.env.VITE_API_HOST}${certificate.file}`
      : null,
  link: certificate.link,
  start_date: {
    month: getMonth(new Date(certificate.start_date || '')).toString(),
    year: getYear(new Date(certificate.start_date || '')).toString()
  },
  end_date: {
    month: certificate.end_date
      ? getMonth(new Date(certificate.end_date)).toString()
      : null,
    year: certificate.end_date
      ? getYear(new Date(certificate.end_date)).toString()
      : null
  }
});

export const initialCertificateValues = () => ({
  name: null,
  issued_by: null,
  file: null,
  link: null,
  start_date: {
    month: null,
    year: null
  },
  end_date: {
    month: null,
    year: null
  }
});
