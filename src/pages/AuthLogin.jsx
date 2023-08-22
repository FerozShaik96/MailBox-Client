import { Navigate, Outlet } from 'react-router-dom';
function AuthLogin() {
  const isLoggedIn = !!localStorage.getItem('userid');
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default AuthLogin;
