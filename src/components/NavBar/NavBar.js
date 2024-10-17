import React from 'react';
import { Home, Book, User, ChefHat } from 'lucide-react';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logoContainer}>
          <div className={styles.logoBackground}>
            <ChefHat size={30} color="white" />
          </div>
        </a>
        <div className={styles.navLinks}>
          <a href="/" className={styles.navLink}>
            <Home size={18} className={styles.navLinkIcon} />
            Home
          </a>
          <a href="/recipes" className={styles.navLink}>
            <Book size={18} className={styles.navLinkIcon} />
            Recipes
          </a>
          <a href="/profile" className={styles.navLink}>
            <User size={18} className={styles.navLinkIcon} />
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
}