import { Patterns } from '~/shared/shared.constants';
import { type EmployeeContactInfo } from '~/store/api/employees/employees.types';

export const getInitialState = (
  contacts: EmployeeContactInfo,
  isEmailFull?: boolean
) => ({
  primary_phone: contacts.primary_phone,
  secondary_phone: contacts.secondary_phone,
  emergency_contact_attributes: {
    id: contacts.emergency_contact?.id,
    name: contacts.emergency_contact?.name,
    number: contacts.emergency_contact?.number,
    owner: contacts.emergency_contact?.owner
  },
  employee_attributes: contacts.employee_attributes
    ? {
        email: isEmailFull
          ? contacts.employee_attributes.email
          : contacts.employee_attributes.email &&
            contacts.employee_attributes.email.split('@')[0],
        id: contacts.employee_attributes.id
      }
    : null,
  personal_email: contacts.personal_email,
  country_code: contacts.country_code,
  city_name: contacts.city_name,
  time_zone: contacts.time_zone,
  street: contacts.street,
  zip_code:
    typeof contacts.zip_code === 'number' ? contacts.zip_code.toString() : null,
  building:
    typeof contacts.building === 'number' ? contacts.building.toString() : null,
  unit: contacts.unit,
  apartment:
    typeof contacts.apartment === 'number'
      ? contacts.apartment.toString()
      : null
});

export const checkNumber = (data: string | null | undefined) =>
  !(data && !Patterns.Number.test(data));
export const checkPhoneNumber = (data: string | null | undefined) =>
  !(data && !new RegExp(Patterns.PhoneNumber).test(data));

export const getAddress = (contacts: EmployeeContactInfo) => {
  const adressString: string[] = [];

  if (contacts.street && contacts.building && contacts.apartment) {
    adressString.push(`${contacts.building}-${contacts.apartment}`);
  }

  if (contacts.street) adressString.push(`${contacts.street} str.`);
  if (contacts.city_name) adressString.push(`${contacts.city_name}`);
  if (contacts.country_code) adressString.push(`${contacts.country_code}`);
  if (contacts.zip_code) adressString.push(`${contacts.zip_code}`);
  if (contacts.time_zone) adressString.push(`${contacts.time_zone}`);

  return adressString.join(', ');
};
