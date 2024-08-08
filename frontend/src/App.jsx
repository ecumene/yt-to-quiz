import { useEffect } from "react";

const api = import.meta.env.VITE_APP_API_HOST;
fetch(api).then((response) => console.log(response));

function App() {
  useEffect(() => {}, []);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export default App;
