import { useEffect, useState } from "react"
import Input from "../../../components/Input/Input.jsx"
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx"
import Password from "../../../components/Input/Password.jsx";
import ilustracion from "../../../assets/Illustrations/Shopping-pana.svg";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {Cookies} from "react-cookie";

export default function LoginComprador(){

    const [correo, setCorreo] = useState({error: true, value:""});
    const [contra, setContra] = useState({error: true, value:""});
    const [sendForm, setSendForm] = useState(true);
    const [ip, setIP] = useState("");


    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        console.log(res.data);
        setIP(res.data.ip);
    };

    useEffect(() => {
        getData();
    }, []);

    const [Form, setForm] = useState({
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

    async function mandar() {
        const url = "http://localhost:8080/login/iniciarSesion?" + new URLSearchParams({
            correo: Form.correo,
            password: Form.contrasenia,
            ip: ip
        });
        const headers = new Headers();
        const encodedCredentials = btoa(`${Form.correo}:${Form.contrasenia}`);
        headers.append("Authorization", `Basic ${encodedCredentials}`);
        headers.append("Content-Type", `application/json`);

        axios.get(url, {headers: headers}).then(res => {
            if(res.status === 200){
                const userCookie = new Cookies();
                //console.log(res.data.sessionId);
                userCookie.set("sesionId", res.data.sessionId, {path: "/"});
                console.log(userCookie.get("sesionId"));
                return <Navigate to={"/productos/"}/>
            }
        }).catch(err => {
            console.log(err);
        })
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
                                       onClick={mandar} width={""}>
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