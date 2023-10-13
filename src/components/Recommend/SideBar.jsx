import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar() {
  const category = [
    { name: '🎉 축제 둘러보기', path: '/recommend/festival' },
    { name: '🥘 맛집 둘러보기', path: '/recommend/restaurant' },
    { name: '🚢 관광지 둘러보기', path: '/recommend/location' }
  ];

  const active = {
    backgroundColor: '#ffffff',
    opacity: '100%',
    border: 'none',
    fontSize: '17px',
    fontWeight: '700',
    color: '#000000',
    borderRadius: '50px',
    padding: '10px 30px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    margin: '0 15px'
  };

  const nonActive = {
    backgroundColor: '#BCBCBC',
    opacity: '70%',
    border: 'none',
    fontSize: '17px',
    fontWeight: '700',
    color: '#000000',
    borderRadius: '50px',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    margin: '0 15px',
    filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.3))'
  };

  return (
    <div className={styles.content}>
      {category.map((cate) => {
        return (
          <NavLink
            to={cate.path}
            key={cate.path}
            style={({ isActive }) => (isActive ? active : nonActive)}
            className={styles.navLink}
            activeClassName={styles.activeLink}
          >
            <span>{cate.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideBar;
