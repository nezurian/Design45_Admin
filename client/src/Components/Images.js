import React from "react";
import { delImgDB, delImgKit } from "../Controllers/Delete";

export default function Images(props) {
  var selectedIMGs = [];
  const handleSelection = (e) => {
    const img = e.currentTarget.id;
    selectedIMGs.includes(img)
      ? (selectedIMGs = selectedIMGs.filter((item) => item !== img)) // Removes Item
      : selectedIMGs.push(img);
  };

  const delIMGTrigger = async () => {
    if (selectedIMGs.length < 1) {
      console.log("No Images Selected");
    } else {
      // Preparation:
      var images = props.project.images;
      selectedIMGs.map((item) => {
        const toMongo = images.filter((object) => object.ID !== item);
        images = toMongo;
        return images;
      });

      const result = await delImgKit(selectedIMGs);
      if (result.error === true) {
        console.log("Could not delete from ImageKit: ", result.message);
      } else {
        console.log("Successfully deleted from ImageKit: ", result);
      }

      const MongoDB = await delImgDB(props.project._id, images);
      if (MongoDB.error === true) {
        console.log("Cannot remove images from Mongo DB : ", MongoDB.message);
      } else {
        console.log("Successfully deleted from MongoDB: ", MongoDB);
      }

      props.setProject({ ...props.project, images: images });
      selectedIMGs = [];
    }
  };

  if (!props.project.images) return null;

  return (
    <div
      className={`flex flex-row ${
        props.editMode ? "shadow-xl" : null
      } rounded flex-wrap my-4 bg-gray-100 text-gray-700`}
    >
      {props.project.images.map((image) => (
        <div key={image.ID} className="flex md:w-1/6 w-1/3 h-24 object-cover p-2">
          {props.editMode ? (
            <input
              className="absolute m-1"
              id={image.ID}
              type="checkbox"
              onChange={handleSelection}
            ></input>
          ) : (
            null
          )}
          <img
            className="border-2 border-design45-lightgray object-cover shadow-xl rounded hover:border-design45-darkgray"
            src={image.URL}
            alt={image.URL}
          ></img>
        </div>
      ))}

      {!props.editMode ? (
        null
      ) : (
        <div className="flex items-center">
          <button
            className="m-2 flex border border-red-600 rounded-full w-12 h-12 bg-red-500 justify-center items-center"
            onClick={delIMGTrigger}
          >
            <div className="flex flex-row px-4 py-2 font-light text-sm text-red-900">
              <i className="material-icons"> delete </i>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
