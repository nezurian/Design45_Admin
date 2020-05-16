import React from "react";
import Images from "./Images";
import { updateDoc, createImg } from "../Controllers/Upload";
import { deleteDoc } from "../Controllers/Delete";
import {
  inputValidation,
  BtnSendOK,
  BtnReset,
  FileInput,
  InputFields,
} from "./Util.components";

// LVL 2
export default function EditPage(props) {
  const handleEditMode = () => {
    if (!props.editMode) {
      props.setEditMode(true);
      props.setFields({
        title: props.project.title,
        text: props.project.text,
        type: props.project.type,
        images: props.project.images,
      });
    } else {
      props.setEditMode(false);
    }
  };

  // Kills Entire DOCUMENT
  const deleteDocTrigger = () => {
    deleteDoc(props.project);
    handleEditMode();
    props.setProject(null);
    props.updateDB(props.project._id);
  };

  const updateTrigger = async () => {
    props.setLoading(true);
    var Arr = [...props.project.images];

    // IMGKit Upload
    if (props.file.length >= 1) {
      for (let i = 0; i < props.file.length; i++) {
        const result = await createImg(props.file[i]);
        if (result.error === true) {
          props.setAlert({
            ...alert,
            alert: true,
            text1: "HATA! ",
            text2:
              "Fotoğraf yükleme işlemi sonuçlandırılamadı. Lütfen tekrar deneyin!",
            color: "red",
          });
          console.log("FOTO Girişi Başarısız: ", result.message);
        } else {
          console.log(`Foto loaded... ${i + 1}/${props.file.length}`, result);
          Arr.push(result);
        }
      }
    }

    var content = {
      title: props.fields.title,
      text: props.fields.text,
      type: props.fields.type,
      images: Arr,
    };

    // Update Doc on Mongo
    const result = await updateDoc(props.project._id, content);
    if (result.error === true) {
      console.log("İçerik Girişi Başarısız: ", result.message);
      props.setAlert({
        ...alert,
        alert: true,
        text1: "HATA! ",
        text2:
          "İçerik yükleme işlemi sonuçlandırılamadı. Lütfen tekrar deneyin!",
        color: "red",
      });
    } else {
      console.log("İçerik Girişi Başarılı!: ", result);
      props.setAlert({
        ...alert,
        alert: true,
        text1: "TEBRİKLER! ",
        text2: "İçerik yükleme işlemi başarı ile sonuçlandırıldı!",
        color: "green",
      });
      props.setProject(result);
      props.updateDB(props.project._id, result);
    }
    props.setLoading(false);
    props.setEditMode(false);
  };

  if (props.project === null || props.project.title === "") {
    return null;
  }
  return (
      <div
        className={` md:w-4/5 ${
          props.editMode ? "border border-design45-darkgray rounded-lg" : null
        }`}
      >
        <div className="flex flex-col">
          {!props.editMode ? (
            <div>
              <div className="flex flex-row">
                <h3 className="mb-4 uppercase flex w-5/6 text-2xl md:text-3xl border-gray-200 text-design45-darkgray">
                  {props.project.title}
                </h3>

                <div className="flex w-1/6 justify-end">
                  <button
                    className="material-icons pr-2 hover:text-design45-darkgray"
                    onClick={handleEditMode}
                  >
                    edit
                  </button>
                </div>
              </div>

              <div className="w-full flex">
                <p className="text-design45-darkgray antialiased font-light leading-relaxed text-justify">
                  {props.project.text}
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-row justify-end">
                <button
                  className="material-icons hover:text-red-700 pr-2"
                  onClick={deleteDocTrigger}
                >
                  delete
                </button>
                <button
                  className="material-icons text-design45-darkgray pr-2"
                  onClick={handleEditMode}
                >
                  edit
                </button>
              </div>

              <InputFields
                fields={props.fields}
                setFields={props.setFields}
                error={props.error}
                setError={props.setError}
                typeMenu={props.typeMenu}
                handleInput={props.handleInput}
              />

              <div className="w-full">
                <div className="w-full flex-row flex md:mt-8">
                  {/* Edit'te başka şekilde çalışacak. */}
                  <BtnSendOK
                    sendTrigger={() =>
                      inputValidation(
                        props.fields,
                        props.setError,
                        updateTrigger
                      )
                    }
                  />
                  <BtnReset resetTrigger={props.reset} />
                </div>
              </div>
              {!props.loading ? (
                <div className="flex flex-row items-center ">
                  <FileInput setFile={props.setFile} />
                  {props.file.length < 1 ? (
                    <></>
                  ) : (
                    <></> // <BtnAddImg trigger={addImgTrigger} />
                  )}
                </div>
              ) : (
                <div class="lds-dual-ring"></div>
              )}
            </div>
          )}
        </div>
        <Images
          project={props.project}
          setProject={props.setProject}
          editMode={props.editMode}
        />
      </div>
    
  );
}
