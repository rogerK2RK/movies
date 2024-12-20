import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieController } from "./context/movieContext"
import { Films } from "./Pages/Films";
import { Film } from "./Pages/Film";
import { Cars } from "./Pages/Cars";
import { Profile } from "./Pages/Profile.jsx";
import Register from './Pages/Register'
import Login from './Pages/Login'
import NavBar from './components/NavBar'
import { AuthController } from "./context/AuthContext";


function App() {
  return (
    <BrowserRouter>
      <MovieController>
        <AuthController>
          <NavBar />
          <Routes>
            <Route path="/movies" element={<Films />} />
            <Route path="/film/:id" element={<Film />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </AuthController>
      </MovieController>
    </BrowserRouter>
  )
}

export default App
