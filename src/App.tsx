import {Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/details:id" element={<Details></Details>}></Route>
      </Routes>
    </div>
  )
}

export default App