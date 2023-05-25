import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { IconMars, IconVenus } from '@tabler/icons-react';

import { getToastConfig } from '@/helpers/toast.config';
import { PetSchema } from '@/schemas/pet.schema';
import { calculateMonths } from '@/utils/date';

import styles from './Card.module.scss';
import { AdoptionCreate } from '@/schemas/adoption.schema';
import { createAdoption } from '@/api/adoption.api';

type Props = {
  readonly pet: PetSchema;
};

const Card: React.FC<Props> = ({ pet }) => {
  const { data: session } = useSession();

  const userId = session?.user._id ?? '';

  const handleAdopted = async () => {
    try {
      const adoption: AdoptionCreate = {
        pet: pet._id,
        user: userId,
      };

      await createAdoption(adoption);

      toast.info<string>('Adopción solicitada', getToastConfig());
    } catch (error) {
      toast.error<string>((error as Error).message, getToastConfig());
    }
  };

  return (
    <section className={styles.card}>
      <h3 className={styles.title}>{pet.name}</h3>
      {pet.birthdate ? (
        <span className={styles.date}>{calculateMonths(pet.birthdate)} Meses</span>
      ) : null}
      <div className={styles.content}>
        <span className={styles.badge}>{pet.speciesBreed.specie.name}</span>
        <span className={styles.badge}>{pet.speciesBreed.breed.name}</span>
      </div>
      <div className={styles.sex}>
        {pet.gender === 'masculino' ? <IconMars /> : <IconVenus />}
      </div>
      <button
        className={styles.button}
        onClick={handleAdopted}
        disabled={pet.user === userId}
      >
        Adóptame!
      </button>
    </section>
  );
};

export default Card;
