import {
  type EmployeeContactInfo,
  type EmployeeContact
} from '~/store/api/employees/employees.types';

export const getInitialState = (
  contacts: EmployeeContact & EmployeeContactInfo & { work_email: string }
) => ({
  primaryPhone: contacts.primary_phone ? contacts.primary_phone : '',
  secondaryPhone: contacts.secondary_phone ? contacts.secondary_phone : '',
  emergencyContact: {
    name: contacts.emergency_contact?.name
      ? contacts.emergency_contact.name
      : '',
    phone: contacts.emergency_contact?.number
      ? contacts.emergency_contact.number
      : '',
    owner: contacts.emergency_contact?.owner
      ? contacts.emergency_contact.owner
      : ''
  },
  workEmail: contacts.work_email ? contacts.work_email.split('@')[0] : '',
  personalEmail: contacts.personal_email ? contacts.personal_email : '',
  country: contacts.address?.country_code ? contacts.address.country_code : '',
  city: contacts.address?.city ? contacts.address.city : '',
  timezone: contacts.timezone ? contacts.timezone : '',
  street: contacts.street ? contacts.street : '',
  ZIPCode: contacts.zip_code ? contacts.zip_code : '',
  building: contacts.building ? contacts.building : '',
  unit: contacts.unit ? contacts.unit : '',
  apartment: contacts.apartment ? contacts.apartment : ''
});
