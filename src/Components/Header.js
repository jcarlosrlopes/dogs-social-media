import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../UserContext";

const Header = () => {
   const { loggedUser } = React.useContext(UserContext);

   return (
      <header className={styles.header}>
         <nav className={`${styles.nav} container`}>
            <Link className={styles.logo} to="/" aria-label="Dogs - Home">
               <Dogs />
            </Link>
            {loggedUser ? (
               <div>
                  <Link className={styles.login} to="/conta">
                     {loggedUser.nome}
                  </Link>
                  {/* <button onClick={userLogout}>Sair</button> */}
               </div>
            ) : (
               <Link className={styles.login} to="/login">
                  Login / Criar
               </Link>
            )}
         </nav>
      </header>
   );
};

export default Header;
