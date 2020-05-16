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

      <div className="flex flex-col md:flex-row space-x-6">
        <div className="flex flex-col relative md:flex-col md:mt-8">
          <BTN
            name="create"
            id="BTNnewUser"
            onClick={handleMode}
            text="Yeni Kullanıcı"
            icon="person_add"
            color1="gray"
            color2="gray"
          />

          <h3 className=" text-xl mt-4 font-bold uppercase text-gray-900">
            Kullanıcılar
          </h3>
          {users.map((user) => (
            <div
              key={user._id}
              className="flex flex-row justify-between mt-2 uppercase text-gray-700 text-xl"
            >
              <p className="mr-2">{user.username}</p>

              <button name="edit" id={user._id} onClick={handleMode}>
                <i className="material-icons mr-2 text-gray-500 hover:text-teal-400">
                  create
                </i>
              </button>
            </div>
          ))}
        </div>

        <div className="w-full md:mt-8">
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
              color1="gray"
              color2="green"
            />
            <BTN
              name="deleteUser"
              id={props.user.userID}
              onClick={props.deleteUser}
              text="Kullanıcıyı SİL"
              icon="delete"
              color1="gray"
              color2="red"
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
      className={`flex transition items-center justify-center w-48 duration-150 delay-75 transform hover:scale-110 ease-in px-2 py-1 flex-row rounded-lg bg-${props.color1}-400 text-${props.color1}-800 hover:text-${props.color2}-800 hover:bg-${props.color2}-500`}
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
      <p className="text-sm xl:mt-8 mt-4 text-gray-600">
        {props.title}
      </p>
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
