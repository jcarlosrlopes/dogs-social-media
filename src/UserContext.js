import React from "react";
import { useNavigate } from "react-router-dom";
import { TOKEN_POST, USER_GET, VALIDATE_TOKEN_POST } from "./api";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
   const [loggedUser, setLoggedUser] = React.useState(null);
   const [isLogged, setIsLogged] = React.useState(false);
   const [loading, setLoading] = React.useState(false);
   const [error, setError] = React.useState(null);
   const navigate = useNavigate();

   async function getUser(token) {
      const { url, options } = USER_GET(token);

      const response = await fetch(url, options);
      const json = await response.json();
      setLoggedUser(json);
      setIsLogged(true);
   }

   async function userLogin(username, password) {
      try {
         setError(null);
         setLoading(true);

         const { url, options } = TOKEN_POST({ username, password });

         const response = await fetch(url, options);

         if (response.status !== 200) {
            const { message } = await response.json();
            throw new Error(`Error: ${message ?? response.statusText}`);
         } else {
            const { token } = await response.json();
            window.localStorage.setItem("token", token);
            await getUser(token);
            navigate("/conta");
         }
      } catch (err) {
         setError(err.message);
         setIsLogged(false);
      } finally {
         setLoading(false);
      }
   }

   const userLogout = React.useCallback(async () => {
      setLoggedUser(null);
      setIsLogged(false);
      setError(null);
      setLoading(false);
      window.localStorage.removeItem("token");
      navigate("/login");
   }, [navigate]);

   React.useEffect(() => {
      async function autologin() {
         setLoading(true);
         try {
            setError(null);
            setLoading(true);

            const token = window.localStorage.getItem("token");

            if (token) {
               const { url, options } = VALIDATE_TOKEN_POST(token);
               const response = await fetch(url, options);
               if (!response.ok) throw new Error("Token inválido");
               await getUser(token);
            }
         } catch (err) {
            userLogout();
         } finally {
            setLoading(false);
         }
      }

      autologin();
   }, [userLogout]);

   return (
      <UserContext.Provider
         value={{ userLogin, userLogout, loggedUser, isLogged, loading, error }}
      >
         {children}
      </UserContext.Provider>
   );
};
