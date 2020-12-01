import React from "react";

function App() {
  const handleLogin = async () => {
    const headers = new Headers({ "Access-Control-Allow-Origin": "*" });
    const data = await fetch("/login");
    console.log(data);
    const result = await data.json();
    console.log(result);
  };
  return (
    <div>
      <h1>Final Project</h1>
      <button onClick={handleLogin}>log in</button>
    </div>
  );
}

export default App;
