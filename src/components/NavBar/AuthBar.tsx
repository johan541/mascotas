import Avvvatars from 'avvvatars-react';
import { IconCaretDown } from '@tabler/icons-react';

import styles from './NavBar.module.scss';
import { useSession } from 'next-auth/react';

const AuthBar = () => {
  const { data: session, status } = useSession();
  console.log({ session, status });
  const name = session?.user?.person.name.split(' ')[0] || 'User';

  return (
    <section className={styles.session}>
      <Avvvatars
        style='shape'
        value={name}
        size={28}
        shadow
        border
        borderColor='#de9629'
        aria-hidden
      />
      <span className={styles.username}>{name}</span>
      <IconCaretDown
        stroke={2.4}
        className={styles.arrow}
        aria-label='Menú desplegable del usuario'
      />
    </section>
  );
};

export default AuthBar;
