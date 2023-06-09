import Link, { LinkProps } from 'next/link';

import type {
  ButtonAnchorProps,
  ButtonAuxProps,
  ButtonInputProps,
  ButtonProps,
} from './Button.types';

import styles from './Button.module.scss';

const ButtonAnchor: React.FC<ButtonAnchorProps> = ({
  as,
  stylesFor,
  children,
  ...props
}) => <Link {...(props as LinkProps)}>{children}</Link>;

const ButtonInput: React.FC<ButtonInputProps> = ({
  as,
  stylesFor,
  children,
  ...props
}) => <input {...props} value={children?.toString()} />;

const ButtonAux: React.FC<ButtonAuxProps> = ({ as, stylesFor, children, ...props }) => (
  <button {...props}>{children}</button>
);

const buttonComponents = new Map<
  ButtonProps['as'],
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
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
