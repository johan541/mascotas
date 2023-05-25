import { PetSchema } from '@/schemas/pet.schema';
import AdoptionCard from '../AdoptionCard';
import styles from './AdoptionGallery.module.scss';
import { AdoptionSchema } from '@/schemas/adoption.schema';

type Props = {
  readonly petsForAdoption: Array<{
    pet: PetSchema;
    users: AdoptionSchema[];
  }>;
};

const AdoptionGallery: React.FC<Props> = ({ petsForAdoption }) => {
  return (
    <section className={styles.gallery}>
      {petsForAdoption.map((pet) => (
        <AdoptionCard key={pet.pet._id} pet={pet.pet} adoptionRequests={pet.users} />
      ))}
    </section>
  );
};

export default AdoptionGallery;
