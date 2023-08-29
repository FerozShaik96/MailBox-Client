import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RxBox, RxClock } from 'react-icons/rx';
import { TiArrowSortedDown } from 'react-icons/ti';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { TbStar, TbRotate, TbDotsVertical, TbTrash } from 'react-icons/tb';
import { MdLabelImportantOutline, MdOutlineEmail } from 'react-icons/md';
import { BiArchiveIn } from 'react-icons/bi';
import { BsKeyboardFill } from 'react-icons/bs';
const Sent = () => {
  const [sentData, setSentData] = useState([]);
  const email = localStorage.getItem('emailId').replace(/@.*/, '');
  const fetchData = async () => {
    try {
      const data = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/sentBox/${email}.json`,
      );
      const resData = await data.json();
      const loadedData = [];
      for (const key in resData) {
        if (!resData[key].isDeleted) {
          loadedData.push({
            id: key,
            subject: resData[key].subject,
            description: resData[key].description,
            recipitents: resData[key].recipients,
            to: resData[key].recipients.split('@')[0],
          });
        }
      }
      setSentData(loadedData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const trashHandler = async (item) => {
    const delet = await fetch(
      `https://mail-box-client-1328c-default-rtdb.firebaseio.com/sentBox/${email}/${item.id}.json`,
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
  };
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
            1-10 of 50
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
      <ul className="">
        {sentData &&
          sentData.map((item) => (
            <li
              key={item.id}
              // className="group flex h-10 w-full items-center   border  border-gray-700 border-opacity-20  ps-8 text-gray-500 hover:text-gray-900 hover:shadow-md "
            >
              <Link
                to={`${item.id}`}
                className="group flex h-10 w-full items-center   border  border-gray-700 border-opacity-20  ps-8 text-gray-500 hover:text-gray-900 hover:shadow-md"
              >
                <div className=" flex w-3/12 items-center gap-x-4 text-lg">
                  <RxBox className="" />
                  <TbStar className="" />
                  <MdLabelImportantOutline className="text-xl" />
                  <h1 className="flex">
                    To: <span>{item.to}</span>
                  </h1>
                </div>
                <div className="ms-3 flex w-8/12  gap-x-2 ">
                  <p>{item.subject} -</p>
                  <p>{item.description}</p>
                </div>

                <button className=" invisible me-4 flex items-center gap-x-4 text-lg hover:text-gray-900 group-hover:visible">
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
          ))}
      </ul>
    </React.Fragment>
  );
};

export default Sent;
