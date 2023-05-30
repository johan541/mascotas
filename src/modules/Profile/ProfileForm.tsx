import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type CommandAttributes, Form, type FieldAttributes } from '@/components/Form';
import { getToastConfig } from '@/helpers/toast.config';
import type { PersonCreate } from '@/schemas/person.schema';
import type { UserCreate } from '@/schemas/user.schema';
import { formattedDateForInput, subtractYears } from '@/utils/date';

type Props = {
  readonly disabled?: boolean;
};

type ProfileValues = Omit<Partial<UserCreate & PersonCreate>, 'birthdate'> & {
  readonly birthdate: string | Date | undefined;
};

const ProfileForm: React.FC<Props> = ({ disabled = true }) => {
  const { data: session } = useSession();

  const userData = useMemo<ProfileValues>(
    () => ({
      dni: session?.user.person.dni,
      name: session?.user.person.name,
      surname: session?.user.person.surname,
      address: session?.user.person.address,
      email: session?.user.person.email,
      phone: session?.user.person.phone,
      gender: session?.user.person.gender,
      birthdate: session
        ? formattedDateForInput(session.user.person.birthdate)
        : undefined,
      documentType: session?.user.person.documentType,
      username: session?.user.username,
      password: undefined,
    }),
    [session]
  );

  const formMethods = useForm<ProfileValues>({ defaultValues: userData });

  const data = useMemo<FieldAttributes<ProfileValues>[]>(
    () => [
      {
        type: 'select',
        name: 'documentType',
        label: 'Tipo de documento',
        options: [
          { label: '- Seleccionar documento -', value: 'none' },
          { label: 'T.I.', value: 'T.I.' },
          { label: 'C.C.', value: 'C.C.' },
          { label: 'C.E.', value: 'C.E.' },
        ],
        disabled: true,
      },
      {
        type: 'text',
        name: 'dni',
        label: 'Identificación',
        disabled: true,
      },
      {
        type: 'text',
        name: 'username',
        label: 'Usuario',
        disabled: true,
      },
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
        disabled,
      },
      {
        type: 'text',
        name: 'surname',
        label: 'Apellidos',
        disabled,
      },
      {
        type: 'text',
        name: 'address',
        label: 'Dirección',
        disabled,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Correo electrónico',
        disabled: true,
      },
      {
        type: 'phone',
        name: 'phone',
        label: 'Teléfono',
        disabled,
      },
      {
        type: 'select',
        name: 'gender',
        label: 'Genero',
        options: [
          { label: '- Seleccionar genero -', value: 'none' },
          { label: 'Masculino', value: 'masculino' },
          { label: 'Femenino', value: 'femenino' },
        ],
        disabled,
      },
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento',
        max: formattedDateForInput(subtractYears(14)),
        disabled,
      },
      {
        type: 'password',
        name: 'password',
        label: 'Contraseña',
        disabled,
      },
    ],
    [disabled]
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Actualizar', disabled },
      reset: { label: 'Cancelar', disabled },
    }),
    [disabled]
  );

  const handleLogin: SubmitHandler<ProfileValues> = async (formData) => {
    try {
      console.log({ formData });
    } catch (error) {
      toast.error<string>((error as Error).message, getToastConfig());
    }
  };

  return (
    <FormProvider<ProfileValues> {...formMethods}>
      <Form<ProfileValues>
        data={data}
        commands={disabled ? undefined : commands}
        onSubmit={handleLogin}
      />
    </FormProvider>
  );
};

export default ProfileForm;
