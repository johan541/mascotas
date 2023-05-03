import { memo } from 'react';
import { IconPaw } from '@tabler/icons-react';

import { NavLink } from '@/components/NavLink';
import { Routes, AuthRoutes } from '@/helpers/routes';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
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

      <ul className={`${styles.navigation} ${styles.auth}`}>
        {Object.values(AuthRoutes).map(({ name, path }) => (
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
    </nav>
  );
};

export default memo(NavBar);
