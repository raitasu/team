import { type EmployeeContact } from '~/store/api/employees/employees.types';

export const getInitialState = (contacts: EmployeeContact) => ({
  primaryPhone: contacts.primary_phone ? contacts.primary_phone : '',
  secondaryPhone: contacts.secondary_phone ? contacts.secondary_phone : '',
  emergencyContact: {
    name: contacts.emergency_contact.name
      ? contacts.emergency_contact.name
      : '',
    phone: contacts.emergency_contact.phone
      ? contacts.emergency_contact.phone
      : '',
    who_is_this: contacts.emergency_contact.who_is_this
      ? contacts.emergency_contact.who_is_this
      : ''
  },
  workEmail: contacts.work_email ? contacts.work_email.split('@')[0] : '',
  personalEmail: contacts.personal_email ? contacts.personal_email : '',
  country: contacts.address ? contacts.address.country_code : '',
  city: contacts.address ? contacts.address.city : '',
  timezone: contacts.timezone ? contacts.timezone : '',
  street: contacts.address?.street_translations
    ? contacts.address.street_translations.en
    : '',
  ZIPCode: contacts.address ? contacts.address.zip_code : '',
  building: contacts.address ? contacts.address.building : '',
  unit: contacts.address ? contacts.address.unit : '',
  apartment: contacts.address ? contacts.address.apartment : ''
});
