import { useEffect, useState } from "react"
import Input from "../../../components/Input/Input.jsx"
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx"
import Password from "../../../components/Input/Password.jsx";

export default function SignupComprador(){


    const [nombre, setNombre] = useState({error: true, value:""});
    const [pat, setPat] = useState({error: true, value:""});
    const [mat, setMat] = useState({error: true, value:""});
    const [correo, setCorreo] = useState({error: true, value:""});
    const [contra, setContra] = useState({error: true, value:""});
    const [telPer, setTelPer] = useState({error: true, value:""});
    const [sendForm, setSendForm] = useState(false);

    
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

        if(!nombre.error && !contra.error && !correo.error && !mat.error && !pat.error && !telPer.error){
            setForm({
                name: nombre.value,
                contrasenia: contra.value,
                nombre: nombre.value,
                paterno: pat.value,
                materno: mat.value,
                correo: correo.value,
                telefono: telPer.value
            })
            setSendForm(true);
        }else{
            setSendForm(false);
        }
    },[contra, correo, mat, nombre, pat, telPer])

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
                <div className="w-1/2 bg-g-300 h-full">
                    <img />
                </div>
                <div className="w-1/2 h-full flex flex-col gap-8 px-12 py-32 overflow-y-scroll scroll-my-12">
                    <h2 className="text-p-600">¿Listo para vender?</h2>
                    <form className="gap-5  px-2 flex flex-col">
                        <Input label="Nombre" required={true} response={setNombre} deshabilitado={false}>
                            ¿Cual es/son tu(s) nombre(s)?
                        </Input>
                        <Input label="Apellido Paterno" required={true} response={setPat}  deshabilitado={false}>
                            ¿Cuál es tu apellido paterno?
                        </Input>
                        <Input label="Apellido Materno" required={true} response={setMat}  deshabilitado={false}>
                            ¿Cuál es tu apellido materno?
                        </Input>
                        <Input label="Correo" required={true} response={setCorreo}  deshabilitado={false}>
                            ejemplo@dominio.com
                        </Input>
                        <Password label="Contraseña" required={true} response={setContra} deshabilitado={false} tipo={"registro"}>
                            Ingresa tu contraseña
                        </Password>
                        <Input label="Contraseña" required={true} response={setContra} deshabilitado={false}>
                            Ingresa tu contraseña
                        </Input>
                        <Input label="Confirmar contraseña" required={true} response={null} deshabilitado={false}>
                            Vuelve a ingresar tu contraseña
                        </Input>
                        <Input label="Telefono empresarial" required={true} response={null} deshabilitado={false}>
                            +52 1 XXX 0000 0000
                        </Input>
                        <Input label="Telelfono personal" required={true} response={setTelPer} deshabilitado={false}>
                            +52 1 XXX 0000 0000
                        </Input>
                        <PrimaryButton size="[16rem]" disabled={!sendForm} onClick={() => {
                            alert("Enviado")
                            mandar(form)
                        }}>
                            Enviar
                        </PrimaryButton>
                    </form>
                    
                </div>
            </div>
            
        </>
    )
}