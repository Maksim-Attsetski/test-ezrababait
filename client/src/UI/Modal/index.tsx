import React, {
  FC,
  memo,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';
import s from './Modal.module.scss';

interface IProps {
  children: ReactNode | ReactElement;
  isVisible: boolean;
  setIsVisible: (val: SetStateAction<boolean>) => void;
  onClose?: () => void;
}

const Modal: FC<IProps> = ({
  children,
  isVisible,
  setIsVisible,
  onClose = () => {},
}) => {
  const onCloseModal = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div
      className={[s.wrapper, isVisible ? s.active : ''].join(' ')}
      onClick={onCloseModal}
    >
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
export default memo(Modal);
