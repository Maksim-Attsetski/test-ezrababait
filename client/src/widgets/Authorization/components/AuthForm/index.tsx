import { useAuth, useDebounce, useInput, useUsers } from 'hooks';
import React, {
  FC,
  FormEvent,
  memo,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getApiError } from 'shared';
import { Button, Input, Title } from 'UI';
import { ICreateUser, ILoginInfo } from 'widgets/User';
import s from './AuthForm.module.scss';

const AuthForm: FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { onLogin, onRegistration } = useAuth();
  const { onGetUsers, usersIsLoading } = useUsers();

  const { value: tag, setValue: setTag } = useDebounce<string>(
    '',
    onCheckIsTagExist
  );
  const email = useInput('', 'E-mail');
  const password = useInput('', 'Password');
  const confirmPassword = useInput('', 'Confirm password');

  const [errorText, setErrorText] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!isLogin && password.value !== confirmPassword.props.value) {
        throw new Error('Passwords is not equal!');
      }

      const userForLogin: ILoginInfo = { tag, password: password.value };
      const userForSignup: ICreateUser = {
        email: email.value,
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

  const passwordProps = useMemo(
    () => ({
      type: 'password',
      maxLength: 20,
      minLength: 4,
    }),
    []
  );

  useEffect(() => {
    if (!isLogin) {
      onCheckIsTagExist();
    }
  }, [isLogin]);

  useEffect(() => {
    setErrorText('');
  }, [password.value, confirmPassword.value, isLogin]);

  useEffect(() => {
    const isPassAndTagInValid = password.value.length === 0 || tag.length === 0;
    const errorOrLoading = usersIsLoading || errorText.length > 0;

    if (isLogin) {
      setIsDisabled(isPassAndTagInValid || errorOrLoading);
    } else {
      const passwordsIsEqual = password.value !== confirmPassword.value;

      setIsDisabled(
        isPassAndTagInValid ||
          email.value.length === 0 ||
          passwordsIsEqual ||
          errorOrLoading
      );
    }
  }, [
    errorText,
    password.value,
    confirmPassword.value,
    tag,
    email.value,
    isLogin,
    usersIsLoading,
  ]);

  return (
    <div className={s.wrapper}>
      <div className={'container ' + s.formContainer}>
        <Title text={`Sign ${isLogin ? 'in' : 'up'}`} />
        <form className={s.form} onSubmit={onFormSubmit}>
          <Input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder='Unique name'
          />
          {!isLogin && <Input type='email' {...email.props} />}
          <Input required {...passwordProps} {...password.props} />
          {!isLogin && <Input {...passwordProps} {...confirmPassword.props} />}
          <div className={s.error}>{errorText}</div>
          <Button
            disabled={isDisabled}
            text='Continue'
            type='submit'
            className={s.formBtn}
          />
        </form>
        <Title
          isSubTitle
          onClick={() => setIsLogin((prev) => !prev)}
          text={isLogin ? 'Already have an account?' : 'Still no account?'}
        />
      </div>
    </div>
  );
};
export default memo(AuthForm);
