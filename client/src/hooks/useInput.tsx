import { ChangeEvent, useEffect, useState } from 'react';

type TEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
interface IUserInput {
  (
    defaultValue?: string,
    placeholder?: string,
    onChangeCallback?: ((value: string) => string) | null
  ): {
    props: {
      value: string;
      placeholder: string;
      onChange: (event: TEvent) => void;
    };
    onClear: () => void;
    value: string;
  };
}

const useInput: IUserInput = (
  defaultValue = '',
  placeholder = '',
  onChangeCallback = null
) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e: TEvent) => {
    const { value } = e.target;

    if (onChangeCallback) {
      setValue(onChangeCallback(value));
    } else {
      setValue(value);
    }
  };

  const onClear = () => {
    setValue('');
  };

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return {
    props: {
      value,
      onChange,
      placeholder,
    },
    onClear,
    value,
  };
};

export default useInput;
