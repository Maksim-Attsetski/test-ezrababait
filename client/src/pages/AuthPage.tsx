import React, { FC, memo } from 'react';
import { AuthForm } from 'widgets/Authorization';

const AuthPage: FC = () => {
  return (
    <>
      <AuthForm />
    </>
  );
};
export default memo(AuthPage);
