import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar() {
  const category = [
    { name: '🚢 관광지 둘러보기', path: '/recommend/location' },
    { name: '🥘 맛집 둘러보기', path: '/recommend/tasty' },
    { name: '🎉 축제 둘러보기', path: '/recommend/festival' }
  ];

  return (
    <div className={styles.content}>
      {category.map((cate) => {
        return (
          <NavLink
            to={cate.path}
            key={cate.path}
            className={({ isActive }) => (isActive ? styles.active : styles.nonActive)}
          >
            <span>{cate.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideBar;
