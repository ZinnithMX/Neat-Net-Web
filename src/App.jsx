import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import SignupComprador from "./pages/account/signup/SignupComprador"
import Playground from "./pages/playground.jsx";
import TOS from "./pages/TOS.jsx";
import Privacy from "./pages/Privacy.jsx";

function App() {

    return (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<SignupComprador/>}/>
                <Route path={"/play"} element={<Playground/>}/>
                <Route path={"/TOS"} element={<TOS/>}/>
                <Route path={"/Privacy"} element={<Privacy/>}/>
            </Routes>
          </Router>
        </>

    )
}

export default App
