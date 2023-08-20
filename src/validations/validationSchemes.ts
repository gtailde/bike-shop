import * as yup from 'yup';

export const emailSchema = yup
  .string()
  .strict()
  .trim()
  .email('Email format is not valid')
  .required('Email is required');

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
