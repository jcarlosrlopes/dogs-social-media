import React from "react";
import { PASSWORD_LOST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginPasswordLost = () => {
   const login = useForm();
   const { loading, error, data, request } = useFetch();

   const handleSubmit = async (event) => {
      event.preventDefault();

      if (login.validate()) {
         const location = window.location;
         const { url, options } = PASSWORD_LOST({
            login: login.value,
            url: location.href.replace("perdeu", "resetar"),
         });
         const { json } = await request(url, options);
         console.log(json);
      }
   };

   return (
      <section>
         <Head title="Perdeu a senha?" />
         <h1 className="title">Perdeu a senha?</h1>
         {data ? (
            <p style={{ color: "#4c1" }}>{data}</p>
         ) : (
            <form onSubmit={handleSubmit}>
               <Input
                  type="text"
                  label="Usuário / Email:"
                  name="login"
                  {...login}
               />

               {loading ? (
                  <Button disabled>Enviando...</Button>
               ) : (
                  <Button>Enviar e-mail</Button>
               )}
            </form>
         )}

         <Error error={error} />
      </section>
   );
};

export default LoginPasswordLost;
