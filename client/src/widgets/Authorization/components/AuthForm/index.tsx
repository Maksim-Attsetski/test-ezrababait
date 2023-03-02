import { useAuth, useDebounce, useInput, useUsers } from 'hooks';
import React, { FC, FormEvent, memo, useEffect, useState } from 'react';
import { getApiError } from 'shared';
import { Button } from 'UI';
import { ICreateUser, ILoginInfo } from 'widgets/User';
import s from './AuthForm.module.scss';

const AuthForm: FC = (props) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { onLogin, onRegistration } = useAuth();
  const { onGetUsers } = useUsers();

  const { value: tag, setValue: setTag } = useDebounce<string>(
    '',
    onCheckIsTagExist
  );
  const email = useInput('', 'E-mail');
  const password = useInput('', 'Password');
  const confirmPassword = useInput('', 'Confirm password');
  const [errorText, setErrorText] = useState<string>('');
  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!isLogin && password.props.value !== confirmPassword.props.value) {
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

      isLogin
        ? await onLogin(userForLogin)
        : await onRegistration(userForSignup);

      clearValues();
    } catch (error) {
      setErrorText(getApiError(error));
    }
  };

  const clearValues = () => {
    const values = { email, password, confirmPassword };
    for (const key in values) {
      const element = values[key as keyof typeof values];
      element.onClear();
    }
    setTag('');
  };

  async function onCheckIsTagExist() {
    if (isLogin) return;

    const users = await onGetUsers({ filter: 'tag==' + tag }, true);
    setErrorText(users.length > 0 ? 'This tag is already exist' : '');
  }

  useEffect(() => {
    setErrorText('');
  }, [password.props.value, confirmPassword.props.value]);

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
          {!isLogin && <input type='email' {...email.props} />}
          <input type='password' {...password.props} />
          {!isLogin && <input type='password' {...confirmPassword.props} />}
          <div>{errorText}</div>
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
