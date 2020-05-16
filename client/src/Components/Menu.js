import React from "react";

function Types(props) {
  return (
    <>
      <h3 className=" text-xl mt-4 font-bold uppercase text-gray-800">
        Kategoriler
      </h3>
      <div className="divide-y divide-design45-lightgray rounded-lg flex flex-col">
        {!props.typeMenu
          ? null
          : props.typeMenu.map((type) => (
              <button
                key={type}
                id={type}
                onClick={props.handleTypeSelect}
                className="transition duration-150 ease-in md:text-lg w-full xl:text-2xl antialiased text-lg md:text-xl text-design45-darkgray lg:text-left hover:text-black uppercase"
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
    <div className="divide-y divide-design45-lightgray rounded-lg flex flex-col">
      <h3 className=" text-xl mt-4 font-bold uppercase text-gray-800">
        Projeler
      </h3>
      <button
        onClick={props.back}
        className="flex justify-center hover:text-red-500 rounded my-1 text-gray-500 hover:bg-red-200 w-full"
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
              className="transition duration-150 ease-in md:text-lg w-full xl:text-xl antialiased py-2 text-lg md:text-xl text-design45-darkgray lg:text-left hover:text-black uppercase"
            >
              {project.title}
            </button>
          ))}
    </div>
  );
}

export { Types, Titles };
