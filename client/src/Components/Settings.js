import React, { useState, useEffect } from "react";
import axios from "axios";
import { BtnSendOK } from "./Util.components";

function Settings() {
  const defVar = {
    username: "",
    email: "",
    userID: "",
    password: "",
  };
  const [mode, setMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "",
    email: "",
    userID: "",
  });
  const [pwd, setPwd] = useState({
    password: "",
    newPassword: "",
    newPassword2: "",
  });

  const getUsers = () => {
    return axios
      .get("/api/users/")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleMode = (e) => {
    if (e.currentTarget.name === "edit") {
      const user = users.find((user) => user._id === e.currentTarget.id);
      setUser({
        username: user.username,
        email: user.email,
        userID: user._id,
      });
      setMode("edit");
    } else if (e.currentTarget.name === "create") {
      setMode("create");
      setUser(defVar);
    } else if (e.currentTarget.name === "pwd") {
      console.log("pwd");
      setMode("pwd");

      //   setUser({ userID: user._id });
    }
  };

  const createUser = () => {
    console.log("click");
    axios
      .post("/api/users/register", {
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        setUsers([...users, response.data]);
        setUser(defVar);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const updateUser = (e) => {
    console.log(user.userID);
    axios
      .put(`/api/users/edit/${user.userID}`, {
        username: user.username,
        email: user.email,
      })
      .then((response) => {
        setUser(defVar);
        setMode(false);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const changePassword = (e) => {
    if (pwd.newPassword === pwd.newPassword2) {
      axios
        .put(`/api/users/editPassword/${user.userID}`, {
          oldPassword: pwd.password,
          newPassword: pwd.newPassword,
        })
        .then((response) => {
          console.log(response);
          setUser(defVar);
          setMode(false);
        })
        .catch((error) => {
          console.log(error);
        });
    } else console.log("Check your new Password");
  };

  const deleteUser = (e) => {
    const targetID = e.currentTarget.id;
    axios
      .get(`/api/users/delete/${e.currentTarget.id}`)
      .then((response) => {
        console.log(response);
        const deleted = users.find((user) => user._id === targetID);
        const newArray = users.filter((user) => user !== deleted);
        setUsers(newArray);
        setUser(defVar);
        setMode(false);
      })
      .catch((error) => console.log(error));
  };

  const handleInput = (e) => {
    mode === "pwd"
      ? setPwd({ ...pwd, [e.target.name]: e.target.value })
      : setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col antialiased px-4 md:px-10 ">
      <p className="text-4xl text-design45-darkgray border-b-2 border-design45-lightgray">
        Ayarlar
      </p>

      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className=" w-full md:w-1/4 flex flex-col relative md:flex-col md:mt-8">

          <div className="flex border-b border-blue-700 md:border-none mt-4 md:mt-0 text-blue-800 md:mb-2 md:ml-2 justify-between items-center">
            <h3 className="text-xl font-bold  md:text-base lg:text-xl text-center md:text-left antialiased uppercase ">
              Kullanıcılar
            </h3>
            <button
              className="transition transform hover:scale-110 hover:text-blue-600 ease-in duration-100"
              name="create"
              id="BTNnewUser"
              onClick={handleMode}
            >
              <i className="material-icons">person_add</i>
            </button>
          </div>
          <div className="rounded flex md:border-l md:border-t border-blue-700 px-4 md:pl-4 flex-col">
            {users.map((user) => (
              <button
                id={user._id}
                name="edit"
                onClick={handleMode}
                key={user._id}
                className="transition flex justify-between duration-100 border-b border-white transform ease-in md:text-lg w-full xl:text-xl antialiased pt-2 my-2 text-lg md:text-xl text-design45-darkgray lg:text-left hover:text-blue-600 hover:border-blue-600"
              >
                {user.username}

                <i className="material-icons">create</i>
              </button>
            ))}
          </div>
        </div>

        <div className="w-full md:w-3/4 md:mt-8 mt-10">
          {!mode ? null : (
            <UserInput
              mode={mode}
              user={user}
              pwd={pwd}
              deleteUser={deleteUser}
              handleInput={handleInput}
              createUser={createUser}
              updateUser={updateUser}
              changePassword={changePassword}
              handleMode={handleMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const UserInput = (props) => {
  return (
    <div className="flex flex-col relative md:flex-col">
      <div className="flex flex-row justify-between">
        <h3 className="text-design45-darkgray text-2xl">
          {props.mode === "create"
            ? "Yeni Kullanıcı Oluştur"
            : props.mode === "edit"
            ? "Bilgi Güncelleme"
            : "Şifre Güncelleme"}
        </h3>
        {props.mode === "edit" ? (
          <div className="p-2 space-y-2">
            <BTN
              name="pwd"
              id={props.user.userID}
              onClick={props.handleMode}
              text="ŞİFRE DEĞİŞTİR"
              icon="security"
              hovertext="hover:text-green-800"
              hoverbg="hover:bg-green-500"
            />
            <BTN
              name="deleteUser"
              id={props.user.userID}
              onClick={props.deleteUser}
              text="Kullanıcıyı SİL"
              icon="delete"
              hovertext="hover:text-red-800"
              hoverbg="hover:bg-red-500"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {props.mode === "create" || props.mode === "edit" ? (
        <>
          <Input
            title="Kullanıcı Adı"
            type="text"
            name="username"
            value={props.user.username}
            onChange={props.handleInput}
          />
          <Input
            title="E-Mail"
            type="email"
            name="email"
            value={props.user.email}
            onChange={props.handleInput}
          />
          {props.mode === "create" ? (
            <Input
              title="Şifre"
              type="password"
              name="password"
              value={props.user.password}
              onChange={props.handleInput}
            />
          ) : null}
        </>
      ) : props.mode === "pwd" ? (
        <>
          <Input
            title="Eski Şifre"
            type="password"
            name="password"
            value={props.pwd.password}
            onChange={props.handleInput}
          />
          <Input
            title="Yeni Şifre"
            type="password"
            name="newPassword"
            value={props.pwd.newPassword}
            onChange={props.handleInput}
          />
          <Input
            title="Yeni Şifre (Tekrar)"
            type="password"
            name="newPassword2"
            value={props.pwd.newPassword2}
            onChange={props.handleInput}
          />
        </>
      ) : null}
      <div className="my-2">
        <BtnSendOK
          sendTrigger={
            props.mode === "create"
              ? props.createUser
              : props.mode === "edit"
              ? props.updateUser
              : props.changePassword
          }
        />
      </div>
    </div>
  );
};

const BTN = (props) => {
  return (
    <button
      className={`flex transition items-center justify-center duration-150 delay-75 transform hover:scale-110 ease-in flex-row rounded-lg text-gray-800 ${props.hovertext}`}
      id={props.id}
      name={props.name}
      onClick={props.onClick}
    >
      <i className="material-icons ">{props.icon}</i>
      <p className="antialiased pl-2 uppercase">{props.text}</p>
    </button>
  );
};

const Input = (props) => {
  return (
    <>
      <p className="text-sm xl:mt-8 mt-4 text-gray-600">{props.title}</p>
      <input
        className="bg-white text-blue-900 focus:outline-none p-2 h-12 font-bold focus:border-blue-500 border border-gray-300 rounded-lg block w-full appearance-none leading-normal"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      ></input>
    </>
  );
};

export { Settings };
