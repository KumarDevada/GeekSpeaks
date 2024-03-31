// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Navbar = () => {
    const [open ,setopen] = useState(false);
    const [openS, setopenS] = useState(false)
    const [userData, setuserdata] = useState(null)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('user'));
        setuserdata(data);
        // console.log('User data from local storage:', userData);
    },[open,openS])
    

    const onOpen = () => {
        setopen(true);
    }

    const opensignup = () => {
        setopenS(true);
    }

    const onClose = () => {
        setopen(false);
        setopenS(false)
    }

    const logout = () => {
        setuserdata(null);
        localStorage.removeItem('user')
        onClose();
    }
    
  return (
    <nav>
      <ul className='hl'>
        <li><Link className='lnk' to="/">Articles</Link></li>
        <li><Link className='lnk' to="/questions">Questions</Link></li>
      </ul>

      <h1 className='logo'>GeekSpeaks !</h1>

      {!userData && (
          <ul className='hl hl2'>
          <li><button className='login' onClick={onOpen}>Login</button></li>
          <li><button className='signup'onClick={opensignup}>signup</button></li>
        </ul>
      )}

      {userData && (
          <ul className='hl hl2'>
          <li><button className='login' onClick={onOpen}><span>&#128100;</span>{userData.name}</button></li>
          <li><button className='signup' onClick={logout}>Logout</button></li>
        </ul>
      )}



      

      {open && <Login onClose={onClose} />}
      {openS && <Signup onClose={onClose}/>}

    </nav>
  );
};

export default Navbar;
