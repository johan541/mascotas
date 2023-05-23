import { PetSchema } from '@/schemas/pet.schema';
import styles from './Gallery.module.scss';
import { Card } from '../Card';

type Props = {
  readonly pets: PetSchema[];
};

const Gallery: React.FC<Props> = ({ pets }) => {
  return (
    <section className={styles.gallery}>
      {pets.map((pet) => (
        <Card key={pet._id} pet={pet} />
      ))}
    </section>
  );
};

export default Gallery;
