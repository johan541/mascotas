import { IconMars, IconVenus } from '@tabler/icons-react';

import { PetSchema } from '@/schemas/pet.schema';

import styles from './Card.module.scss';
import { calculateMonths } from '@/utils/date';

type Props = {
  readonly pet: PetSchema;
};

const Card: React.FC<Props> = ({ pet }) => {
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
      <button className={styles.button}>Adóptame!</button>
    </section>
  );
};

export default Card;
