import Input from "./components/Input/Input.jsx";

function App() {
  return (
    <>
      <div className={"m-5 w-1/2"}>
        <Input label={"Labelsita"} required={false} error={false} deshabilitado={false}>
          Hola
        </Input>
        <p>holaa</p>
      </div>
    </>
      
  )
}

export default App
