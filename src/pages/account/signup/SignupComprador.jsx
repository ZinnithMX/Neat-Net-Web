import { useEffect, useState } from "react"
import Input from "../../../components/Input/Input.jsx"
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx"
import Password from "../../../components/Input/Password.jsx";
import ilustracion from "../../../assets/Illustrations/In no time-pana 1.svg";
import {Link} from "react-router-dom";

export default function SignupComprador() {


    const [nombre, setNombre] = useState({error: true, value: ""});
    const [correo, setCorreo] = useState({error: true, value: ""});
    const [contra, setContra] = useState({error: true, value: ""});
    const [telPer, setTelPer] = useState({error: true, value: ""});
    const [sendForm, setSendForm] = useState(true);
    const [confContra, setConfContra] = useState({error: true, value: ""});

    
    const [form, setForm] = useState({
        nombre: nombre.value,
        correo: correo.value,
        contrasenia: contra.value,
        contactos: [
            {
                tipoContacto: "TELPERSONAL",
                contacto: telPer
            }
        ]
    });

    useEffect(() => {

        if(!nombre.error && !contra.error && !correo.error &&  !telPer.error && !confContra.error){
            setForm({
                nombre: nombre.value,
                correo: correo.value,
                contrasenia: contra.value,
                contactos: [
                    {
                        tipoContacto: "TELPERSONAL",
                        contacto: telPer.value
                    }
                ]
            })
            setSendForm(true);
        }else{
            setSendForm(false);
        }
    },[contra, correo, nombre, telPer])

    async function mandar(form) {
        const url = "http://localhost:8080/login/registrarComprador";
        try {
            const myHeaders = new Headers();
            const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Basic ${encodedCredentials}`);
            fetch(url, {
                method: 'POST',
                headers: myHeaders,
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
                    className="w-1/2 h-full flex flex-col gap-8 px-12 py-32 overflow-y-scroll scroll-my-12 items-center">
                    <h2 className="text-p-600">¡Bienvenid@ a Neat-net!</h2>
                    <form className="gap-5  px-2 flex flex-col w-full">
                        <Input label="Nombre" required={true} response={setNombre} deshabilitado={false}
                               validate={false}>
                            ¿Cual es/son tu(s) nombre(s)?
                        </Input>
                        <Input label="Correo" required={true} response={setCorreo} deshabilitado={false} validate={true}
                               regex={new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)}>
                            ejemplo@dominio.com
                        </Input>
                        <Password label="Contraseña" required={true} response={setContra} deshabilitado={false}
                                  tipo={"registro"}>
                            Ingresa tu contraseña
                        </Password>
                        <Password label={"Confirmar contraseña"} required={true} deshabilitado={false}
                                  tipo={"confirmacion"}
                                  response={setConfContra} verificar={contra.value}>
                            Confirma tu contraseña
                        </Password>
                        <Input label="Numero de telefono" required={true} response={setTelPer} deshabilitado={false}
                               validate={true} regex={new RegExp(/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/)}>
                            +XX XXXX XXX 0000 0000
                        </Input>
                        <PrimaryButton size="[2rem]" estilo={"primary"} tamano={"normal"} disabled={!sendForm}
                                       onClick={() => {
                                           alert("Enviado")
                                           mandar(form)
                                       }}>
                            Crear Cuenta
                        </PrimaryButton>
                    </form>
                    <p className={"text-xs"}>Al crear una cuenta aceptas los <Link className={"link"} to={"/TOS"}>Terminos
                        y condiciones</Link> y las <Link className={"link"} to={"/Privacy"}> Politicas de privacidad</Link> de Neat-Net</p>
                    <div className={"flex flex-row gap-2"}>
                        <p className={"text-sm font-bold"}>¿Ya tienes cuenta? <Link to={"/login/comprador"} className={"link"}>Inicia Sesión</Link></p>
                        <p>|</p>
                        <p className={"text-sm font-bold"}>¿Eres <Link to={"/signup/vendedor"} className={"link"}>Vendedor</Link>?</p>
                    </div>
                </div>
            </div>

        </>
    )
}