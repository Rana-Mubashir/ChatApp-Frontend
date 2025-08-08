import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

function App() {
  const [isUser, setIsUser] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = Boolean(localStorage.getItem('userData'));
    if (data) {
      setIsUser(true);
      if (location.pathname === '/') {
        navigate('/home');
      }
    } else {
      setIsUser(false);
      if (location.pathname == '/home') {
        navigate('/');
      }
    }
  }, [location.pathname, navigate]);

  if (isUser === null) {
    return null; 
  }

  return (
    <div>
      {isUser && <Header />}
      <Outlet />
      {isUser && <Footer />}
    </div>
  );
}

export default App;
