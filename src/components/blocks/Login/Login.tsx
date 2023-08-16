import './style.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/UI/Button/Button';
import { Form } from 'components/UI/Form/Form';
import { TextField } from 'components/UI/TextField/TextField';
import { ControlLabel } from 'components/UI/ControlLabel/ControlLabel';
import { pagePathnames } from 'router/pagePathnames';
import { type ITextFieldProps } from 'components/UI/TextField/types';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const formInputsData = { email, password, isRemember };

  const handleRememberCheck = (value: boolean) => {
    setIsRemember(value);
  };

  const handleSubmit = () => {
    console.log('post login data: ', formInputsData);
  };

  const formFields: ITextFieldProps[] = [
    {
      id: '1',
      type: 'email',
      label: 'Email address',
      value: email,
      helpText: 'email help text here',
      isTextShows: true,
      isValid: false,
      onChange: (value: string) => {
        setEmail(value);
      },
    },
    {
      id: '2',
      type: 'password',
      label: 'Password',
      value: password,
      helpText: 'email help text here',
      onChange: (value: string) => {
        setPassword(value);
      },
    },
  ];

  return (
    <section className="login">
      <div className="login__container page-wrapper">
        <header className="login__header">
          <h2 className="visually-hidden">Log in section</h2>
          <p className="login__title">Welcome back</p>
          <p className="login__description">Please sign in below to continue</p>
        </header>
        <Form className="login__form" action="">
          {formFields.map(({ id, ...data }, index) => (
            <TextField {...data} key={id} id={`input-${index}`} />
          ))}
          <ControlLabel checked={isRemember} label="Remember me" onChange={handleRememberCheck} />
          <Button accent className="form__button" onClick={handleSubmit}>
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
