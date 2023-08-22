import React from 'react';
import Sent from './pages/Sent';
import Login from './pages/Login';
import Trash from './pages/Trash';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Inbox from './pages/Inbox';
import MainNavigation from './Components/MainNavigation';
import SignUp from './pages/SignUp';
import Forgot from './pages/Forgot';
import AuthLogin from './pages/AuthLogin';
import AuthProtect from './pages/AuthProtect';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainNavigation />,
      children: [
        {
          element: <AuthLogin />,
          children: [
            { index: true, element: <Inbox /> },
            { path: 'sent', element: <Sent /> },
            { path: 'trash', element: <Trash /> },
          ],
        },
      ],
    },
    {
      element: <AuthProtect />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'forgot', element: <Forgot /> },
        { path: 'signup', element: <SignUp /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
