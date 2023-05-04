import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { type CommandAttributes, Form, type FieldAttributes } from '@/components/Form';
import styles from './SignUpForm.module.scss';
import { useMemo } from 'react';

type RegistrationModel = {
  dni: number;
  name: string;
  surname: string;
  address: string;
  email: string;
  phone: number;
  gender: 'masculino' | 'femenino';
  birthdate: Date;
  documentType: 'T.I.' | 'C.C.' | 'C.E.';
  username: string;
  password: string;
};

const SignUpForm = () => {
  const formMethods = useForm<RegistrationModel>();

  const data = useMemo<FieldAttributes<RegistrationModel>[]>(
    () => [
      {
        type: 'number',
        name: 'dni',
        label: 'Identificación',
        obligatory: true,
      },
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
        obligatory: true,
      },
      {
        type: 'text',
        name: 'surname',
        label: 'Apellidos',
        obligatory: true,
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
        obligatory: true,
      },
      {
        type: 'number',
        name: 'phone',
        label: 'Teléfono',
        obligatory: true,
      },
      {
        type: 'select',
        name: 'gender',
        label: 'Genero',
        obligatory: true,
        options: [
          { label: 'Masculino', value: 'masculino' },
          { label: 'Femenino', value: 'femenino' },
        ],
      },
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento',
        max: new Date().setFullYear(new Date().getFullYear() - 14),
        obligatory: true,
      },
      {
        type: 'select',
        name: 'documentType',
        label: 'Tipo de documento',
        obligatory: true,
        options: [
          { label: 'T.I.', value: 'T.I.' },
          { label: 'C.C.', value: 'C.C.' },
          { label: 'C.E.', value: 'C.E.' },
        ],
      },
      {
        type: 'text',
        name: 'username',
        label: 'Usuario',
        obligatory: true,
      },
      {
        type: 'password',
        name: 'password',
        label: 'Contraseña',
        obligatory: true,
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

  const handleLogin: SubmitHandler<RegistrationModel> = async (dataForm) => {
    console.log(dataForm);
  };

  return (
    <FormProvider<RegistrationModel> {...formMethods}>
      <Form<RegistrationModel> data={data} commands={commands} onSubmit={handleLogin} />
    </FormProvider>
  );
};

export default SignUpForm;
