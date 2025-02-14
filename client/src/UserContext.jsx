import { createContext, useState, useContext } from 'react';

// Create a context with default value of null (no user authenticated)
const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Set user data after authentication
  const login = (userData) => {
    setUser(userData); 
  };

  // Log the user out
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
