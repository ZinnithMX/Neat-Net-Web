import {
  BrowserRouter as Router, Routes,
  Route
} from "react-router-dom";
import SignupComprador from "./pages/account/signup/SignupComprador"
import Playground from "./pages/playground.jsx";

function App() {

    return (
        <>
          <Router>
            <Routes>
              <Route path="/" element={<SignupComprador/>}/>
                <Route path={"/play"} element={<Playground/>}/>
            </Routes>
          </Router>
        </>

    )
}

export default App
