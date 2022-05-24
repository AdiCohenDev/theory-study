import React from 'react';

const MobileNavbar = ({ setNavIconClass, navIconClass, setNavItemsClass, navItemsClass }: any) => {
  const navBtnClassToggle = () => {
    if (navItemsClass === 'nav-menu') {
      setNavItemsClass('nav-menu nav-active');
    } else setNavItemsClass('nav-menu');

    if (navIconClass === 'nav-btn') {
      setNavIconClass('nav-btn nav-close');
    } else setNavIconClass('nav-btn');
  };

  return (
    <>
      <div onClick={navBtnClassToggle} className={navIconClass}>
        <div className="line1-nav"></div>
        <div className="line2-nav"></div>
        <div className="line3-nav"></div>
      </div>
    </>
  );
};

export default MobileNavbar;
