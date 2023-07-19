import { createContext, ReactNode, useEffect, useMemo, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { useAuth } from "src/hooks/useAuth";
import { auth } from "src/Firebase";
import { useRouter } from "next/router";
import { boolean } from "yup";
interface authContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<authContextState>({
  user: null,
  error: "",
  isLoading: false,
  
  signIn: async () => {},
  signUp: async () => {},
  logOut: async () => {},
});
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [intial, setIntial] = useState<boolean>(true);
  const {
    error,
    isLoading,
    logOut,
    signIn,
    signUp,
    user,
    setUser,
 
  } = useAuth();
  const router = useRouter();
  const value = useMemo(
    () => ({
      user,
      isLoading,
      logOut,
      signIn,
      signUp,
      error,
    
    }),

    // eslint-disable-next-line
    [user, isLoading, error]
  );
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //ruyhatdan utgan
        
          setUser(user);
        } else {
          //ruyhatdan utmagan
          setUser(null);
          router.push('/auth');
        }
        setIntial(false);
    
      }),
    [
      //eslint-disable-next-line
    ]
  );
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
