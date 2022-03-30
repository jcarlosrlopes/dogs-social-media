import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";

const Feed = ({ user }) => {
   const [modalPhoto, setModalPhoto] = React.useState(null);
   const [pages, setPages] = React.useState([1]);

   return (
      <div>
         {modalPhoto && (
            <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
         )}
         {pages.map((page) => (
            <FeedPhotos
               key={page}
               page={page}
               user={user}
               setModalPhoto={setModalPhoto}
            />
         ))}
      </div>
   );
};

export default Feed;
