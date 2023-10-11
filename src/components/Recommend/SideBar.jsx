import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar() {
  const category = [
    { name: '축제 둘러보기', path: '/recommend/festival' },
    { name: '맛집 둘러보기', path: '/recommend/restaurant' },
    { name: '관광지 둘러보기', path: '/recommend/location' }
  ];

  const active = {
    backgroundColor: 'rgba(122, 192, 240, 0.37)',
    width: '180px',
    height: '35px',
    color: '#222222',
    fontWeight: '700',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
  };

  const nonActive = {
    width: '180px',
    height: '35px',
    color: 'grey',
    fontWeight: '700',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center'
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
          >
            <p>{cate.name}</p>
          </NavLink>
        );
      })}
    </div>
  );
}

export default SideBar;
