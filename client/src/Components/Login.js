import React from "react";
import axios from "axios";

export default function Login(props) {
  const login = () => {
    axios
      .post("/api/users/login", {
        username: props.admin.username,
        password: props.admin.password,
      })
      .then((response) => {
        console.log("Login Successful");
        props.setAdmin({
          adminMode: true,
          userID: response.data._id,
          username: response.data.username,
        });
      })
      .catch((error) => {
        console.log(`${error}`);
      });
  };

  const handleChange = (e) => {
    props.setAdmin({ ...props.admin, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-row items-center justify-center h-screen w-full">
      <div className="w-2/5">
        <p className="text-4xl 4 text-center border-b-4 p-4 border-gray-400 mb-10">
          Yönetim Paneli Giriş
        </p>
        <p className="font-sans text-sm mb-2 text-gray-600"> Kullanıcı Adı </p>
        <input
          className="bg-white focus:outline-none focus:border-blue-500 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          name="username"
          value={props.admin.username}
          onChange={handleChange}
          autoComplete="username"
        ></input>
        <p className="font-sans text-sm mt-6 mb-2 text-gray-600"> Şifre </p>
        <input
          className="bg-white focus:outline-none focus:border-blue-500 border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="password"
          name="password"
          value={props.admin.password}
          onChange={handleChange}
          autoComplete="current-password"
        ></input>

        <button
          className="flex w-full items-center justify-center flex-row bg-green-400 mt-10 hover:bg-green-500 text-green-800 font-bold py-2 px-4 rounded-full"
          type="submit"
          onClick={login}
        >
          <i className="material-icons text-3xl">power_settings_new</i>
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
