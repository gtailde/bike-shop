import * as yup from 'yup';
import { countryRegex, postCodeRegex } from './countriesList';

export const emailSchema = yup
  .string()
  .strict()
  .trim()
  .required('Email is required')
  .matches(
    /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/,
    {
      message: 'Email format is not valid',
      excludeEmptyString: true,
    },
  );

export const passwordSchema = yup
  .string()
  .strict()
  .trim()
  .required('Password is required')
  .matches(/^\S*$/, {
    message: 'Password must not contain whitespace',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[A-Z]).*$/, {
    message: 'Password must have at least one uppercase Character',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[a-z]).*$/, {
    message: 'Password must have at least one lowercase Character',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[0-9]).*$/, {
    message: 'Password must contain at least one digit',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[!@#$%^&*]).*$/, {
    message: 'Password must contain at least one special character',
    excludeEmptyString: true,
  })
  .matches(/^.{8,24}$/, {
    message: 'Password must be 8-24 characters Long',
    excludeEmptyString: true,
  });

const characterSchema = yup
  .string()
  .required()
  .matches(/^(?=.*[a-zA-Z]).*$/, {
    message: 'Must contain at least one character',
    excludeEmptyString: true,
  });

const onlyCharactersSchema = yup
  .string()
  .required()
  .matches(/^(?=.*[a-zA-Z]).*$/, {
    message: 'Must contain at least one character',
    excludeEmptyString: true,
  })
  .matches(/^(?!.*\d)[^!@#$%^&*]+$/, {
    message: 'Must contain no special characters or numbers',
    excludeEmptyString: true,
  });

export const dateSchema = yup
  .date()
  .max('December 31, 2005 00:00:00', 'You must be over 18 years of age')
  .required('Date is required field');

export const userNameSchema = onlyCharactersSchema;
export const titleSchema = yup.string().required();
export const citySchema = onlyCharactersSchema;
export const streetSchema = characterSchema;

export const addressFormSchema = yup.object({
  title: titleSchema,
  country: yup
    .string()
    .matches(countryRegex, {
      message: 'Invalid country code, e.g. DE, US or AU',
      excludeEmptyString: true,
    })
    .required('Country is required field'),
  city: citySchema,
  streetName: streetSchema,
  postalCode: yup
    .string()
    .required('Postal code is required field')
    .when('country', ([country], schema) => {
      return schema.matches(postCodeRegex[country.toUpperCase() as keyof typeof postCodeRegex], {
        message: 'invalid postal code for this country',
        excludeEmptyString: true,
      });
    }),
});
