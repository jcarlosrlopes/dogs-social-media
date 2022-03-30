import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ page, user, setModalPhoto }) => {
   const { data, loading, error, request } = useFetch();

   React.useEffect(() => {
      async function fetchPhotos() {
         const { url, options } = PHOTOS_GET({ page, total: 6, user });
         await request(url, options);
      }

      fetchPhotos();
   }, [request]);

   if (error) return <Error error={error} />;
   if (loading) return <Loading />;

   if (data)
      return (
         <ul className={`${styles.feed} animeLeft`}>
            {data.map((p) => (
               <FeedPhotosItem
                  key={p.id}
                  photo={p}
                  setModalPhoto={setModalPhoto}
               />
            ))}
         </ul>
      );
   else return null;
};

export default FeedPhotos;
