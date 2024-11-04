import { useEffect, useState } from "react"
import Input from "../../../components/Input/Input.jsx"
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx"
import Password from "../../../components/Input/Password.jsx";
import ilustracion from "../../../assets/Illustrations/Shopping-pana.svg";
import {Link} from "react-router-dom";

export default function LoginComprador(){

    const [correo, setCorreo] = useState({error: true, value:""});
    const [contra, setContra] = useState({error: true, value:""});
    const [sendForm, setSendForm] = useState(true);


    const [form, setForm] = useState({
        correo: correo.value,
        contrasenia: contra.value,
    });

    useEffect(() => {

        if(!contra.error && !correo.error){
            setForm({
                correo: correo.value,
                contrasenia: contra.value,
            })
            setSendForm(true);
        }else{
            setSendForm(false);
        }
    },[contra, correo])

    async function mandar(form) {
        const url = "http://192.168.20.73:8080/users/add";
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            }).then(res => {
                alert(res);
            })
        } catch(err) {
            alert(err);
        }
    }



    return(
        <>
            <div className="flex flex-row h-dvh">
                <div className="w-1/2 flex bg-g-300 h-full p-8 items-center justify-center">
                    <img src={ilustracion} className={"w-full aspect-auto"}/>
                </div>
                <div
                    className="w-1/2 h-full flex flex-col gap-8 px-12 py-32 overflow-y-scroll scroll-my-12 items-center justify-center">
                    <h2 className="text-p-600">¡Bienvenid@ a Neat-net!</h2>
                    <form className="gap-5  px-2 flex flex-col w-full">
                        <Input label="Correo" required={true} response={setCorreo} deshabilitado={false} validate={true}
                               regex={new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)}>
                            ejemplo@dominio.com
                        </Input>
                        <Password label="Contraseña" required={true} response={setContra} deshabilitado={false} tipo={""}>
                            Ingresa tu contraseña
                        </Password>
                        <PrimaryButton size="[2rem]" estilo={"primary"} tamano={"normal"} disabled={!sendForm}
                                       onClick={() => {
                                           alert("Enviado")
                                           mandar(form)
                                       }}>
                            Iniciar Sesión
                        </PrimaryButton>
                    </form>
                    <div className={"flex flex-row gap-2"}>
                        <p className={"text-sm font-bold"}>¿No tienes cuenta? <Link to={"/signup/comprador"} className={"link"}>Crea Una</Link></p>
                        <p>|</p>
                        <p className={"text-sm font-bold"}>¿Eres <Link to={"/login/vendedor"} className={"link"}>Vendedor</Link>?</p>
                    </div>
                </div>
            </div>

        </>
    )
}