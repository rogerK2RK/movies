import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Films } from "./components/Pages/Films";


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Films />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
