import { AppWrite } from '@/lib/appwrite';
import { UserDbType } from '@/lib/type';
import { createContext, useContext, useEffect, useState } from 'react';
import { Models } from 'react-native-appwrite';

type GlobalContextType = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: Models.Document & UserDbType;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const GlobalContext = createContext<GlobalContextType>();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState<Models.Document & UserDbType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AppWrite.getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoading, isLoggedIn, user, setUser, setIsLoggedIn }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
