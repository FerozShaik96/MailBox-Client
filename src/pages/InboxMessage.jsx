import React from 'react';
import { useParams } from 'react-router-dom';
import { RxBox } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { TiArrowSortedDown } from 'react-icons/ti';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { TbRotate, TbDotsVertical } from 'react-icons/tb';
import { BsKeyboardFill } from 'react-icons/bs';
function InboxMessage() {
  const { id } = useParams();
  const inboxData = useSelector((state) => state.inboxReducer.inbox);
  console.log(inboxData);
  const paramsId = Number(id);
  console.log(id);
  const inboxFilter = inboxData.filter((item) => item.id === id);
  console.log(inboxFilter);
  return (
    <React.Fragment>
      <div className=" flex items-center justify-between border-b border-gray-700 border-opacity-30 ps-2 hover:shadow-lg">
        <div className="ms-2 flex h-14 w-2/12 items-center justify-evenly  ">
          <div className="flex  ">
            <button className="rounded-lg px-1 py-2  hover:bg-slate-500 hover:bg-opacity-30">
              <RxBox className="text-xl " />
            </button>
            <button className="rounded-lg px-1 py-2  text-gray-600 hover:bg-slate-500 hover:bg-opacity-30">
              <TiArrowSortedDown className="text-md text-gray-600" />
            </button>
          </div>
          <button className="rounded-full px-3 py-3 text-gray-600  hover:bg-slate-500 hover:bg-opacity-30 hover:duration-700">
            <TbRotate />
          </button>
          <button className="rounded-full px-3 py-3 text-gray-600  hover:bg-slate-500 hover:bg-opacity-30 hover:duration-700">
            <TbDotsVertical />
          </button>
        </div>
        <div className="flex h-12 items-center gap-x-2  text-gray-500">
          <button className=" rounded-md px-1 py-2 text-sm  hover:bg-slate-500 hover:bg-opacity-30">
            1-50 of 327{' '}
          </button>
          <div className="flex gap-x-4">
            <button className="rounded-full px-3 py-3 duration-700  hover:bg-slate-500 hover:bg-opacity-30">
              <LiaAngleLeftSolid className=" text-md" />
            </button>
            <button className="rounded-full px-3 py-3 duration-700  hover:bg-slate-500 hover:bg-opacity-30">
              <LiaAngleRightSolid className="text-md" />
            </button>
          </div>
          <div className="me-4 flex">
            <button className="rounded-lg px-1 py-2  hover:bg-slate-500 hover:bg-opacity-30">
              <BsKeyboardFill className=" text-md  " />
            </button>
            <button className="rounded-lg px-1 py-2  hover:bg-slate-500 hover:bg-opacity-30">
              <TiArrowSortedDown className=" text-md  " />
            </button>
          </div>
        </div>
      </div>
      <div className="  mt-4 w-full   items-center ps-8  text-xl text-gray-500 hover:text-gray-900">
        <p> From :- {inboxFilter[0].from}@gmail.com</p>
        <h1> subject:- {inboxFilter[0].subject}</h1>
        <h1>Description :- {inboxFilter[0].description}</h1>
      </div>
    </React.Fragment>
  );
}

export default InboxMessage;
