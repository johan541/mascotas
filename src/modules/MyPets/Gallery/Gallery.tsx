import { useMemo } from 'react';

import { AdoptionSchema } from '@/schemas/adoption.schema';
import styles from './Gallery.module.scss';
import { Card } from '../Card';

type Props = {
  readonly adoptedPets: AdoptionSchema[];
};

const Gallery: React.FC<Props> = ({ adoptedPets }) => {
  const pets = useMemo(() => adoptedPets.map((adoption) => adoption.pet), [adoptedPets]);

  return (
    <section className={styles.gallery}>
      {pets.map((pet) => (
        <Card key={pet._id} pet={pet} />
      ))}
    </section>
  );
};

export default Gallery;
