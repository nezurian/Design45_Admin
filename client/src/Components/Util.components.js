import React, { useState } from "react";

const Alert = (props) => {
  return (
    <div
      className={`bg-${props.color}-100 border border-${props.color}-400 text-${props.color}-700 px-4 py-3 rounded relative`}
    >
      <strong className="font-bold">{props.text1}</strong>
      <span className="block sm:inline">{props.text2}</span>
    </div>
  );
};

const BTNMain = (props) => {
  var css; 
  const fixed =
    "flex m-2 items-center justify-center rounded-full outline-none md:h-12 md:w-12 ";
  const a = `${props.bordercolor} ${props.bgcolor} ${props.textcolor} shadow-xl cursor-not-allowed border-2 `;

  const b = `${props.hoverbgcolor}  ${props.hovertextcolor} transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-110 cursor-pointer hover:text-gray-800 border text-gray-600 border-gray-200 `;

  if (props.mode === props.name) {
    css = fixed + a;
  } else if (props.mode !== props.name) {
    css = fixed + b;
  }

  return (
    <button className={css} id={props.name} onClick={props.modeSelector}>
      <i className="material-icons text-4xl">{props.name}</i>
    </button>
  );
};

const BtnSendOK = (props) => {
  return (
    <div className="py-2 shadow-lg justify-center flex bg-green-300 hover:bg-green-400 w-32 border border-green-300 rounded">
      <button onClick={props.sendTrigger}>
        <div className="flex flex-row items-center justify-center">
          <p className="antialiased mx-2 font-medium text-green-900 ">Gönder</p>
          <i className="material-icons text-green-900  mx-2">send</i>
        </div>
      </button>
    </div>
  );
};

const BtnReset = (props) => {
  return (
    <div className="pl-4">
      <button
        className="bg-gray-300 hover:bg-gray-400 w-12 text-black font-bold py-2 rounded-full shadow-lg"
        onClick={props.resetTrigger}
      >
        <div className="flex flex-row items-center justify-center">
          <i className="material-icons mx-2">settings_backup_restore</i>
        </div>
      </button>
    </div>
  );
};

function FileInput(props) {
  const handleFiles = (e) => {
    const selectedFiles = e.target.files;
    props.setFile(selectedFiles);
  };

  return (
    <div className="my-4 md:my-8">
      <p className="font-sans text-sm text-gray-600">Fotoğraf Ekle: </p>
      <form method="POST" action="/submit-form" encType="multipart/form-data">
        <input
          accept="image/*"
          className="w-64 bg-gray-100 border rounded"
          onChange={handleFiles}
          type="file"
          id="fileInput"
          name="image"
          multiple
        />
      </form>
    </div>
  );
}

const inputValidation = (doc, setError, trigger) => {
  if (doc.title.length < 10) {
    setError({
      error: true,
      type: "title",
      message: "Başlık en az 10 karakter içermelidir.",
    });
  } else if (doc.text.length < 30) {
    setError({
      error: true,
      type: "text",
      message: "Açıklama bölümü en az 30 karakterden oluşmalıdır.",
    });
  } else if (doc.type.length < 4) {
    setError({
      error: true,
      type: "type",
      message: "Kategori en az 4 karakterden oluşmalıdır.",
    });
  } else {
    setError({ error: false, type: null, message: null });
    trigger();
  }
};

function InputFields(props) {
  const error = props.error;
  const typeMenu = props.typeMenu;

  // Triggers New Type Box
  const [newType, setNewType] = useState(false);
  const handleType = (e) => {
    const type = e.currentTarget.value;
    if (type === "yeni") {
      setNewType(true);
    } else {
      setNewType(false);
      props.setFields({ ...props.fields, type: type });
    }
  };
  return (
    <div>
      {/* Title Bar */}
      {error && error.type === "title" ? (
        <p className="text-red-500 mt-4 text-sm">{error.message}</p>
      ) : (
        <p className="font-sans text-sm xl:mt-8 mt-4 text-gray-600">Başlık</p>
      )}

      <input
        className="bg-white focus:outline-none p-2 h-12 font-bold focus:border-green-500 border border-gray-300 rounded-lg block w-full appearance-none leading-normal"
        type="text"
        name="title"
        value={props.fields.title}
        onChange={props.handleInput}
      ></input>

      {/* Text Bar */}
      {error && error.type === "text" ? (
        <p className="text-red-500 mt-4 text-sm">{error.message}</p>
      ) : (
        <p className="font-sans text-sm xl:mt-8 mt-4 text-gray-600">
          Açıklamalar
        </p>
      )}
      <textarea
        className="bg-white h-32 focus:outline-none p-2 focus:border-green-500 border border-gray-300 rounded-lg  block w-full appearance-none leading-normal"
        type="textarea"
        name="text"
        value={props.fields.text}
        onChange={props.handleInput}
      ></textarea>

      {/* Type Section */}
      {error && error.type === "type" ? (
        <p className="text-red-500 mt-4 text-sm">{error.message}</p>
      ) : (
        <p className="font-sans text-sm xl:mt-8 mt-4 text-gray-600">Kategori</p>
      )}
      <div className="flex flex-row flex-wrap">
        <div className="w-1/2 md:w-1/4 mt-1">
          <input
            id="radio"
            type="radio"
            name="type"
            className="radio-light"
            onChange={handleType}
            value="yeni"
          ></input>
          <span className="ml-2 font-sans text-sm text-gray-600">
            Yeni Kategori
          </span>
        </div>

        {typeMenu.map((type) => (
          <div key={type} className="w-1/2 md:w-1/4 mt-1">
            <input
              id="radio"
              type="radio"
              name="type"
              className="radio-light"
              onChange={handleType}
              value={type}
            ></input>
            <span className="ml-2 font-sans text-sm text-gray-600">{type}</span>
          </div>
        ))}
      </div>
      {/* New Type Input Box */}
      {newType ? (
        <input
          className="bg-white focus:outline-none p-2 h-12 font-bold focus:border-green-500 border border-gray-300 rounded-lg block w-full appearance-none leading-normal"
          type="text"
          name="type"
          value={props.fields.type}
          onChange={props.handleInput}
        ></input>
      ) : null}
    </div>
  );
}

export {
  BTNMain,
  BtnSendOK,
  BtnReset,
  inputValidation,
  InputFields,
  FileInput,
  Alert,
};
