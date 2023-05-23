import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { type CommandAttributes, Form, type FieldAttributes } from '@/components/Form';
import styles from './CreateFormModal.module.scss';
import React, { useMemo } from 'react';
import { Modal } from '@/components/Modal';

type PetModel = {
  name: string;
  birthdate?: Date;
  gender: 'masculino' | 'femenino';
  specie: string;
  breed: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateFormModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const formMethods = useForm<PetModel>();

  const data = useMemo<FieldAttributes<PetModel>[]>(
    () => [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre de la mascota',
        obligatory: true,
      },
      {
        type: 'date',
        name: 'birthdate',
        label: 'Fecha de nacimiento',
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
        type: 'text',
        name: 'specie',
        label: 'Especie',
        obligatory: true,
      },
      {
        type: 'text',
        name: 'breed',
        label: 'Raza',
        obligatory: true,
      },
    ],
    []
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Crear' },
      reset: { label: 'Cancelar' },
    }),
    []
  );

  const handleClose = () => {
    formMethods.reset();
    onClose();
  };

  const handleCreate: SubmitHandler<PetModel> = async (dataForm) => {
    console.log(dataForm);
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      contentLabel='Modal para registrar mascotas'
    >
      <h2 className={styles.title}>Registrar mascota</h2>
      <FormProvider<PetModel> {...formMethods}>
        <Form<PetModel>
          data={data}
          commands={commands}
          onSubmit={handleCreate}
          onReset={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default CreateFormModal;
