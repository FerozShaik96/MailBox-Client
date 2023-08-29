import React, { useEffect, useState } from 'react';
import { RxBox, RxClock } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { InboxActions } from '../store/InboxReducer';
import { Link } from 'react-router-dom';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TbStar, TbRotate, TbDotsVertical, TbTrash } from 'react-icons/tb';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { MdLabelImportantOutline, MdOutlineEmail } from 'react-icons/md';
import { BiArchiveIn } from 'react-icons/bi';
import { BsKeyboardFill } from 'react-icons/bs';
function Inbox() {
  // const [reciverData, setReciveData] = useState([]);
  const reciver = localStorage.getItem('emailId').split('@')[0];
  const dispatch = useDispatch();
  const inboxData = useSelector((state) => state.inboxReducer.inbox);
  // console.log(inboxData);
  const fetchData = async () => {
    const inboxData = await fetch(
      `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}.json`,
    );
    if (inboxData.ok) {
      const resData = await inboxData.json();
      const loadedData = [];
      for (const key in resData) {
        // if (!resData[key].isDeleted) {
        loadedData.push({
          id: key,
          subject: resData[key].subject,
          seen: resData[key].seen,
          isDeleted: resData[key].isDeleted,
          description: resData[key].description,
          recipitents: resData[key].recipients,
          from: resData[key].EmailReplace,
        });
        // }
      }
      dispatch(InboxActions.updateData(loadedData));
    }
  };

  useEffect(() => {
    fetchData();
  }, [inboxData]);
  const trashHandler = async (item) => {
    console.log('Hello');
    console.log(item.id);
    const trashData = await fetch(
      `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}/${item.id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          isDeleted: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (trashData.ok) {
      const dataTrash = await trashData.json();
      dispatch(InboxActions.updateTrash(item.id));
      console.log(dataTrash);
    }
  };
  const InboxChangeHandler = async (item) => {
    const inboxChange = await fetch(
      `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}/${item.id}.json`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          seen: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (inboxChange) {
      dispatch(InboxActions.updateSeen(item.id));
      const data = await inboxChange.json();
    }
  };
  return (
    <React.Fragment>
      <div className=" flex items-center justify-between border-b border-gray-700 border-opacity-30 ps-2 hover:shadow-lg">
        <div className="ms-2 flex h-14 w-2/12 items-center justify-evenly  ">
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
      <ul className="">
        {inboxData.map((item) => {
          if (!item.isDeleted) {
            return (
              <li
                key={item.id}
                onClick={() => {
                  InboxChangeHandler(item);
                }}
              >
                <Link
                  to={`${item.id}`}
                  className={` ${
                    item.seen ? 'bg-zinc-400 bg-opacity-30' : ''
                  } group flex h-10 w-full items-center   border  border-gray-700 border-opacity-20  ps-8 text-gray-500 hover:text-gray-900 hover:shadow-md`}
                >
                  <div className=" flex w-1/6 items-center gap-x-4 text-lg">
                    <RxBox className="" />
                    <TbStar className="" />
                    <MdLabelImportantOutline className="text-xl" />
                  </div>
                  <div className="ms-3 flex w-8/12 gap-x-2 text-gray-900 ">
                    <p>{item.subject} -</p>
                    <p>{item.description}</p>
                  </div>

                  <button className=" invisible me-4 flex items-center gap-x-4 text-lg hover:text-gray-700  group-hover:visible">
                    <BiArchiveIn />
                    <TbTrash
                      onClick={(event) => {
                        event.preventDefault();
                        trashHandler(item);
                      }}
                    />
                    <MdOutlineEmail />
                    <RxClock />
                  </button>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </React.Fragment>
  );
}

export default Inbox;
