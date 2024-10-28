import Input from "./components/Input/Input.jsx";
import PrimaryButton from "./components/Button/PrimaryButton.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [contenido1, setContenido1] = useState({
        error: true,
        value: ""
    });

    const [sendForm, setSendForm] = useState(false);

    let datos = (contenido)=> {
        setContenido1(contenido);
    }

    useEffect(() => {
        if(contenido1.error){
            setSendForm(false);
        }else{
            setSendForm(true);
        }
    }, [contenido1]);


    async function getDatos() {
        try{
            await axios.post("", {

            }).then((res) => {

            })
        }catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className={"m-5 w-1/2 gap-4 flex flex-col"}>
                <Input label={"Labelsita"} required={true} error={false} deshabilitado={false}
                       validate={true} regex={new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)}
                        response={datos}>
                    Hola
                </Input>
                <PrimaryButton size={"min"} onClick={getDatos} {...(sendForm ? {disabled: false} : {disabled: true})}>
                    <span className={"material-symbols-rounded text-xs"}>search</span>
                    <p>Hola</p>
                    <span className={"material-symbols-rounded text-xs"}>search</span>
                </PrimaryButton>
                <p>holaa</p>
            </div>
        </>

    )
}

export default App
