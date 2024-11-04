import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import SignupComprador from "./pages/account/signup/SignupComprador"
import Playground from "./pages/playground.jsx";
import Producto from "./components/Producto/Producto.jsx";
import Productos from "./pages/productos/Productos.jsx";
import Perfil from "./pages/ajustes/Perfil.jsx";
import Seguridad from "./pages/ajustes/Seguridad.jsx";
import MetodosPago from "./pages/ajustes/MetodosPago.jsx";

function App() {

    return (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<MetodosPago/>}/>
                <Route path={"/play"} element={<Playground/>}/>
            </Routes>
          </Router>
        </>

    )
}

export default App
