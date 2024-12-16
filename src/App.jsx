import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Films } from "./components/Pages/Films";
import { Film } from "./components/Pages/Film";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Films />} />
          <Route path="/film/:id" element={<Film />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
