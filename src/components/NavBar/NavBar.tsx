import { NavLink } from '@/components/NavLink';
import { Routes } from '@/helpers/routes';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
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
    </nav>
  );
};

export default NavBar;
