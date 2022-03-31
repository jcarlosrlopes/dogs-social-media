import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PASSWORD_RESET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";

const LoginPasswordReset = () => {
   const [key, setKey] = React.useState("");
   const [login, setLogin] = React.useState("");
   const { error, loading, request, data } = useFetch();
   const password = useForm();

   const navigate = useNavigate();

   React.useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const key = params.get("key");
      const login = params.get("login");

      if (key) setKey(key);
      if (login) setLogin(login);
   }, []);

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (password.validate()) {
         const { url, options } = PASSWORD_RESET({
            key,
            login,
            password: password.value,
         });

         const { response, json } = await request(url, options);
      }
   };

   if (data) {
      return (
         <div>
            <h3 style={{ color: "#4c1", marginBottom: "1rem" }}>
               Senha atualizada com sucesso!
            </h3>
            <Button onClick={() => navigate("/login")}>Página de Login</Button>
         </div>
      );
   } else {
      return (
         <div>
            <h1 className="title">Resete sua senha</h1>
            <form onSubmit={handleSubmit}>
               <Input
                  type="password"
                  name="password"
                  label="Nova Senha"
                  {...password}
               />
               {loading ? (
                  <Button disabled>Enviando...</Button>
               ) : (
                  <Button>Resetar</Button>
               )}
            </form>

            <Error error={error} />
         </div>
      );
   }
};

export default LoginPasswordReset;
