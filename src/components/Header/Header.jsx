
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '/assets/logo.svg';
import clsx from 'clsx';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to="/">
        <img src={logo} alt="logo" />
      </Link>
      <nav className={styles.navlink}>
        <NavLink
          to="/"
          className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
