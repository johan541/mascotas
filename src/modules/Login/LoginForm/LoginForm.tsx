import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { type CommandAttributes, Form, type FieldAttributes } from '@/components/Form';
import styles from './LoginForm.module.scss';
import { useMemo } from 'react';

type UserModel = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const formMethods = useForm<UserModel>();

  const data = useMemo<FieldAttributes<UserModel>[]>(
    () => [
      {
        type: 'text',
        name: 'username',
        label: 'Usuario',
        required: true,
      },
      {
        type: 'password',
        name: 'password',
        label: 'Contraseña',
        required: true,
      },
    ],
    []
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Iniciar sesión' },
      reset: { label: 'Limpiar' },
    }),
    []
  );

  const handleLogin: SubmitHandler<UserModel> = async (dataForm) => {
    console.log(dataForm);
  };

  return (
    <FormProvider<UserModel> {...formMethods}>
      <Form<UserModel> data={data} commands={commands} onSubmit={handleLogin} />
    </FormProvider>
  );
};

export default LoginForm;
