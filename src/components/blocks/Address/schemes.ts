import * as yup from 'yup';
import {
  titleSchema,
  countrySchema,
  citySchema,
  streetSchema,
  postalCodeSchema,
} from 'validations/validationSchemes';

export const addressFormSchema = yup.object({
  title: titleSchema,
  country: countrySchema,
  city: citySchema,
  street: streetSchema,
  postalCode: postalCodeSchema,
});
