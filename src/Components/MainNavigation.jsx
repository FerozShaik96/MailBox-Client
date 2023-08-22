import React from 'react';
import NavSidebar from './NavSidebar';
import Header from './Header';
import imgg from '../utilities/imgg.jpg';
import { Outlet } from 'react-router-dom';

function MainNavigation() {
  return (
    <div className=" relative h-full w-full">
      <img
        src={imgg}
        alt=""
        className=" absolute h-full w-full  object-fill mix-blend-overlay"
      />
      <div className="flex  ">
        <NavSidebar />
        <div className="block w-full">
          <Header />
          <div className="mx-auto mt-5 min-h-screen w-11/12 rounded-xl bg-white  ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainNavigation;
