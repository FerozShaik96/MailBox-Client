import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoTriangleDown } from 'react-icons/go';
import google from '../utilities/images.png';

function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const passwordRef = useRef();
  const submitHandler = async (event) => {
    event.preventDefault();
    const emailEntered = emailRef.current.value;
    const passwordEntered = passwordRef.current.value;
    console.log(emailEntered);
    setIsLoading(true);
    const data = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAH2I53ph99hYqV4FHTfgbvUQHNk_-qK3E',
      {
        method: 'POST',
        body: JSON.stringify({
          email: emailEntered,
          password: passwordEntered,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const response = await data.json();
    console.log(response);
    if (response && response.error && response.error.message) {
      let errorMessage = 'Auhtentication Failed';
      errorMessage = response.error.message;
      alert(errorMessage);
    }
    setIsLoading(false);
    navigate('/login');
    return response;
  };
  return (
    <React.Fragment>
      <div className=" flex h-screen items-center justify-center gap-x-6 bg-gradient-to-b from-gray-50 to-gray-200 text-lg ">
        <div className=" mx-auto  w-full max-w-[450px] ">
          <div className=" rounded-2xl  border bg-white p-12   shadow-xl">
            <form onSubmit={submitHandler}>
              <div className="flex justify-center">
                <img
                  src={google}
                  className="h-[73px] w-[73px]   object-cover"
                  alt=""
                />
              </div>
              <h1 className=" mb-6 text-center text-2xl  font-normal">
                Create a Google Account
              </h1>
              <div className="mb-2 flex flex-col">
                <lable className="my-2 text-base font-semibold">
                  Enter Gmail Address
                </lable>
                <input
                  type="email"
                  ref={emailRef}
                  placeholder="Gmail Address"
                  className="rounded-md border py-1  ps-3 shadow-sm  invalid:border-red-500  focus:border-blue-700 focus:outline-none  focus:ring-1 focus:ring-blue-500 focus:invalid:border-red-500 focus:invalid:ring-red-500
              disabled:border-slate-200 disabled:bg-slate-50
              disabled:text-slate-500 disabled:shadow-none "
                />
              </div>
              <div className="flex flex-col">
                <lable className="my-2 text-base font-semibold">
                  Enter your password
                </lable>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter Your password"
                  className="rounded-md border py-1 ps-3 shadow-sm focus:border-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 "
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-blue-700 from-indigo-600 to-indigo-400 py-2 tracking-wide  hover:bg-gradient-to-b"
              >
                {isLoading ? 'Submitting...' : 'Create Account'}
              </button>
            </form>
            <button className="mt-5 rounded-full p-3 text-base font-semibold text-blue-700 hover:bg-slate-200">
              <Link to="/login">Existing User / Login</Link>
            </button>
          </div>
          <div className="my-3 flex items-center justify-between text-sm text-stone-600">
            <button className="ms-1 flex items-center gap-x-6 rounded-lg p-3">
              <p>English(united States)</p>
              <GoTriangleDown />
            </button>
            <ul className="flex w-1/2 justify-between">
              <li className="cursor-pointer">Help</li>
              <li className="cursor-pointer">Privacy</li>
              <li className="me-2 cursor-pointer">Terms</li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignUp;
