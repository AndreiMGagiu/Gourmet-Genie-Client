import React from 'react';
import { Wand2 } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Wand2 className="mr-2" size={28} />
        Gourmet Genie
      </h1>
      <p className={styles.description}>
        Your culinary wishes are our command!
      </p>
    </header>
  );
}