import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import SignupComprador from "./pages/account/signup/SignupComprador"
import Playground from "./pages/playground.jsx";

import TOS from "./pages/TOS.jsx";
import Privacy from "./pages/Privacy.jsx";
import SignupVendedor from "./pages/account/signup/SignupVendedor.jsx";
import Promo from "./pages/Promo.jsx";
import LoginComprador from "./pages/account/login/LoginComprador.jsx";
import LoginVendedor from "./pages/account/login/LoginVendedor.jsx";
import Productos from "./pages/productos/Productos.jsx";
import VerProducto from "./pages/productos/VerProducto.jsx";
import NotFound from "./pages/NotFound.jsx";
import BuscarProducto from "./pages/productos/BuscarProducto.jsx";
import Perfil from "./pages/ajustes/Perfil.jsx";
import ProtectedRouteComprador from "./components/Routes/ProtectedRouteComprador.jsx";
import {createContext} from "react";
import GestionarProducto from "./pages/productos/GestionarProducto.jsx";
import PublicarProducto from "./pages/productos/PublicarProducto.jsx";
import Carrito from "./pages/productos/Carrito.jsx";
import ProtectedRouteVendedor from "./components/Routes/ProtectedRouteVendedor.jsx";
import FormMetodoPago from "./pages/ajustes/FormMetodoPago.jsx";


function App() {

    return (
        <>

          <Router>

            <Routes>
                <Route index element={<Promo/>}/>
                <Route path={"*"} element={<NotFound/>}/>
                <Route path={"/play"} element={<Playground/>}/>
                <Route path={"/TOS"} element={<TOS/>}/>
                <Route path={"/Privacy"} element={<Privacy/>}/>
                <Route path={"/signup/comprador"} element={<SignupComprador/>}/>
                <Route path={"/signup/vendedor"} element={<SignupVendedor/>}/>
                <Route path={"/login/comprador"} element={<LoginComprador/>}/>
                <Route path={"/login/vendedor"} element={<LoginVendedor/>}/>
                <Route element={<ProtectedRouteComprador redirectTo={"/login/comprador"} />}>
                    <Route path='/productos' element={<Productos/>}/>
                    <Route path={"/productos/:id"} element={<VerProducto/>}/>
                    <Route path={"/buscar/producto/"} element={<BuscarProducto/>}/>
                    <Route path={"/cuenta"} element={<Perfil/>}/>
                    <Route path={"/cuenta/metodo"} element={<FormMetodoPago/>}/>
                    <Route path={"/carrito"} element={<Carrito/>}/>
                </Route>
                <Route path={"/vendedor/gestionar"} element={<GestionarProducto/>}/>
                <Route path={"/vendedor/publicar/"} element={<PublicarProducto/>}/>
                <Route element={<ProtectedRouteVendedor redirectTo={"/login/vendedor"} />}>
                    
                </Route>
            </Routes>
          </Router>

        </>

    )
}
export const DomainContext = createContext("http://localhost");
export default App
