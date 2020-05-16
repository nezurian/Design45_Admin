import axios from "axios";

const createImg = async (image) => {
  if (image) {
    const formData = new FormData();
    formData.append("image", image);
    return axios
      .post("/api/contents/upload/images", formData)
      .then((response) => {
        return { URL: response.data.url, ID: response.data.fileId };
      })
      .catch((error) => {
        return { error: true, message: error };
      });
  }
  return [];
};

const createDoc = async (data, images) => {
  return axios
    .post("/api/contents/upload/data", {
      images: images,
      title: data.title,
      text: data.text,
      type: data.type,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error };
    });
};

const addPicMongo = (projectID, images) => {
  axios
    .put(`/api/contents/update/images/${projectID}`, {
      images: images,
    })
    .then((response) => {
      console.log(
        "Image Information Added to Mongo Successfully.",
        response.data
      );
    })
    .catch((error) => {
      console.log("Mongo Error: ", error);
    });
};

// Update Content on from MongoDB.
const updateDocMongo = (projectID, content) => {
  axios
    .put(`/api/contents/update/${projectID}`, content)
    .then((response) => {
      console.log("MongoDB document updated Successfully. ", response.data);
      
    })
    .catch((error) => {
      console.log("Mongo Error: ", error);
    });
};

const updateDoc = async (projectID, fields) => {
  return axios
    .put(`/api/contents/update/${projectID}`, fields)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: true, message: error };
    });
};

export { createDoc, createImg, addPicMongo, updateDoc, updateDocMongo };
