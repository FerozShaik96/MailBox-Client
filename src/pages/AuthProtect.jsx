import { Outlet, Navigate } from 'react-router-dom';
function AuthProtect() {
  const isLoggedin = !!localStorage.getItem('userid');
  if (isLoggedin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
}

export default AuthProtect;
