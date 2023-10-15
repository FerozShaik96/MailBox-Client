import React, { useEffect, useState } from 'react';
import { trashInboxData } from '../store/Actions/InboxAction';
import { RxBox, RxClock } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TbStar, TbTrash } from 'react-icons/tb';
import { MdLabelImportantOutline, MdOutlineEmail } from 'react-icons/md';
import { BiArchiveIn } from 'react-icons/bi';
import { updateData } from '../store/InboxReducer';
import ContentHeder from '../Components/ContentHeder';
function Trash() {
  const dispatch = useDispatch();
  const [trashData, setTrashData] = useState([]);
  const reciver = localStorage.getItem('emailId').split('@')[0];
  const inboxData = useSelector((state) => state.inboxReducer.inbox);
  const fetchInboxTrashData = async () => {
    const data = await fetch(
      `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}.json`,
    );
    if (data.ok) {
      const resData = await data.json();
      const loadedData = [];
      for (const key in resData) {
        if (resData[key].isDeleted) {
          loadedData.push({
            id: key,
            subject: resData[key].subject,
            seen: resData[key].seen,
            isDeleted: resData[key].isDeleted,
            description: resData[key].description,
            recipitents: resData[key].recipients,
            from: resData[key].EmailReplace,
          });
        }
      }
      setTrashData(loadedData);
      dispatch(updateData(loadedData));
    }
  };
  const trashHandler = async (item) => {
    // const data = await fetch(
    //   `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}/${item.id}.json`,
    //   {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );
    dispatch(trashInboxData(item.id));
    console.log('Trash');
  };
  const trashSentHandler = async (item) => {
    const data = await fetch(
      `https://mail-box-client-1328c-default-rtdb.firebaseio.com/sentbox/${reciver}/${item.id}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('Trash');
  };

  useEffect(() => {
    fetchInboxTrashData();
  }, []);
  return (
    <React.Fragment>
      <ContentHeder />
      <ul>
        {trashData &&
          trashData.map((item) => (
            <Link to={`${item.id}`} key={item.id}>
              <li className="group flex h-10 w-full items-center   border  border-gray-700 border-opacity-20  ps-8 text-gray-500 hover:text-gray-900 hover:shadow-xl">
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
              </li>
            </Link>
          ))}
      </ul>
    </React.Fragment>
  );
}
export default Trash;
