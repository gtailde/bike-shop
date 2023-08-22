import * as yup from 'yup';
import {
  userNameSchema,
  dateSchema,
  emailSchema,
  passwordSchema,
  titleSchema,
  countrySchema,
  citySchema,
  streetSchema,
  postalCodeSchema,
} from 'validations/validationSchemes';

export const profileFormSchema = yup.object({
  firstName: userNameSchema,
  lastName: userNameSchema,
  birthDate: dateSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const addressFormSchema = yup.object({
  title: titleSchema,
  country: countrySchema,
  city: citySchema,
  street: streetSchema,
  postalCode: postalCodeSchema,
});
