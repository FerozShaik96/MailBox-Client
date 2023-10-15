import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RxBox, RxClock } from 'react-icons/rx';
import { TbStar, TbTrash } from 'react-icons/tb';
import { MdLabelImportantOutline, MdOutlineEmail } from 'react-icons/md';
import { BiArchiveIn } from 'react-icons/bi';
import ContentHeder from '../Components/ContentHeder';
import { sendBoxData, sentBoxTrash } from '../store/Actions/sentBoxActions';
const Sent = () => {
  const dispatch = useDispatch();
  const sentDataReducer = useSelector((state) => state.sendRedcuer.sendBox);
  console.log(sentDataReducer);
  const fetchData = async () => {
    dispatch(sendBoxData());
  };
  const trashHandler = async (item) => {
    dispatch(sentBoxTrash(item.id));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <ContentHeder />
      <ul>
        {sentDataReducer.map((item) => {
          if (!item.isDeleted) {
            return (
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

                  <button className="  me-4 flex items-center gap-x-4 text-lg hover:text-gray-900 group-hover:visible">
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
};

export default Sent;
