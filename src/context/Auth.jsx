import { useState , useEffect , useContext , createContext } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
      });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setAuth({ user: JSON.parse(storedUser) });
        }else{
            setAuth({ user: null });
        }
    },[]);

    useEffect(() => {
        if(auth.user){
            localStorage.setItem("user", JSON.stringify(auth.user));
        }else{
            localStorage.removeItem("user");
        }
    }, [auth])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);
export { AuthProvider , useAuth }


