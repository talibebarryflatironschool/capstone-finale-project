import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/check_session', {
      credentials: 'include' // ← This is the key
    })
      .then(r => {
        if (r.ok) return r.json();
        else return null;  
      })
      .then(data => setUser(data));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};