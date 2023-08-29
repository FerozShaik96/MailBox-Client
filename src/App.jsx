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
import Compose from './pages/Compose';
import SentMessage from './pages/SentMessage';
import TrashMessage from './pages/TrashMessage';
import InboxMessage from './pages/InboxMessage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainNavigation />,
      children: [
        {
          element: <AuthLogin />,
          children: [
            {
              path: 'inbox',
              children: [
                { index: true, element: <Inbox /> },
                { path: ':id', element: <InboxMessage /> },
              ],
            },

            {
              path: 'sent',
              children: [
                { index: true, element: <Sent /> },
                { path: ':id', element: <SentMessage /> },
              ],
            },
            {
              path: 'trash',
              children: [
                { index: true, element: <Trash /> },
                { path: ':id', element: <TrashMessage /> },
              ],
            },
            { path: 'compose', element: <Compose /> },
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
