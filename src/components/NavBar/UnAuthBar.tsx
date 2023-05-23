import { NavLink } from '@/components/NavLink';
import { AuthRoutes } from '@/helpers/routes';

import styles from './NavBar.module.scss';

const UnAuthBar = () => {
  return (
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
  );
};

export default UnAuthBar;
