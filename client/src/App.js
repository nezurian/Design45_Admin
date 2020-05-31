import React from "react";
import Admin from "./Components/Admin";

function App() {
  return (
    <div className="md:mx-auto md:py-6 px-0 container">
      <div className="flex flex-col w-full shadow-xl sm:p-4 p-1 bg-white">
        <Admin />
      </div>
    </div>
  );
}

export default App;
