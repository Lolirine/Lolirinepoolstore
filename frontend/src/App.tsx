import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
  fetch("/api/hello")
    .then(r => r.json())
    .then(d => console.log("Message from backend:", d.message))
    .catch(console.error);
}, []);

  return (
    <div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>LolirinePoolStore</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <p>Ouvrez la console du navigateur pour voir le message backend.</p>
      </div>
    </div>
  );
}

