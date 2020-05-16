import axios from "axios";

const delImgDB = async (projectID, images) => {
  return axios
    .put(`/api/contents/update/images/${projectID}`, {
      images: images,
    })
    .then((response) => {
      console.log(response)

      return response.data;
    })
    .catch((error) => {
      console.log(error)

      return { error: true, message: error };
    });
};

// Delete Pictures from ImageKit
const delImgKit = async (pictures) => {
  return axios
    .post("/api/contents/delete/images", pictures)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return { error: true, message: error.data };
    });
};

// Mongo Doc Deletion
const deleteDB = (docID) => {
  axios
    .get(`/api/contents/delete/${docID}`)
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
};

// Removes Document from MongoDB
const deleteDoc = (doc) => {
  const pictures = [];
  pictures.push(doc.images.map((item) => item.ID));

  axios.all([deleteDB(doc._id), delImgKit(...pictures)]).then(
    axios.spread((DB, IMGKit) => {
      console.log("Database: ", DB, '\n', "ImageKit: ", IMGKit)
    })
  );
};


export { delImgDB, delImgKit, deleteDoc, deleteDB };
