import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  memo,
  MouseEventHandler,
  NamedExoticComponent,
  ReactElement,
  ReactNode,
} from 'react';
import Gap from 'UI/Gap';
import s from './Button.module.scss';

interface IProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text?: string;
  icon?: ReactNode | ReactElement | undefined | NamedExoticComponent<{}>;
  danger?: boolean;
}

const Button: FC<IProps> = ({
  text,
  icon,
  className = '',
  danger = false,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${s.btn} ${danger ? s.danger : ''} ${className}`}
    >
      {text}
      {icon && (
        <>
          <Gap x={5} />
          {icon}
        </>
      )}
    </button>
  );
};
export default memo(Button);
