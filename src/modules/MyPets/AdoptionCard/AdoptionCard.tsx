import Avvvatars from 'avvvatars-react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { IconMars, IconVenus } from '@tabler/icons-react';

import { updateAdoption } from '@/api/adoption.api';
import { PetSchema } from '@/schemas/pet.schema';
import { calculateMonths } from '@/utils/date';

import styles from './AdoptionCard.module.scss';
import { AdoptionSchema, AdoptionUpdate } from '@/schemas/adoption.schema';

type Props = {
  readonly pet: PetSchema;
  readonly adoptionRequests: AdoptionSchema[];
};

const AdoptionCard: React.FC<Props> = ({ pet, adoptionRequests }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const userId = session?.user._id ?? '';

  const isAdoptionRequest = useMemo(
    () => adoptionRequests.some((adoption) => adoption.user._id === userId),
    [userId, adoptionRequests]
  );

  const handleAdoptionRequest = async (adoption: AdoptionSchema) => {
    const adoptionToUpdate: AdoptionUpdate = {
      user: adoption.user._id,
      pet: adoption.pet,
      isAdopted: true,
    };

    await updateAdoption(adoption._id, adoptionToUpdate);

    await router.replace(router.asPath);
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
      {isAdoptionRequest ? null : (
        <section className={styles['person-gallery']}>
          {adoptionRequests.map((adoption) => (
            <section className={styles['person-card']} key={adoption._id}>
              <section className={styles.logo}>
                <Avvvatars
                  style='shape'
                  value={adoption.user.person.name.split(' ')[0]}
                  shadow
                  border
                  borderColor='#de9629'
                  aria-hidden
                />
              </section>
              <span className={styles.name}>
                {`${adoption.user.person.name} ${adoption.user.person.surname}`}
              </span>
              <button
                className={styles.button}
                onClick={() => handleAdoptionRequest(adoption)}
              >
                Aprobar
              </button>
            </section>
          ))}
        </section>
      )}
    </section>
  );
};

export default AdoptionCard;
