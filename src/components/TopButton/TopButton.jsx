// TopButton.js
import React, { useState, useEffect, useCallback } from 'react';
import { IconButton } from '@material-tailwind/react';
import styles from './TopButton.module.css';

function TopButton() {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollPositionHandler = useCallback(() => {
    const currentlyScrolled = window.scrollY > 0;
    if (isScrolled !== currentlyScrolled) {
      setIsScrolled(currentlyScrolled);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', scrollPositionHandler);
    return () => {
      window.removeEventListener('scroll', scrollPositionHandler);
    };
  }, [scrollPositionHandler]);

  if (!isScrolled) return null;

  return (
    <div className={styles.topButton}>
      <IconButton
        style={{
          backgroundColor: '#ffffff',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'
        }}
        size="lg"
        className={styles.icon}
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div
          className={styles.content}
          style={{ color: 'black', fontWeight: 'semi-bold' }}
        >
          TOP
        </div>
      </IconButton>
    </div>
  );
}

export default TopButton;
