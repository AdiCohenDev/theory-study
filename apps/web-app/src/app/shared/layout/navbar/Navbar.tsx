import './Navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileNavbar from './MobileNavbar';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../../../stores/AuthStore';

const Navbar = () => {
  const [navItemsClass, setNavItemsClass] = useState<string>('nav-menu');
  const [navIconClass, setNavIconClass] = useState<string>('nav-btn');
  const isAuth = useSelector(selectIsAuth);

  const onLinkClickCloseNav = () => {
    setNavItemsClass('nav-menu');
    setNavIconClass('nav-btn');
  };

  const linkStyle = {
    color: 'rgb(204, 204, 204)',
    textDecoration: 'none',
  };
  const navItems = [
    {
      to: '/',
      caption: 'עמוד הבית',
    },
    {
      to: '/login',
      caption: 'התחברות',
      unProtectedRoute: true,
    },
    {
      to: '/logout',
      caption: 'התנתקות',
    },
    {
      to: '/practice',
      caption: 'לתרגול',
    },
    {
      to: '/',
      caption: 'למבחן',
    },
    {
      to: '/',
      caption: 'הגדרות',
    },
  ];
  return (
    <>
      <div className="nav">
        <span className="nav-brand">לימודי תיאוריה</span>
        <ul className={navItemsClass}>
          {navItems
            .filter((navItem) => {
              if (!isAuth && navItem.unProtectedRoute) {
                return true;
              }
              if (isAuth && !navItem.unProtectedRoute) {
                return true;
              }
              return false;
            })
            .map((navItem) => {
              return (
                <li className="nav-item">
                  <Link to={navItem.to} style={linkStyle} onClick={onLinkClickCloseNav}>
                    {navItem.caption}
                  </Link>
                </li>
              );
            })}
        </ul>
        <MobileNavbar
          navIconClass={navIconClass}
          setNavIconClass={setNavIconClass}
          setNavItemsClass={setNavItemsClass}
          navItemsClass={navItemsClass}
        />
      </div>
    </>
  );
};

export default Navbar;
