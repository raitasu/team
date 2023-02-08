import { type EmployeeContactInfo } from '~/store/api/employees/employees.types';

export const getInitialState = (
  contacts: EmployeeContactInfo,
  isEmailFull?: boolean
) => ({
  primary_phone: contacts.primary_phone ? contacts.primary_phone : '',
  secondary_phone: contacts.secondary_phone ? contacts.secondary_phone : '',
  emergency_contact_attributes: {
    id: contacts.emergency_contact?.id,
    name: contacts.emergency_contact?.name
      ? contacts.emergency_contact.name
      : '',
    number: contacts.emergency_contact?.number
      ? contacts.emergency_contact.number
      : '',
    owner: contacts.emergency_contact?.owner
      ? contacts.emergency_contact.owner
      : ''
  },
  employee_attributes: {
    email: isEmailFull
      ? contacts.employee_attributes.email
      : contacts.employee_attributes.email &&
        contacts.employee_attributes.email.split('@')[0],
    id: contacts.employee_attributes.id
  },
  personal_email: contacts.personal_email ? contacts.personal_email : '',
  country_code: contacts.country_code ? contacts.country_code : '',
  city: contacts.city ? contacts.city : '',
  timezone: contacts.timezone ? contacts.timezone : '',
  street: contacts.street ? contacts.street : '',
  zip_code: contacts.zip_code ? contacts.zip_code : '',
  building: contacts.building ? contacts.building : '',
  unit: contacts.unit ? contacts.unit : '',
  apartment: contacts.apartment ? contacts.apartment : ''
});
