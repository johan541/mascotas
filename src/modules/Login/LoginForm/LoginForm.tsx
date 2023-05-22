import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type CommandAttributes, Form, type FieldAttributes } from '@/components/Form';
import { Routes } from '@/helpers/routes';
import { getToastConfig } from '@/helpers/toast.config';
import type { UserLogin } from '@/schemas/user.schema';

const LoginForm = () => {
  const formMethods = useForm<UserLogin>();
  const router = useRouter();

  const data = useMemo<FieldAttributes<UserLogin>[]>(
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

  const handleError = (error: string) => {
    toast.error(error, getToastConfig());
  };

  const handleLogin: SubmitHandler<UserLogin> = async (formData) => {
    const res = await signIn('credentials', {
      ...formData,
      callbackUrl: (router.query?.callbackUrl as string) ?? Routes.HOME.path,
      redirect: false,
    });

    if (res?.error) {
      handleError(res.error);
    } else if (res?.url) {
      router.push(res.url);
    }
  };

  return (
    <FormProvider<UserLogin> {...formMethods}>
      <Form<UserLogin> data={data} commands={commands} onSubmit={handleLogin} />
    </FormProvider>
  );
};

export default LoginForm;
