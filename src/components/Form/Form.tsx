import { useId } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

import Commands from './Commands';
import Field from './Field';
import type { FormProps } from './Form.dto';

import styles from './Form.module.scss';

/**
 * This component must be wrapped in a FormProvider of react-hook-form
 */
function Form<T extends FieldValues>({
  data,
  commands,
  onSubmit = () => undefined,
  ...props
}: FormProps<T>) {
  const { handleSubmit } = useFormContext<T>();
  const formId = useId();

  return (
    <form {...props} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {data.map((field) => (
        <Field<T> key={`${formId}-${field.name}`} {...field} />
      ))}

      <Commands data={commands} />
    </form>
  );
}

export default Form;
