import React from 'react';
import { RxBox } from 'react-icons/rx';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TbRotate, TbDotsVertical } from 'react-icons/tb';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { BsKeyboardFill } from 'react-icons/bs';
function ContentHeder() {
  return (
    <>
      <div className=" flex items-center justify-between border-b border-gray-700 border-opacity-30 ps-2 hover:shadow-lg">
        <div className="ms-2 flex h-10 w-2/12 items-center justify-evenly  ">
          <div className="flex  ">
            <button className="rounded-lg px-1 py-2  hover:bg-slate-500 hover:bg-opacity-30">
              <RxBox className="text-xl " />
            </button>
            <button className="rounded-lg px-1 py-2  text-gray-700 hover:bg-slate-500 hover:bg-opacity-30">
              <TiArrowSortedDown className="text-md " />
            </button>
          </div>
          <button className="rounded-full px-3 py-3 text-gray-700 hover:bg-slate-500 hover:bg-opacity-30 hover:duration-700">
            <TbRotate />
          </button>
          <button className="rounded-full px-3 py-3 text-gray-700 hover:bg-slate-500 hover:bg-opacity-30 hover:duration-700">
            <TbDotsVertical />
          </button>
        </div>
        <div className="flex h-12 items-center gap-x-2  text-gray-700">
          <button className=" rounded-md px-1 py-2 text-sm hover:bg-slate-500 hover:bg-opacity-30">
            1-5 of 50
          </button>
          <div className="flex gap-x-4">
            <button className="rounded-full px-3 py-3 duration-700 hover:bg-slate-500 hover:bg-opacity-30">
              <LiaAngleLeftSolid className=" text-md" />
            </button>
            <button className="rounded-full px-3 py-3 duration-700 hover:bg-slate-500 hover:bg-opacity-30">
              <LiaAngleRightSolid className="text-md" />
            </button>
          </div>
          <div className="me-4 flex">
            <button className="rounded-lg px-1 py-2 hover:bg-slate-500 hover:bg-opacity-30">
              <BsKeyboardFill className=" text-md  " />
            </button>
            <button className="rounded-lg px-1 py-2 hover:bg-slate-500 hover:bg-opacity-30">
              <TiArrowSortedDown className=" text-md  " />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContentHeder;
