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

function App() {

    return (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<Promo/>}/>
                <Route path={"/play"} element={<Playground/>}/>
                <Route path={"/TOS"} element={<TOS/>}/>
                <Route path={"/Privacy"} element={<Privacy/>}/>
                <Route path={"/signup/comprador"} element={<SignupComprador/>}/>
                <Route path={"/signup/vendedor"} element={<SignupVendedor/>}/>
                <Route path={"/login/comprador"} element={<LoginComprador/>}/>
                <Route path={"/login/vendedor"} element={<LoginVendedor/>}/>
                <Route path={"/comprador/inicio"} element={<Productos/>}/>
            </Routes>
          </Router>
        </>

    )
}

export default App
