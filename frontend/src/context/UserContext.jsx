import React, { createContext, useContext, useState } from "react";

import { authDataContext } from "./AuthContext";
import axios from "axios";
import { useEffect } from "react";

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/current-user", {
        withCredentials: true,
      });
      console.log("get current user result", result);
      setUserData(result.data);
    } catch (err) {
      console.log("get current user error", err);
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
  };
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
