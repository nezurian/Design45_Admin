import React from "react";
import {
  Alert,
  FileInput,
  InputFields,
  inputValidation,
  BtnSendOK,
  BtnReset,
} from "./Util.components";

export default function Create(props) {
  return (
    <div className="antialiased mx-4 md:mx-10   ">
      {props.alert.alert ? (
        <Alert
          text1={props.alert.text1}
          text2={props.alert.text2}
          color={props.alert.color}
        />
      ) : null}

      <p className="text-4xl text-design45-darkgray border-b-2 border-design45-lightgray">
        İçerik Girişi
      </p>

      <InputFields
        fields={props.fields}
        setFields={props.setFields}
        error={props.error}
        setError={props.setError}
        typeMenu={props.typeMenu}
        handleInput={props.handleInput}
      />
      <FileInput setFile={props.setFile} />

      <div className="w-full">
        {!props.loading ? (
          <div className="w-full flex-row flex">
            <BtnSendOK
              sendTrigger={() =>
                inputValidation(
                  props.fields,
                  props.setError,
                  props.createTrigger
                )
              }
            />
            <BtnReset resetTrigger={props.reset} />
          </div>
        ) : (
          <div class="lds-dual-ring"></div>
        )}
      </div>
    </div>
  );
}
