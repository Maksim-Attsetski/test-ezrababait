import { useAuth, useDebounce, useInput, useUsers } from 'hooks';
import React, {
  ChangeEvent,
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
  const { onCheckUsers, usersIsLoading } = useUsers();

  const { value: tag, setValue: setTag } = useDebounce<string>(
    '',
    onCheckIsTagExist
  );
  const email = useInput('', 'E-mail');
  const password = useInput('', 'Password');
  const confirmPassword = useInput('', 'Confirm password');

  const [errorText, setErrorText] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isTagValid, setIsTagValid] = useState<boolean>(true);

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
    setIsTagValid(false);
  };

  async function onCheckIsTagExist() {
    if (isLogin) return;

    const isExist = await onCheckUsers({ filter: 'tag==' + tag });

    setErrorText(isExist ? 'This tag is already exist' : '');
    setIsTagValid(!isExist);
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
    setIsTagValid(isLogin);
  }, [isLogin]);

  useEffect(() => {
    setErrorText('');
  }, [password.value, confirmPassword.value, isLogin, tag]);

  useEffect(() => {
    const isPassInValid = password.value.length === 0;
    const errorOrLoading = usersIsLoading || errorText.length > 0;

    if (isLogin) {
      setIsDisabled(isPassInValid || errorOrLoading);
    } else {
      const passwordsIsEqual = password.value !== confirmPassword.value;

      setIsDisabled(
        isPassInValid ||
          !isTagValid ||
          email.value.length === 0 ||
          passwordsIsEqual ||
          errorOrLoading
      );
    }
  }, [
    errorText,
    password.value,
    confirmPassword.value,
    isTagValid,
    email.value,
    isLogin,
    usersIsLoading,
  ]);

  const onTagChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
    setIsTagValid(false);
  };

  return (
    <div className={s.wrapper}>
      <div className={'container ' + s.formContainer}>
        <Title text={`Sign ${isLogin ? 'in' : 'up'}`} />
        <form className={s.form} onSubmit={onFormSubmit}>
          <Input value={tag} onChange={onTagChange} placeholder='Unique name' />
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
          text={isLogin ? 'Still no account?' : 'Already have an account?'}
        />
      </div>
    </div>
  );
};
export default memo(AuthForm);
