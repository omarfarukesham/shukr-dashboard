import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem('role');
  const location = useLocation();
  
  if (role !== 'admin') {
    return <Navigate to="/user" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export const UserRoute = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem('role');
  const location = useLocation();
  
  if (role !== 'user') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};