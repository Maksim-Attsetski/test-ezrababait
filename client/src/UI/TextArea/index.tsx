import React, {
  FC,
  memo,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
} from 'react';

import s from './TextArea.module.scss';

interface IProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const TextArea: FC<IProps> = (props) => {
  return (
    <div className={s.textareaContainer}>
      <textarea
        {...props}
        className={s.textarea + ' ' + props?.className || ''}
      />
    </div>
  );
};
export default memo(TextArea);
