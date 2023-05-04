import type { SubmitHandler } from 'react-hook-form';

import type { FieldAttributes } from './Field';
import { CommandAttributes } from './Commands';

export type FormProps<T extends Record<string, object>> = {
  readonly data: FieldAttributes<T>[];
  readonly commands: CommandAttributes;
} & Omit<
  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
  'onSubmit'
> & {
    readonly onSubmit?: SubmitHandler<T>;
  };
