import * as yup from 'yup';
import {
  userNameSchema,
  dateSchema,
  emailSchema,
  passwordSchema,
} from 'validations/validationSchemes';

export const profileFormSchema = yup.object({
  firstName: userNameSchema,
  lastName: userNameSchema,
  birthDate: dateSchema,
  email: emailSchema,
  password: passwordSchema,
});
