import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import SignupComprador from "./pages/account/signup/SignupComprador"
import Playground from "./pages/playground.jsx";

import TOS from "./pages/TOS.jsx";
import Privacy from "./pages/Privacy.jsx";
import SignupVendedor from "./pages/account/signup/SingupVendedor.jsx";
import Promo from "./pages/Promo.jsx";
import LoginComprador from "./pages/account/login/LoginComprador.jsx";
import LoginVendedor from "./pages/account/login/LoginVendedor.jsx";
import Productos from "./pages/productos/Productos.jsx";
import VerProducto from "./pages/productos/VerProducto.jsx";
import NotFound from "./pages/NotFound.jsx";
import BuscarProducto from "./pages/productos/BuscarProducto.jsx";
import Perfil from "./pages/ajustes/Perfil.jsx";
import Seguridad from "./pages/ajustes/Seguridad.jsx";
import MetodosPago from "./pages/ajustes/MetodosPago.jsx";

function App() {

    return (
        <>
          <Router>
            <Routes>
                <Route path={"*"} element={<NotFound/>}/>
                <Route path="/" element={<Promo/>}/>
                <Route path={"/play"} element={<Playground/>}/>
                <Route path={"/TOS"} element={<TOS/>}/>
                <Route path={"/Privacy"} element={<Privacy/>}/>
                <Route path={"/signup/comprador"} element={<SignupComprador/>}/>
                <Route path={"/signup/vendedor"} element={<SignupVendedor/>}/>
                <Route path={"/login/comprador"} element={<LoginComprador/>}/>
                <Route path={"/login/vendedor"} element={<LoginVendedor/>}/>
                <Route path={"/productos"} element={<Productos/>}/>
                <Route path={"/productos/:id"} element={<VerProducto/>}/>
                <Route path={"/buscar/producto/"} element={<BuscarProducto/>}/>
                <Route path={"/cuenta"} element={<Perfil/>}/>
            </Routes>
          </Router>
        </>

    )
}

export default App
