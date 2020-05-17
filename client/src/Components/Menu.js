import React from "react";

function Types(props) {
  return (
    <>
      <h3 className=" text-xl mt-4 font-bold ml-4 antialiased uppercase text-teal-800">
        Kategoriler
      </h3>
      <div className="rounded flex border-l border-t border-teal-700 pl-4 flex-col">
        {!props.typeMenu
          ? null
          : props.typeMenu.map((type) => (
              <button
                key={type}
                id={type}
                onClick={props.handleTypeSelect}
                className="transition duration-150 border-b border-white ease-in md:text-lg w-full xl:text-xl antialiased pt-2 my-2 text-lg md:text-xl text-design45-darkgray lg:text-left hover:text-teal-700 hover:border-teal-600"
              >
                {type}
              </button>
            ))}
      </div>
    </>
  );
}

function Titles(props) {
  return (
    <div className="rounded-lg flex flex-col">
      <h3 className=" text-xl mt-4 font-bold ml-4 antialiased uppercase text-teal-800">
        Projeler
      </h3>
      <div className="rounded flex border-l border-t border-teal-700 pl-4 flex-col">
        <button
          onClick={props.back}
          className="flex justify-start hover:text-teal-700 rounded mt-3 text-gray-500 w-full px-2 py-1"
        >
          <i className="material-icons">arrow_back_ios</i>
          <p> Geri Dön</p>
        </button>

        {!props.titleMenu
          ? null
          : props.titleMenu.map((project) => (
              <button
                key={project._id}
                id={project._id}
                onClick={props.handleProjectSelect}
                className="transition duration-150 border-b border-white ease-in md:text-lg w-full xl:text-xl antialiased pt-2 my-2 text-lg md:text-xl text-design45-darkgray lg:text-left hover:text-teal-700 hover:border-teal-600"
                >
                {project.title}
              </button>
            ))}
      </div>
    </div>
  );
}

export { Types, Titles };
