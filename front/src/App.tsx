import { useState } from "react";
import { hello } from "common";

function App() {
  const [name, setName] = useState("John");

  return (
    <>
      <h1>{hello(name)}</h1>
      <input
        type="text"
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
      />
    </>
  );
}

export default App;
