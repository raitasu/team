import { type EmployeeContact } from '~/store/api/employees/employees.types';

export const getInitialState = (contacts: EmployeeContact) => ({
  primaryPhone: contacts.primary_phone,
  emergencyContact: contacts.emergency_phones,
  email: contacts.emails,
  Country: contacts.address.country_code,
  city: contacts.address.city.en,
  timeZone: contacts.address.country_code,
  street: contacts.address.street_translations.en,
  ZIPCode: contacts.address.zip_code,
  building: contacts.address.building,
  unit: contacts.address.unit,
  apartment: contacts.address.apartment
});
