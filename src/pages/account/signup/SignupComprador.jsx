import { useEffect, useState } from "react"
import Input from "../../../components/Input/Input.jsx"
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx"
// npm install @stomp/stompjs sockjs-client
import {Stomp} from "@stomp/stompjs";

export default function SignupComprador(){


    const [nombre, setNombre] = useState({error: true, value:""});
    const [pat, setPat] = useState({error: true, value:""});
    const [mat, setMat] = useState({error: true, value:""});
    const [correo, setCorreo] = useState({error: true, value:""});
    const [contra, setContra] = useState({error: true, value:""});
    const [telPer, setTelPer] = useState({error: true, value:""});

    const stompClient = Stomp.client("ws://localhost:8080/register");

    const [form, setForm] = useState({
        name: nombre.value,
        contrasenia: contra.value,
        nombre: nombre.value,
        paterno: pat.value,
        materno: mat.value,
        correo: correo.value,
        telefono: telPer.value

    });

    useEffect(() => {
        setForm({
            name: nombre.value,
            contrasenia: contra.value,
            nombre: nombre.value,
            paterno: pat.value,
            materno: mat.value,
            correo: correo.value,
            telefono: telPer.value
        })
    },[contra.value, correo.value, mat.value, nombre.value, pat.value, telPer.value])

    async function mandar(form) {
        const url = "http://192.168.1.70:8080/users/add";
        try {
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            }).then(res => {
                alert(res.data);
            })
        } catch(err) {
            alert(err);
        }
    }

    

    return(
        <>
            <div className="flex flex-row h-dvh">
                <div className="w-1/2 bg-g-300 h-full">
                    <img />
                </div>
                <div className="w-1/2 h-full flex flex-col gap-8 px-12 py-32">
                    <h2 className="text-p-600">¿Listo para vender?</h2>
                    <form className="h-full gap-5 overflow-auto px-2">
                        <Input label="Nombre" required={true} response={setNombre}>
                            ¿Cual es/son tu(s) nombre(s)?
                        </Input>
                        <Input label="Apellido Paterno" required={true} response={setPat}>
                            ¿Cuál es tu apellido paterno?
                        </Input>
                        <Input label="Apellido Materno" required={true} response={setMat}>
                            ¿Cuál es tu apellido materno?
                        </Input>
                        <Input label="Correo" required={true} response={setCorreo}>
                            ejemplo@dominio.com
                        </Input>
                        <Input label="Contraseña" required={true} response={setContra}>
                            Ingresa tu contraseña
                        </Input>
                        <Input label="Confirmar contraseña" required={true} response={null}>
                            Vuelve a ingresar tu contraseña
                        </Input>
                        <Input label="Telefono empresarial" required={true} response={null}>
                            +52 1 XXX 0000 0000
                        </Input>
                        <Input label="Telelfono personal" required={true} response={setTelPer}>
                            +52 1 XXX 0000 0000
                        </Input>
                        <PrimaryButton size="[16rem]" onClick={() => {
                            alert("Enviado")
                            mandar(form)
                            stompClient.publish({
                                destination: "/app/register1",
                                body: JSON.stringify({'body' : form.name})
                            })
                        }}>
                            Enviar
                        </PrimaryButton>

                        <PrimaryButton onClick={() => {

                            stompClient.connect({}, () => {

                                alert("Conectado a Websocket usando STOMP");
                                stompClient.subscribe("/topic/canal1", (message) => {
                                    const newMessage = JSON.parse(message.body);
                                    alert(newMessage);
                                })
                            })
                        }} size={"123"}>
                            Conectar
                        </PrimaryButton>
                    </form>
                    
                </div>
            </div>
            
        </>
    )
}