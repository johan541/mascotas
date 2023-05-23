import { memo } from 'react';
import { IconPaw } from '@tabler/icons-react';

import { NavLink } from '@/components/NavLink';
import { Routes } from '@/helpers/routes';
import AuthBar from './AuthBar';
import UnAuthBar from './UnAuthBar';

import styles from './NavBar.module.scss';

type Props = {
  readonly sessionStatus?: 'authenticated' | 'unauthenticated' | 'loading';
};

const NavBar: React.FC<Props> = ({ sessionStatus = 'unauthenticated' }) => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        href={Routes.HOME.path}
        className={styles.brand}
        aria-label='Página principal'
      >
        <IconPaw size={32} aria-hidden />
      </NavLink>

      <ul className={styles.navigation}>
        {Object.values(Routes).map(({ name, path }) => (
          <li key={name} className={styles.item}>
            <NavLink
              href={path}
              className={(active) => `${styles.link} ${active && styles.active}`}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {sessionStatus === 'authenticated' ? <AuthBar /> : <UnAuthBar />}
    </nav>
  );
};

export default memo(NavBar);
