import Link, { LinkProps } from 'next/link';
import { useMemo } from 'react';

import type {
  ButtonAnchorProps,
  ButtonAuxProps,
  ButtonInputProps,
  ButtonProps,
} from './Button.types';

import styles from './Button.module.scss';

const ButtonAnchor: React.FC<ButtonAnchorProps> = ({ children, ...props }) => (
  <Link {...(props as LinkProps)}>{children}</Link>
);

const ButtonInput: React.FC<ButtonInputProps> = ({ children, ...props }) => (
  <input {...props} value={children?.toString()} />
);

const ButtonAux: React.FC<ButtonAuxProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const buttonComponents = new Map<
  ButtonProps['as'],
  ((props: object) => JSX.Element) | React.FC<any>
>();
buttonComponents.set('a', ButtonAnchor);
buttonComponents.set('button', ButtonAux);
buttonComponents.set('input', ButtonInput);

const Button: React.FC<ButtonProps> = (props) => {
  const ButtonComponent = buttonComponents.get(props.as) as React.FC<ButtonProps>;

  return (
    <ButtonComponent
      {...{
        ...props,
        className: `${styles.button} ${styles[props.stylesFor]} ${props.className ?? ''}`,
      }}
    />
  );
};

export default Button;
