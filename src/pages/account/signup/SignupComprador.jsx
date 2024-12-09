import {useContext, useEffect, useState} from "react"
import Input from "../../../components/Input/Input.jsx"
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx"
import Password from "../../../components/Input/Password.jsx";
import ilustracion from "../../../assets/Illustrations/In no time-pana 1.svg";
import {Link, useNavigate} from "react-router-dom";
import {DomainContext} from "../../../App.jsx";

export default function SignupComprador() {


    const [nombre, setNombre] = useState({error: true, value: ""});
    const [correo, setCorreo] = useState({error: true, value: ""});
    const [contra, setContra] = useState({error: true, value: ""});
    const [telPer, setTelPer] = useState({error: true, value: ""});
    const [sendForm, setSendForm] = useState(true);
    const [confContra, setConfContra] = useState({error: true, value: ""});
    const [showMsgError, setShowMsgError] = useState(false)
    const [msgError, setMsgError] = useState("")
    const navigate = useNavigate();
    const domain = useContext(DomainContext)
    
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

    async function mandar() {
        const url = domain + "/login/registrarComprador";
        try {
            const myHeaders = new Headers();
            const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);
            myHeaders.append("Authorization", `Basic ${encodedCredentials}`);
            myHeaders.append("Content-Type", "application/json");
            fetch(url, {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(form)
            }).then(res => {
                if(res.ok){
                    navigate("/login/comprador");
                }
                else{
                    if(res.status === 409){
                        setMsgError("La cuenta ya existe")
                        setShowMsgError(true)
                        return;
                    }
                    setMsgError("Ha ocurrido un error inesperado")
                    setShowMsgError(true)
                }
            })
        } catch(err) {
            console.log(err);
            setMsgError("No se ha podido conectar con el servidor");
            setShowMsgError(true);
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
                        <PrimaryButton width={""} size="[2rem]" estilo={"primary"} tamano={"normal"} disabled={!sendForm}
                                       onClick={mandar}>
                            Crear Cuenta
                        </PrimaryButton>
                        {
                            showMsgError &&
                            (
                                <p className={"text-sm text-er-700"}>{msgError}</p>
                            )

                        }
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