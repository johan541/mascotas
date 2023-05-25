import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { createPet } from '@/api/pets.api';
import { createSpeciesBreed } from '@/api/speciesBreed.api';
import { type CommandAttributes, Form, type FieldAttributes } from '@/components/Form';
import { Modal } from '@/components/Modal';
import { getToastConfig } from '@/helpers/toast.config';
import { Gender } from '@/models/person.model';
import { PetCreate } from '@/schemas/pet.schema';
import { SpeciesBreedCreate } from '@/schemas/speciesBreed.schema';

import styles from './CreateFormModal.module.scss';
import { useSession } from 'next-auth/react';

type PetValues = {
  name: string;
  birthdate?: Date;
  gender: Gender;
  specie: string;
  breed: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateFormModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const formMethods = useForm<PetValues>();

  const data = useMemo<FieldAttributes<PetValues>[]>(
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

  const handleCreate: SubmitHandler<PetValues> = async (formData) => {
    try {
      const speciesBreedData: SpeciesBreedCreate = formData;
      const speciesBreed = await createSpeciesBreed(speciesBreedData);

      const petData: PetCreate = {
        name: formData.name,
        birthdate: formData.birthdate,
        gender: formData.gender,
        speciesBreed: speciesBreed._id,
        user: session?.user._id ?? '',
      };
      await createPet(petData);

      handleClose();
      router.replace(router.asPath);
    } catch (error) {
      toast.error<string>((error as Error).message, getToastConfig());
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      contentLabel='Modal para registrar mascotas'
    >
      <h2 className={styles.title}>Registrar mascota</h2>
      <FormProvider<PetValues> {...formMethods}>
        <Form<PetValues>
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
