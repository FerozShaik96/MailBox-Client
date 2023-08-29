import React, { useState } from 'react';
import { LuAlignJustify } from 'react-icons/lu';
import { CiMail } from 'react-icons/ci';
import { CgInbox } from 'react-icons/cg';
import { IoSendSharp } from 'react-icons/io5';
import { TbTrash } from 'react-icons/tb';
import { MdEdit } from 'react-icons/md';
import { Link } from 'react-router-dom';
function NavSidebar() {
  const [OpenCompose, setOpenCompose] = useState(false);
  const [open, setOpen] = useState(false);
  const openChangeHandler = () => {
    console.log('Hekllo');
    setOpen(() => !open);
  };
  console.log(OpenCompose);
  return (
    <React.Fragment>
      <div className="flex border-r border-slate-900 border-opacity-50   backdrop-blur-sm ">
        <div
          className={`relative min-h-screen  ${
            open ? 'w-52' : 'w-20'
          } p-5 pt-6 duration-300`}
        >
          <div>
            <button
              onClick={openChangeHandler}
              className=" hover:rounded-ful absolute -right-6  top-7 p-2 text-3xl   text-white"
            >
              <LuAlignJustify />
            </button>
            <div className="inline-flex">
              <CiMail
                className={`float-left mr-2 mt-2 block cursor-pointer rounded text-4xl text-white duration-500 ${
                  open && 'rotate-[360deg]'
                }`}
              />
            </div>
          </div>
          <ul className="mt-14">
            <Link to="compose">
              <li className="mt-2 flex cursor-pointer items-center gap-x-4 rounded-full px-3  py-3 text-sm text-gray-300 hover:bg-light-white ">
                <div>
                  <span
                    onClick={() => setOpen(!open)}
                    className={`float-left block ps-2 text-2xl`}
                  >
                    <MdEdit />
                  </span>
                </div>
                <span
                  className={`flex-1 text-base font-medium tracking-widest duration-200 ${
                    !open && 'hidden'
                  }`}
                  onClick={() => setOpenCompose(!OpenCompose)}
                >
                  Compose
                </span>
              </li>
            </Link>
            <Link to="inbox">
              <li className="mt-2 flex cursor-pointer items-center gap-x-6 rounded-full p-3 text-sm text-gray-300 hover:bg-light-white">
                <div>
                  <span
                    onClick={() => setOpen(!open)}
                    className={`float-left block ps-2 text-2xl`}
                  >
                    <CgInbox />
                  </span>
                </div>
                <span
                  className={`flex-1 text-base font-medium tracking-widest duration-200 ${
                    !open && 'hidden'
                  }`}
                >
                  Inbox
                </span>
              </li>
            </Link>
            <Link to="sent">
              <li className="mt-4  flex cursor-pointer items-center gap-x-6 rounded-full p-3 text-sm text-gray-300 hover:bg-light-white">
                <div>
                  <span
                    className={`float-left block ps-2 text-2xl`}
                    onClick={() => setOpen(!open)}
                  >
                    <IoSendSharp />
                  </span>
                </div>
                <span
                  className={`flex-1 text-base font-medium tracking-widest duration-200 ${
                    !open && 'hidden'
                  }`}
                >
                  Send
                </span>
              </li>
            </Link>
            <Link to="trash">
              <li className="mt-4  flex cursor-pointer items-center gap-x-6 rounded-full p-3 text-sm text-gray-300 hover:bg-light-white">
                <div>
                  <span
                    className={`float-left block ps-2 text-2xl`}
                    onClick={() => setOpen(!open)}
                  >
                    <TbTrash />
                  </span>
                </div>
                <span
                  className={`flex-1 text-base font-medium tracking-widest duration-200 ${
                    !open && 'hidden'
                  }`}
                >
                  Trash
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavSidebar;
