import { useMemo } from 'react';

import { FieldContainer } from '..';
import type { FieldAttributes, FieldType } from './Field.dto';
import InputField from './InputField';
import PasswordField from './PasswordField';
import PhoneField from './PhoneField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const fieldComponents = new Map<FieldType, (props: any) => JSX.Element>();
fieldComponents.set('text', InputField);
fieldComponents.set('number', InputField);
fieldComponents.set('email', InputField);
fieldComponents.set('date', InputField);
fieldComponents.set('select', SelectField);
fieldComponents.set('password', PasswordField);
fieldComponents.set('textarea', TextAreaField);
fieldComponents.set('phone', PhoneField);

/**
 * Field Factory
 */
function Field<T = object>(props: FieldAttributes<T>): JSX.Element {
  const FieldComponent = useMemo(
    () =>
      props.type === 'custom'
        ? props.render
        : (fieldComponents.get(props.type) as React.FC<FieldAttributes<T>>),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.type]
  );

  return (
    <FieldContainer
      htmlFor={props.name}
      title={props.label}
      obligatory={props.obligatory ?? props.required}
      legend={props.legend}
    >
      <FieldComponent {...props} />
    </FieldContainer>
  );
}

export default Field;
