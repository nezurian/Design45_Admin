import React, { useState, useEffect } from "react";
import { createDoc, createImg } from "../Controllers/Upload";
import $ from "jquery";
import { getDB } from "../Controllers/getDB";
import Create from "./Create";
import Search from "./Search";
import { Settings } from "./Settings";
import { BTNMain } from "./Util.components";

export default function ControlPanel(props) {
  // Mode Selector Tool
  const [mode, setMode] = useState("settings");
  const modeSelector = (e) => {
    e.currentTarget.id === "logout"
      ? props.setAdmin({ adminMode: false, username: "", password: "" })
      : setMode(e.currentTarget.id);
  };
  // Editing On/Off
  const [editMode, setEditMode] = useState(false);

  // Gets Database from Server
  const [database, setDatabase] = useState([]);

  // Returns Unique Project Types to show on List
  const [typeMenu, setTypeMenu] = useState([]);
  const setTypes = (data) => {
    var types = [...new Set(data.map((project) => project.type))];
    setTypeMenu(types);
  };

  async function fetchData() {
    const data = await getDB();
    setDatabase(data);
    setTypes(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Prepares Title Menu:
  const [titleMenu, setTitleMenu] = useState([]);
  const handleTypeSelect = (e) => {
    const type = e.currentTarget.id;
    const projects = [database.filter((item) => item.type === type)];
    setTitleMenu(...projects);
    setShowProjects(true);
  };

  // Prepares Project View:
  const [project, setProject] = useState({
    _id: "",
    title: "",
    text: "",
    type: "",
    images: [],
  });
  const handleProjectSelect = (e) => {
    const projectID = e.currentTarget.id;
    const project = database.find((project) => project._id === projectID);
    setProject({
      _id: project._id,
      title: project.title,
      text: project.text,
      type: project.type,
      images: project.images,
    });
    setEditMode(false);
  };

  // Input Fields - Loaded with Project when editing
  const [fields, setFields] = useState({
    title: "",
    text: "",
    type: "",
  });
  const handleInput = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  const [file, setFile] = useState([]);
  const createTrigger = async () => {
    setLoading(true);
    var Arr = [];

    // IMGKit Upload
    for (let i = 0; i < file.length; i++) {
      const result = await createImg(file[i]);
      if (result.error === true) {
        setAlert({
          ...alert,
          alert: true,
          text1: "HATA! ",
          text2:
            "Fotoğraf yükleme işlemi sonuçlandırılamadı. Lütfen tekrar deneyin!",
          color: "red",
        });
        console.log("FOTO Girişi Başarısız: ", result.message);
      } else {
        console.log(`Foto loaded... ${i + 1}/${file.length}`, result);
        Arr.push(result);
      }
    }

    // Add to Mongo
    const result = await createDoc(fields, Arr);
    if (result.error === true) {
      setAlert({
        ...alert,
        alert: true,
        text1: "HATA! ",
        text2:
          "İçerik yükleme işlemi sonuçlandırılamadı. Lütfen tekrar deneyin!",
        color: "red",
      });
      console.log("İçerik Girişi Başarısız: ", result.message);
    } else {
      setAlert({
        ...alert,
        alert: true,
        text1: "TEBRİKLER! ",
        text2: "İçerik yükleme işleminiz başarı ile sonuçlandırıldı!",
        color: "green",
      });
      reset();
      console.log("İçerik Girişi Başarılı!: ", result);
      setDatabase([...database, result]);
      setTypes([...database, result]);
    }
    setLoading(false);
  };

  const [showProjects, setShowProjects] = useState(false);

  // Utilities
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    alert: false,
    text1: "",
    text2: "",
    color: "",
  });
  const [error, setError] = useState({
    error: true,
    type: "",
    message: "",
  });
  const back = () => {
    setShowProjects(false);
    setEditMode(false);
  };
  const reset = () => {
    setFields({
      type: "",
      title: "",
      text: "",
      images: [],
    });
    setFile([]);
    $('input[name="type"]').prop("checked", false);
    $("#fileInput").val(null);
  };

  // Updates the Database after change
  const updateDB = (DocID, newContent) => {
    var newDB = database;
    !newContent
      ? newDB.splice(newDB.indexOf(newDB.find((item) => item._id === DocID)), 1)
      : newDB.splice(
          newDB.indexOf(newDB.find((item) => item._id === DocID)),
          1,
          { ...newContent, _id: DocID }
        );
    setDatabase(newDB);
    setTypes(newDB);
  };

  const buttons = [
    {
      mode: mode,
      modeSelector: modeSelector,
      bgcolor: "bg-green-500",
      bordercolor: "border-green-600",
      textcolor: "text-green-700",
      hoverbgcolor: "hover:bg-green-500",
      hovertextcolor: "hover:text-green-800",
      hoverbordercolor: "hover:border-green-600",
      name: "create",
    },
    {
      mode: mode,
      modeSelector: modeSelector,
      bgcolor: "bg-teal-500",
      bordercolor: "border-teal-600",
      textcolor: "text-teal-700",
      hoverbgcolor: "hover:bg-teal-500",
      hovertextcolor: "hover:text-teal-800",
      hoverbordercolor: "hover:border-teal-600",
      name: "search",
    },
    {
      mode: mode,
      modeSelector: modeSelector,
      bgcolor: "bg-blue-500",
      bordercolor: "border-blue-600",
      textcolor: "text-blue-700",
      hoverbgcolor: "hover:bg-blue-500",
      hovertextcolor: "hover:text-blue-800",
      hoverbordercolor: "hover:border-blue-600",
      name: "settings",
    },
    {
      mode: mode,
      modeSelector: modeSelector,
      bgcolor: "bg-gray-500",
      bordercolor: "border-gray-600",
      textcolor: "text-gray-700",
      hoverbgcolor: "hover:bg-gray-500",
      hovertextcolor: "hover:text-gray-800",
      hoverbordercolor: "hover:border-gray-600",
      name: "logout",
    },
  ];

  return (
    // Main Container
    <div className="flex flex-col h-auto w-full md:flex-row md:w-full md:pr-10 md:pt-12 ">
      {/* TopBar - MD:SideBar   */}
      <div className="flex flex-row w-full justify-around md:w-16 md:flex-col md:items-center md:justify-start ">
        {buttons.map((button) => (
          <BTNMain
            key={button.name}
            mode={button.mode}
            modeSelector={button.modeSelector}
            bgcolor={button.bgcolor}
            bordercolor={button.bordercolor}
            textcolor={button.textcolor}
            hoverbordercolor={button.hoverbordercolor}
            hoverbgcolor={button.hoverbgcolor}
            hovertextcolor={button.hovertextcolor}
            name={button.name}
          />
        ))}
      </div>

      {/* Control Pad */}
      <div className="w-full">
        {mode === null ? null : mode === "create" ? (
          <Create
            database={database}
            setdatabase={setDatabase}
            typeMenu={typeMenu}
            setTypeMenu={setTypeMenu}
            fields={fields}
            setFields={setFields}
            handleInput={handleInput}
            file={file}
            setFile={setFile}
            createTrigger={createTrigger}
            reset={reset}
            error={error}
            setError={setError}
            alert={alert}
            setAlert={setAlert}
            loading={loading}
          />
        ) : mode === "search" ? (
          <Search
            showProjects={showProjects}
            setShowProjects={setShowProjects}
            typeMenu={typeMenu}
            setTypeMenu={setTypeMenu}
            database={database}
            setdatabase={setDatabase}
            editMode={editMode}
            setEditMode={setEditMode}
            updateDB={updateDB}
            handleTypeSelect={handleTypeSelect}
            titleMenu={titleMenu}
            handleProjectSelect={handleProjectSelect}
            project={project}
            setProject={setProject}
            fields={fields}
            setFields={setFields}
            file={file}
            setFile={setFile}
            handleInput={handleInput}
            error={error}
            setError={setError}
            reset={reset}
            loading={loading}
            setLoading={setLoading}
            alert={alert}
            setAlert={setAlert}
            back={back}
          />
        ) : mode === "settings" ? (
          <Settings />
        ) : null}
      </div>
    </div>
  );
}
