import {useContext, useEffect, useState} from "react"
import Input from "../../../components/Input/Input.jsx"
import PrimaryButton from "../../../components/Button/PrimaryButton.jsx"
import Password from "../../../components/Input/Password.jsx";
import ilustracion from "../../../assets/Illustrations/Select-pana.svg";
import {Link, useNavigate} from "react-router-dom";
import {DomainContext} from "../../../App.jsx";
import {Cookies} from "react-cookie";

export default function SignupVendedor(){


    const [nombre, setNombre] = useState({error: true, value:""});
    const [pat, setPat] = useState({error: true, value:""});
    const [mat, setMat] = useState({error: true, value:""});
    const [correo, setCorreo] = useState({error: true, value:""});
    const [contra, setContra] = useState({error: true, value:""});
    const [telPer, setTelPer] = useState({error: true, value:""});
    const [telEmp, setTelEmp] = useState({error: true, value:""});
    const [nombreEmpresa, setNombreEmpresa] = useState({error: true, value:""});
    const [sendForm, setSendForm] = useState(true);
    const [confContra, setConfContra] = useState({error: true, value:""});
    const domain = useContext(DomainContext);
    const navigate = useNavigate();
    const [showMsgError, setShowMsgError] = useState(false)
    const [msgError, setMsgError] = useState("")

    const [Form, setForm] = useState({
        contrasenia: contra.value,
        nombre: nombre.value,
        paterno: pat.value,
        materno: mat.value,
        correo: correo.value,
        telefono: telPer.value
    });

    useEffect(() => {

        if(!nombre.error && !contra.error && !correo.error && !mat.error && !pat.error && !telPer.error && !telEmp.error && !confContra.error){
            setForm({
                nombre: nombre.value + " " + pat.value + " " + mat.value,
                correo: correo.value,
                contrasenia: contra.value,
                contactos: [
                    {
                        tipoContacto: "TELPERSONAL",
                        contacto: telPer.value
                    },
                    {
                        tipoContacto: "TELEMPRESARIAL",
                        contacto: telEmp.value
                    }
                ]
            })
            setSendForm(true);
        }else{
            setSendForm(false);
        }
    },[confContra.error, contra, correo, mat, nombre, pat, telEmp.error, telEmp.value, telPer])

    async function mandar() {
        const url = domain + ":8080/login/registrarVendedor?" + new URLSearchParams({
            nombreEmpresa: nombreEmpresa.value,
        });
        try {
            const headers = new Headers();
            const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);

            headers.append("Content-Type", `application/json`);
            headers.append("Authorization", `Basic ${encodedCredentials}`);

            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Form)
            }).then(res => {
                if(res.ok){
                    navigate("/login/vendedor/")
                }
                else{
                    setMsgError("Ha ocurrido un error inesperado")
                    setShowMsgError(true)
                }
            })
        } catch(err) {
            setMsgError("No se ha podido conectar con el servidor")
            setShowMsgError(true)
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
                    <h2 className="text-p-600">¿List@ para vender?</h2>
                    <form className="gap-5  px-2 flex flex-col w-full">
                        <Input label="Nombre" required={true} response={setNombre} deshabilitado={false}
                               validate={false}>
                            ¿Cual es/son tu(s) nombre(s)?
                        </Input>
                        <Input label="Apellido Paterno" required={true} response={setPat} deshabilitado={false}
                               validate={false}>
                            ¿Cuál es tu apellido paterno?
                        </Input>
                        <Input label="Apellido Materno" required={true} response={setMat} deshabilitado={false}
                               validate={false}>
                            ¿Cuál es tu apellido materno?
                        </Input>
                        <Input label={"Nombre empresa"} required={true} response={setNombreEmpresa} deshabilitado={false}
                               validate={false}>
                            ¿Cuál es el nombre de tu empresa?
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
                        <Input label="Telefono empresarial" required={true} response={setTelEmp} deshabilitado={false}
                               validate={true} regex={new RegExp(/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/)}>
                            +XX XXXX XXX 0000 0000
                        </Input>
                        <Input label="Telelfono personal" required={true} response={setTelPer} deshabilitado={false}
                               validate={true} regex={new RegExp(/^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/)}>
                            +XX XXXX XXX 0000 0000
                        </Input>
                        <PrimaryButton size="[2rem]" estilo={"primary"} tamano={"normal"} disabled={!sendForm}
                                       onClick={mandar} width={""}>
                            Crear Cuenta
                        </PrimaryButton>
                        {
                            showMsgError &&
                            (
                                <p className={"text-sm text-er-700"}>{msgError}</p>
                            )

                        }
                    </form>
                    <p className={"text-xs"}>Al crar una cuenta aceptas los <Link className={"link"} to={"/TOS"}>Terminos
                        y condiciones</Link> y las <Link className={"link"} to={"/Privacy"}> Politicas de privacidad</Link></p>
                    <div className={"flex flex-row gap-2"}>
                        <p className={"text-sm font-bold"}>¿Ya tienes cuenta? <Link to={"/login/vendedor"} className={"link"}>Inicia
                            Sesión</Link></p>
                        <p>|</p>
                        <p className={"text-sm font-bold"}>¿Eres <Link to={"/signup/comprador"}
                                                                       className={"link"}>Compador</Link>?</p>
                    </div>
                </div>
            </div>

        </>
    )
}