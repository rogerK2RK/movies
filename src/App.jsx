import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieController } from "./components/context/movieContext"
import { Films } from "./components/Pages/Films";
import { Film } from "./components/Pages/Film";
import { Cars } from "./components/Pages/Cars";


function App() {
  return (
    <BrowserRouter>
      <MovieController>
        <Routes>
          <Route path="/" element={<Films />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="/cars" element={<Cars />} />
        </Routes>
      </MovieController>
    </BrowserRouter>
  )
}

export default App
