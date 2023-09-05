import './style.scss';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'components/UI/Button/Button';
import { Form } from 'components/UI/Form/Form';
import { TextField } from 'components/UI/TextField/TextField';
import { ControlLabel } from 'components/UI/ControlLabel/ControlLabel';
import { pagePathnames } from 'router/pagePathnames';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { emailSchema, passwordSchema } from 'validations/validationSchemes';
import { formFields } from './formFields';
import { customersApi } from 'API/CustomersAPI';

const schema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

export const Login = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const [isRemember, setIsRemember] = useState(false);
  const navigate = useNavigate();

  const handleRememberCheck = (value: boolean) => {
    setIsRemember(value);
  };

  const onSubmit = handleSubmit(async (data) => {
    const response = await customersApi.loginCustomer(data.email, data.password);
    if ('id' in response) navigate(pagePathnames.main, { replace: true });
  });

  return (
    <section className="login">
      <div className="login__container page-wrapper">
        <header className="login__header">
          <h2 className="visually-hidden">Log in section</h2>
          <p className="login__title">Welcome back</p>
          <p className="login__description">Please sign in below to continue</p>
        </header>
        <Form className="login__form" action="" onSubmit={onSubmit}>
          {formFields.map(({ name, ...data }, index) => (
            <TextField
              {...data}
              key={name}
              id={`input-${index}`}
              isValid={!errors[name]}
              helpText={errors[name]?.message}
              {...register(name)}
            />
          ))}
          <ControlLabel checked={isRemember} label="Remember me" onChange={handleRememberCheck} />
          <Button accent className="form__button" type="submit">
            Sign in
          </Button>
          <p className="form__note">
            {`Not a member? `}
            <Link className="link" to={pagePathnames.registration}>
              Join us!
            </Link>
          </p>
        </Form>
      </div>
    </section>
  );
};
