import React from 'react';
import NavSidebar from './NavSidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function MainNavigation() {
  return (
    <div className="  relative h-full w-full bg-bgIMg bg-cover bg-no-repeat">
      <div className="flex  ">
        <NavSidebar />
        <div className="block w-full">
          <Header />
          <div className="mx-auto mt-5  min-h-screen w-11/12 rounded-xl bg-gray-100 bg-opacity-90 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavigation;
