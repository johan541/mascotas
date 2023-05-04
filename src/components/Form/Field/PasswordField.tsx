import { useReducer } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

import { PasswordFieldAttributes } from './Field.dto';

import styles from '../Form.module.scss';

function PasswordField<T extends FieldValues>({
  name,
  ...props
}: PasswordFieldAttributes<T>): JSX.Element {
  const [showPassword, handleShowPassword] = useReducer(
    (state: boolean) => !state,
    false
  );

  const { register } = useFormContext<T>();

  return (
    <>
      <input
        className={styles['field-input']}
        {...props}
        {...register(name)}
        type={showPassword ? 'text' : 'password'}
        id={name}
      />
      <div onClick={handleShowPassword} className={styles['show-password']}>
        {showPassword ? <IconEye /> : <IconEyeOff />}
      </div>
    </>
  );
}

export default PasswordField;
