import { type EmployeeContact } from '~/store/api/employees/employees.types';

export const getInitialState = (contacts: EmployeeContact) => ({
  primaryPhone: contacts.primary_phone ? contacts.primary_phone : '',
  emergencyContact: contacts.emergency_phones ? contacts.emergency_phones : '',
  email: contacts.emails,
  country: contacts.address ? contacts.address.country_code : '',
  city: contacts.address?.city ? contacts.address.city.en : '',
  timeZone: contacts.address ? contacts.address.country_code : '',
  street: contacts.address?.street_translations
    ? contacts.address.street_translations.en
    : '',
  ZIPCode: contacts.address ? contacts.address.zip_code : '',
  building: contacts.address ? contacts.address.building : '',
  unit: contacts.address ? contacts.address.unit : '',
  apartment: contacts.address ? contacts.address.apartment : ''
});
