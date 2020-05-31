import React, { useState } from "react";
import Login from "./Login";
import ControlPanel from "./ControlPanel";

export default function Admin() {
  const [admin, setAdmin] = useState({
    adminMode: false,
    username: "",
    password: "",
  });

  return (
    <>
      {admin.adminMode ? (
        <ControlPanel setAdmin={setAdmin} />
      ) : (
        <Login admin={admin} setAdmin={setAdmin} />
      )}
    </>
  );
}
