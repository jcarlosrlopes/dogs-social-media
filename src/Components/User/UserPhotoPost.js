import React from "react";
import styles from "./UserPhotoPost.module.css";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
   const nome = useForm();
   const peso = useForm("number");
   const idade = useForm("number");
   const [img, setImg] = React.useState({});

   const { data, error, loading, request } = useFetch();

   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append("img", img.raw);
      formData.append("nome", nome.value);
      formData.append("peso", peso.value);
      formData.append("idade", idade.value);

      const token = window.localStorage.getItem("token");
      const { url, options } = PHOTO_POST(formData, token);
      request(url, options);
   };

   const handleImgChange = ({ target }) => {
      setImg({
         preview: URL.createObjectURL(target.files[0]),
         raw: target.files[0],
      });
   };

   React.useEffect(() => {
      if (data) navigate("/conta");
   }, [data, navigate]);

   return (
      <section className={`${styles.photoPost} animeLeft`}>
         <Head
            title="Poste sua foto"
            description="Página de postagem do site Dogs"
         />
         <form onSubmit={handleSubmit}>
            <Input type="text" name="nome" label="Nome" {...nome} />
            <Input type="number" name="peso" label="Peso" {...peso} />
            <Input type="number" name="idade" label="Idade" {...idade} />
            <input
               className={styles.file}
               type="file"
               name="img"
               id="img"
               onChange={handleImgChange}
            />

            {loading ? (
               <Button disabled>Enviando...</Button>
            ) : (
               <Button>Enviar</Button>
            )}

            <Error error={error} />
         </form>

         <div>
            {img.preview && (
               <div
                  className={styles.preview}
                  style={{ backgroundImage: `url('${img.preview}')` }}
               ></div>
            )}
         </div>
      </section>
   );
};

export default UserPhotoPost;
