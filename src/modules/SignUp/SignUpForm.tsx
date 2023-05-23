import { signIn } from 'next-auth/react';
import { useMemo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { createPerson } from '@/api/people.api';
import { createUser } from '@/api/users.api';
import { type CommandAttributes, Form, type FieldAttributes } from '@/components/Form';
import { getToastConfig } from '@/helpers/toast.config';
import { Routes } from '@/helpers/routes';
import type { PersonCreate } from '@/schemas/person.schema';
import type { UserCreate } from '@/schemas/user.schema';
import { formattedDateForInput, subtractYears } from '@/utils/date';

type RegistrationValues = UserCreate & PersonCreate;

const SignUpForm = () => {
  const formMethods = useForm<RegistrationValues>();

  const data = useMemo<FieldAttributes<RegistrationValues>[]>(
    () => [
      {
        type: 'text',
        name: 'dni',
        label: 'Identificación',
        required: true,
      },
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
        required: true,
      },
      {
        type: 'text',
        name: 'surname',
        label: 'Apellidos',
        required: true,
      },
      {
        type: 'text',
        name: 'address',
        label: 'Dirección',
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico',
        required: true,
      },
      {
        type: 'phone',
        name: 'phone',
        label: 'Teléfono',
        required: true,
      },
      {
        type: 'select',
        name: 'gender',
        label: 'Genero',
        required: true,
        options: [
          { label: '- Seleccionar genero -', value: 'none' },
          { label: 'Masculino', value: 'masculino' },
          { label: 'Femenino', value: 'femenino' },
        ],
      },
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento',
        max: formattedDateForInput(subtractYears(14)),
        required: true,
      },
      {
        type: 'select',
        name: 'documentType',
        label: 'Tipo de documento',
        required: true,
        options: [
          { label: '- Seleccionar documento -', value: 'none' },
          { label: 'T.I.', value: 'T.I.' },
          { label: 'C.C.', value: 'C.C.' },
          { label: 'C.E.', value: 'C.E.' },
        ],
      },
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
      submit: { label: 'Registrar' },
      reset: { label: 'Limpiar' },
    }),
    []
  );

  const handleLogin: SubmitHandler<RegistrationValues> = async (formData) => {
    try {
      const personData: PersonCreate = formData;
      const userData: UserCreate = formData;

      await createPerson(personData);
      await createUser(userData);

      await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        callbackUrl: Routes.HOME.path,
      });
    } catch (error) {
      toast.error<string>((error as Error).message, getToastConfig());
    }
  };

  return (
    <FormProvider<RegistrationValues> {...formMethods}>
      <Form<RegistrationValues> data={data} commands={commands} onSubmit={handleLogin} />
    </FormProvider>
  );
};

export default SignUpForm;
