import { IconMars, IconVenus } from '@tabler/icons-react';

import { PetSchema } from '@/schemas/pet.schema';
import { calculateMonths } from '@/utils/date';

import styles from './Card.module.scss';

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
      <div className={styles.sex}>
        {pet.gender === 'masculino' ? <IconMars /> : <IconVenus />}
      </div>
    </section>
  );
};

export default Card;
