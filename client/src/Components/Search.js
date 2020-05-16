import React from "react";
import EditPage from "./EditPage";
import { Titles, Types } from "./Menu";
import { Alert } from "./Util.components";

export default function Search(props) {
  return (
    <div className="px-4 md:px-10">
      {props.alert.alert ? (
        <Alert
          text1={props.alert.text1}
          text2={props.alert.text2}
          color={props.alert.color}
        />
      ) : null}
      <p className="text-4xl text-design45-darkgray border-b-2 border-design45-lightgray">
        İçerik Görüntüleme
      </p>

      <div className="flex flex-col space-x-6 xl:mt-8 mt-4 md:flex-row">
        <div className="flex flex-col relative md:flex-col">
          {!props.showProjects ? (
            <Types
              typeMenu={props.typeMenu}
              handleTypeSelect={props.handleTypeSelect}
            />
          ) : (
            <Titles
              titleMenu={props.titleMenu}
              handleProjectSelect={props.handleProjectSelect}
              back={props.back}
            />
          )}
        </div>

        <EditPage
          project={props.project}
          setProject={props.setProject}
          editMode={props.editMode}
          setEditMode={props.setEditMode}
          updateDB={props.updateDB}
          error={props.error}
          setError={props.setError}
          resetTrigger={props.reset}
          fields={props.fields}
          setFields={props.setFields}
          file={props.file}
          setFile={props.setFile}
          typeMenu={props.typeMenu}
          handleInput={props.handleInput}
          loading={props.loading}
          setLoading={props.setLoading}
          reset={props.reset}
          alert={props.alert}
          setAlert={props.setAlert}
        />
      </div>
    </div>
  );
}
