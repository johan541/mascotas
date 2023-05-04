import { useFormContext } from 'react-hook-form';

import type { PhoneFieldAttributes } from './Field.dto';

import styles from '../Form.module.scss';

function PhoneField<T>({
  name,
  type,
  obligatory,
  ...props
}: PhoneFieldAttributes<T>): JSX.Element {
  const { register } = useFormContext();

  return (
    <input
      className={styles['field-input']}
      {...props}
      {...register(name)}
      id={name}
      type={type}
    />
  );
}

export default PhoneField;
