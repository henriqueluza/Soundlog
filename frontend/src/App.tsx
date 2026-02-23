import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/" element={<Landing/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
