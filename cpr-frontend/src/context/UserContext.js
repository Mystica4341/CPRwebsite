import React, { createContext, useState, useContext, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

// Create a context, temporary memory
const UserContext = createContext({user: null, admin: null});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    const username = decodedToken.username;
    const email = decodedToken.email;
    const role =  decodedToken.role; 
    const phoneNumber = decodedToken.phoneNumber;
    const address = decodedToken.address;

    //set Admin or User
    if (role === 'admin') {
      setAdmin({ username: username, email: email, role: role, phoneNumber: phoneNumber, address: address, auth: true });
      setUser(null);
    } else {
      setUser({ username: username, email: email, role: role, phoneNumber: phoneNumber, address: address, auth: true });
      setAdmin(null);
    }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setAdmin(null);
  }
  
  useEffect(() =>{
    const token = localStorage.getItem('token');
    if (token) {
      try {
        login(token);
      }catch(error) {
        console.log('Error with decoding token: ', error);
        logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, admin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };