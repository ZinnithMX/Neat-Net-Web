import { useState } from 'react'
import ButtonPrimary from './components/Button/ButtonPrimary'
import Input from './components/Input/input'
import LoginComprador from './pages/marketplace/login/LoginComprador'

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <LoginComprador/>
    </>
      
  )
}

export default App
