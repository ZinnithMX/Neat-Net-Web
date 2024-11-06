import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import SignupComprador from "./pages/account/signup/SignupComprador"
import Playground from "./pages/playground.jsx";
import Producto from "./components/Producto/Producto.jsx";
import Productos from "./pages/productos/Productos.jsx";
import SignupVendedor from "./pages/account/signup/SingupVendedor.jsx";

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
