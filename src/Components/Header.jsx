import React, { useRef, useState } from 'react';
import {
  TbSearch,
  TbAdjustmentsHorizontal,
  TbSettings,
  TbGridDots,
} from 'react-icons/tb';
import logo from '../utilities/Gmail_logo_24px.png';
import img from '../utilities/my-photo.jpg';
import { GoQuestion } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { LuPlusCircle } from 'react-icons/lu';
function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuref = useRef();
  const imgRef = useRef();
  window.addEventListener('click', (e) => {
    if (e.target !== menuref.current && e.target !== imgRef.current) {
      setOpen(false);
    }
  });
  const LogOutHandler = () => {
    localStorage.clear();
    navigate('/login');
  };
  return (
    <React.Fragment>
      <div className=" mx-4 mt-1 flex justify-between  pb-2  ps-9 ">
        <div className="  mt-7 flex h-10 items-center gap-x-2 ">
          <div className="">
            <img src={logo} alt="Gmail Logo" />
          </div>
          <h1 className="text-2xl font-light tracking-wide text-white">
            Gmail
          </h1>
        </div>
        <div className="mt-6 flex h-10 items-center rounded-full  bg-light-white px-4 py-6 ">
          <div className=" flex  items-center">
            <TbSearch className="float-left  me-3   block cursor-pointer text-xl text-white" />
            <div>
              <input
                type="search"
                placeholder="Search in mail"
                className=" w-[28rem] bg-transparent ps-3  text-xl font-semibold text-white    "
              />
            </div>
          </div>
          <div>
            <TbAdjustmentsHorizontal className="float-right  me-3   block cursor-pointer text-xl text-white" />
          </div>
        </div>
        <div className={` mt-7 flex h-10 space-x-6  `}>
          <button className=" ">
            <GoQuestion size={26} className="text-white" />
          </button>
          <button className="">
            <TbSettings size={26} className="text-white" />
          </button>
          <button className="">
            <TbGridDots size={26} className="text-white" />
          </button>
          <div className="relative">
            <img
              ref={imgRef}
              onClick={() => setOpen(!open)}
              src={img}
              alt="User_img"
              className="h-10 w-10 cursor-pointer  rounded-full border-2  border-gray-400  object-cover hover:shadow-lg"
            />
            {open && (
              <div
                ref={menuref}
                className="absolute right-5 top-16  w-52 rounded-xl bg-white p-4 shadow-lg"
              >
                <ul>
                  <li
                    onClick={() => setOpen(false)}
                    className="mb-2  cursor-pointer rounded-xl p-2 ps-5 text-lg hover:bg-blue-100"
                  >
                    profile
                  </li>
                  <li
                    onClick={() => setOpen(false)}
                    className="mb-2 cursor-pointer  rounded-xl p-2 ps-5 text-lg hover:bg-blue-100"
                  >
                    Manage your acoount
                  </li>
                  <li
                    onClick={() => setOpen(false)}
                    className="mb-2 flex cursor-pointer items-center gap-x-3 rounded-xl p-2 ps-5 text-lg hover:bg-blue-100"
                  >
                    <LuPlusCircle />
                    <span>Add account</span>
                  </li>

                  <li
                    // onClick={() => setOpen(false)}
                    className="mb-2 cursor-pointer rounded-xl p-2 ps-5 text-lg hover:bg-blue-100"
                  >
                    <button onClick={LogOutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;
