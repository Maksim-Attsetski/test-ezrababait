import { useAuth, useDebounce, useInput } from 'hooks';
import React, { FC, FormEvent, memo, useEffect, useState } from 'react';
import { Button } from 'UI';
import { ICreateUser, ILoginInfo } from 'widgets/User';
import s from './AuthForm.module.scss';

const AuthForm: FC = (props) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { onLogin, onRegistration } = useAuth();

  const { value: tag, setValue: setTag } = useDebounce('');
  const email = useInput('', 'E-mail');
  const password = useInput('', 'Password');
  const confirmPassword = useInput('', 'Confirm password');

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.props.value !== confirmPassword.props.value) {
      throw new Error('Passwords is not equal!');
    }

    const userForLogin: ILoginInfo = {
      tag,
      password: password.props.value,
    };

    const userForSignup: ICreateUser = {
      email: email.props.value,
      name: tag,
      ...userForLogin,
    };

    isLogin ? await onLogin(userForLogin) : await onRegistration(userForSignup);
  };

  useEffect(() => {}, [tag]);

  return (
    <div className={s.wrapper}>
      <div className={'container ' + s.formContainer}>
        <h3>Sign {isLogin ? 'in' : 'up'}</h3>
        <form className={s.form} onSubmit={onFormSubmit}>
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder='Unique name'
          />
          <input type='email' {...email.props} />
          <input type='password' {...password.props} />
          <input type='password' {...confirmPassword.props} />
          <Button text='Continue' type='submit' />
        </form>
        <div onClick={() => setIsLogin((prev) => !prev)}>
          {isLogin ? 'Already have an account' : 'Still no account'}?
        </div>
      </div>
    </div>
  );
};
export default memo(AuthForm);
