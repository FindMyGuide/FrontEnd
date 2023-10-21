import { createContext, useEffect, useState } from 'react';
import { auth, db } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [alarm, setAlarm] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const alarm = () => {
      const alarm = onSnapshot(doc(db, 'users', currentUser?.uid), (doc) => {
        if (doc.data()) {
          setAlarm(doc.data().alarm);
        }
      });

      return () => {
        alarm();
      };
    };

    currentUser?.uid && alarm();
  }, [currentUser?.uid]);

  return <AuthContext.Provider value={{ currentUser, alarm }}>{children}</AuthContext.Provider>;
};
