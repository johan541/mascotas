import Avvvatars from 'avvvatars-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { IconCaretDown, IconLogout } from '@tabler/icons-react';

import { AuthRoutes, DropdownRoutes } from '@/helpers/routes';

import styles from './NavBar.module.scss';

const AuthBar = () => {
  const { data: session } = useSession();
  const nameUser = session?.user?.person.name.split(' ')[0] || 'User';

  return (
    <section className={styles.session}>
      <Avvvatars
        style='shape'
        value={nameUser}
        size={28}
        shadow
        border
        borderColor='#de9629'
        aria-hidden
      />
      <span className={styles.username}>{nameUser}</span>
      <button className={styles.button}>
        <IconCaretDown
          stroke={2.4}
          className={styles.arrow}
          aria-label='Menú desplegable del usuario'
        />
      </button>

      <section className={styles.dropdown}>
        <ul className={styles.menu}>
          {Object.values(DropdownRoutes).map(({ name, path }) => (
            <li key={nameUser} className={styles.item}>
              <Link href={path}>{name}</Link>
            </li>
          ))}
          <li className={styles.item}>
            <button
              className={styles.logout}
              onClick={() => signOut({ callbackUrl: AuthRoutes.SIGN_IN.path })}
            >
              <IconLogout size={20} aria-hidden /> Cerrar sesión
            </button>
          </li>
        </ul>
      </section>
    </section>
  );
};

export default AuthBar;
