import React, { useEffect } from 'react';
import { RxBox, RxClock } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TbStar, TbTrash } from 'react-icons/tb';
import { MdLabelImportantOutline, MdOutlineEmail } from 'react-icons/md';
import { BiArchiveIn } from 'react-icons/bi';
import {
  inboxAction,
  trashChangeHandler,
  InboxChanger,
} from '../store/Actions/InboxAction';
import ContentHeder from '../Components/ContentHeder';
function Inbox() {
  const dispatch = useDispatch();
  const inboxData = useSelector((state) => state.inboxReducer.inbox);
  const trashHandler = async (item) => {
    console.log(item);
    dispatch(trashChangeHandler(item.id));
  };
  useEffect(() => {
    console.log('Hello');
    const fetchData = async () => {
      dispatch(inboxAction());
    };
    fetchData();
  }, [trashHandler]);
  const InboxChangeHandler = async (item) => {
    dispatch(InboxChanger(item.id));
  };
  return (
    <React.Fragment>
      <ContentHeder />
      <ul>
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

                  <button className="  me-4 flex items-center gap-x-4 text-lg hover:text-gray-700  group-hover:visible">
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
