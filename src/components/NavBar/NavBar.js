import React from 'react';
import { Home, Book, User } from 'lucide-react';
import styles from './NavBar.module.css';

const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="24" fill="#4A5568"/>
    <path d="M14 33V15H19V33H14ZM29 33V15H34V33H29Z" fill="white"/>
    <path d="M24 33C21.2386 33 19 26.2843 19 18C19 9.71573 21.2386 3 24 3C26.7614 3 29 9.71573 29 18C29 26.2843 26.7614 33 24 33Z" fill="white"/>
  </svg>
);

export default function NavBar() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logoContainer}>
          <Logo />
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