import React, {useState} from "react";
import { delImgDB, delImgKit } from "../Controllers/Delete";

export default function Images(props) {
  const [selected, setSelected] = useState([])
  // var selectedIMGs = [];
  // const handleSelection = (e) => {
  //   const img = e.currentTarget.id;
  //   selectedIMGs.includes(img)
  //     ? (selectedIMGs = selectedIMGs.filter((item) => item !== img)) // Removes Item
  //     : selectedIMGs.push(img);
  // };

  const handleSelection = (e) => {
    const img = e.currentTarget.id;
    if (selected.includes(img)) {
      var newArr = selected.filter((item) => item !== img)
      setSelected(newArr); // Removes Item
    } else {
      setSelected([...selected, img])
    }
  };

  const delIMGTrigger = async () => {
    if (selected.length < 1) {
      console.log("No Images Selected");
    } else {
      // Preparation:
      var images = props.project.images;
      selected.map((item) => {
        const toMongo = images.filter((object) => object.ID !== item);
        images = toMongo;
        return images;
      });

      const result = await delImgKit(selected);
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
      setSelected([])
    }
  };

  if (!props.project.images) return null;

  return (
    <div
      className={`flex flex-row rounded flex-wrap my-4 text-gray-700`}
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
            className="border-2 border-design45-lightgray object-cover shadow-xl rounded hover:border-teal-700"
            src={image.URL}
            alt={image.URL}
          ></img>
        </div>
      ))}

      {selected.length === 0 ? (
        null
      ) : (
        <div className="flex items-center">
          <button
            className="m-2 flex border transform text-gray-900 transition duration-150 ease-in hover:scale-110 border-gray-600 rounded-full w-12 h-12 bg-gray-200 hover:border-red-600 hover:bg-red-500 hover:text-red-900 justify-center items-center"
            onClick={delIMGTrigger}
          >
            
            <div className="flex flex-row px-4 py-2 font-light text-sm">
              <i className="material-icons"> delete </i>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
