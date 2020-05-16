import axios from "axios"

  const getDB = async () => {
    return axios
      .get("/api/contents")
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return {error: true, message: error}
      });
  };

  export {getDB}