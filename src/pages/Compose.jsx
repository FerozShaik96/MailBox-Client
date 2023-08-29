import { useNavigate } from 'react-router-dom';
import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { RxBox } from 'react-icons/rx';
import { TiArrowSortedDown } from 'react-icons/ti';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia';
import { TbRotate, TbDotsVertical } from 'react-icons/tb';
import { BsKeyboardFill } from 'react-icons/bs';
function Compose() {
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const localId = localStorage.getItem('LocalId');
  const emailid = localStorage.getItem('emailId');
  const recipientsHandler = (event) => {
    setRecipients(event.target.value);
  };
  const subjectHandler = (event) => {
    setSubject(event.target.value);
  };
  const onEditorStateChange = (event) => {
    setEditorState(event);
  };
  const reciver = recipients.replace(/@.*/, '');
  const EmailReplace = emailid.replace(/@.*/, '');
  const submitHandler = async (event) => {
    event.preventDefault();
    const seen = false;
    const isDeleted = false;
    const data = {
      recipients,
      EmailReplace,
      subject,
      description: editorState.getCurrentContent().getPlainText(),
      seen,
      isDeleted,
    };
    try {
      const composeData = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/sentBox/${EmailReplace}.json`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (composeData.ok) {
        const composeResponse = await composeData;
        console.log(composeResponse);
      }
      const recivedmail = await fetch(
        `https://mail-box-client-1328c-default-rtdb.firebaseio.com/inbox/${reciver}.json`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (recivedmail.ok) {
        const recivedRes = await recivedmail;
        console.log(recivedRes);
      }
      setEditorState('');
      setRecipients('');
      setSubject('');
      navigate('/login');
    } catch (err) {
      alert(err.message);
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
            <button className="rounded-lg px-1 py-2  text-gray-700  hover:bg-slate-500 hover:bg-opacity-30">
              <TiArrowSortedDown className="text-md" />
            </button>
          </div>
          <button className="rounded-full px-3 py-3 text-gray-700  hover:bg-slate-500 hover:bg-opacity-30 hover:duration-700">
            <TbRotate />
          </button>
          <button className="rounded-full px-3 py-3 text-gray-700  hover:bg-slate-500 hover:bg-opacity-30 hover:duration-700">
            <TbDotsVertical />
          </button>
        </div>
        <div className="flex h-12 items-center gap-x-2  text-gray-900">
          <button className=" rounded-md px-1 py-2 text-sm hover:bg-slate-500 hover:bg-opacity-30">
            1-50 of 327
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
      <div className="py-3"></div>
      <div className="shadow-3xl mx-auto my-auto   w-1/2   rounded-t-md   text-center">
        {/* absolute right-14 top-24 */}
        <div className=" shadow-3xl h-screen rounded-lg border border-gray-500 border-opacity-25">
          <h1 className=" rounded-t-lg bg-slate-400 bg-opacity-30 py-2">
            New Message
          </h1>
          <form onSubmit={submitHandler} className=" h-5/6">
            <input
              type="email"
              placeholder="Recipients"
              value={recipients}
              onChange={recipientsHandler}
              className="w-full  border py-2 ps-3 shadow-sm  focus:outline-none  
              disabled:border-slate-200 disabled:bg-slate-50
              disabled:text-slate-500 disabled:shadow-none "
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={subjectHandler}
              className="w-full  border py-2 ps-3 shadow-sm  focus:outline-none "
            />
            <div className="h-4/6 rounded-b-xl bg-white  ">
              <Editor
                type="text"
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <div className="ms-10 mt-4 text-left">
              <button
                type="submit"
                className="  my-2 rounded-full border border-blue-700 bg-blue-700 px-10 py-2"
                // className=" absolute bottom-1 left-10 my-2 rounded-full border border-blue-700 bg-blue-700 px-10 py-2"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Compose;
