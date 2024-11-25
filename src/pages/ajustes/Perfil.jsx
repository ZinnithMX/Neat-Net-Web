import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import Input from "../../components/Input/Input.jsx";
import MetodoP from "../../components/metodoP/MetodoP.jsx";
import {useContext, useEffect, useState} from "react";
import {Cookies, useCookies} from "react-cookie";
import axios from "axios";
import {DomainContext} from "../../App.jsx";

export default function Perfil() {
    const [metodos, setMetodos] = useState(null);
    const [cookies] = useCookies(['idUsuario']);
    const usuario = cookies.idUsuario;
    const [activeSection, setActiveSection] = useState("Perfil");
    const [correo, setCorreo] = useState({error: false, value: ""});
    const [calle, setCalle] = useState({error: false, value: ""});
    const [nExt, setNExt] = useState({error: false, value: ""});
    const [nInt, setNInt] = useState({error: false, value: ""});
    const [codigoPostal, setCodigoPostal] = useState({error: false, value: ""});
    const [colonia, setColonia] = useState({error: false, value: ""});
    const [estado, setEstado] = useState({error: false, value: ""});

    const domain = useContext(DomainContext);


    useEffect(() => {
            fetch(`http://localhost:8080/metodo-pago/obtener?idUsuario=${usuario}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('Ingreso:visitante')
                }
            })
                .then(response => response.json())
                .then(data => {
                    const metodosFormateados = data.map(metodo => ({
                        nombre: metodo.nombre,
                        titular: metodo.titular,
                        nip: metodo.nip
                    }));
                    setMetodos(metodosFormateados);
                })
                .catch(error => console.error('Error:', error));
        },
        [usuario]);

    const listaMet = metodos?.map((metodo) => (
        <MetodoP
            nombre={metodo.nombre}
            titular={metodo.titular}
            nip={metodo.nip}
            key={metodo.nombre}
        />
    ));

    /*const handleCerrarSesion = () => {
        ('idUsuario');
    }
    sessionStorage.clear();
<<<<<<< HEAD
    history.push('/login/comprador');*/

    function handleCerrarSesion(){
        //axios.post();

        const userCookie = new Cookies();
        userCookie.remove("sesionId", {path: "/"});
        userCookie.remove("idUsuario", {path: "/"});

    }


    const handleActualizarDireccion = () => {
        const direccion = {
            nombre: correo.value,
            estado: estado.value,
            colonia: colonia.value,
            calle: calle.value,
            interior: nInt.value,
            exterior: nExt.value,
            codigoPostal: codigoPostal.value
        };

        fetch(`http://localhost:8080/user/actualizarDir?correo=${correo.value}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Ingreso:visitante')
            },
            body: JSON.stringify(direccion)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text) });
                }
                return response.json();
            })
    };

    return (
        <>
            <header className="flex justify-center text-p-600 h-14 items-center p-8">
                <h4>Neat-Net</h4>
            </header>
            <div className="flex flex-col text-xl px-12 py-16 w-full">
                <h2 className="text-p-600">Tu cuenta</h2>
                <div className={"flex flex-row gap-8 w-full"}>
                    <div className={"flex flex-col bg-g-200 rounded-lg w-1/3 h-fit p-4"}>
                        <div className={`p-4 cursor-pointer hover:bg-g-400 rounded-lg ${activeSection === "Perfil" ? "bg-g-400" : ""}`} onClick={() => setActiveSection("Perfil")}>Perfil</div>
                        <div className={`p-4 cursor-pointer hover:bg-g-400 rounded-lg ${activeSection === "Seguridad" ? "bg-g-400" : ""}`} onClick={() => setActiveSection("Seguridad")}>Seguridad</div>
                        <div className={`p-4 cursor-pointer hover:bg-g-400 rounded-lg ${activeSection === "MetodosPago" ? "bg-g-400" : ""}`} onClick={() => setActiveSection("MetodosPago")}>Métodos de Pago</div>
                        <div className={`p-4 cursor-pointer hover:bg-g-400 rounded-lg ${activeSection === "Administar" ? "bg-g-400" : ""}`} onClick={() => setActiveSection("Administar")}>Administar</div>
                        <div className={`p-4 cursor-pointer hover:bg-g-400 rounded-lg ${activeSection === "CerrarSesion" ? "bg-g-400" : ""}`} onClick={handleCerrarSesion}>Cerrar Sesión</div>
                    </div>

                    <div className={"flex flex-col p-8 w-2/3 gap-6"} style={{ display: activeSection === "Perfil" ? "block" : "none" }}>
                        <h4 className={"text-p-600"}>Información Básica</h4>
                        <div>
                            <Input required={false} deshabilitado={false} response={setCorreo} label={"Nombre"}>Nombre completo</Input>
                            <div>
                                <h5>Dirección</h5>
                                <Input required={false} deshabilitado={false} response={setCalle} label={"Calle"}>Calle</Input>
                                <div className={"flex-row"}>
                                    <Input required={false} deshabilitado={false} response={setNExt} label={"N Ext"}>N ext</Input>
                                    <Input required={false} deshabilitado={false} response={setNInt} label={"N Int"}>N int</Input>
                                    <Input required={false} deshabilitado={false} response={setCodigoPostal} label={"Código Postal"}>Codigo Postal</Input>
                                </div>
                                <Input required={false} deshabilitado={false} response={setColonia} label={"Colonia"}>Colonia</Input>
                                <Input required={false} deshabilitado={false} response={setEstado} label={"Estado"}>Estado</Input>
                            </div>
                        </div>
                        <PrimaryButton   onClick={handleActualizarDireccion} tamano={"mini"} estilo={"secondary"} width={"w-full"}>Actualizar</PrimaryButton>
                    </div>

                    <div className={"flex flex-col p-8 w-2/3 gap-6"} style={{ display: activeSection === "Seguridad" ? "block" : "none" }}>
                        <h4 className={"text-p-600"}>Seguridad</h4>
                        <Input required={false} deshabilitado={true} label={"Nombre"}>Nombre completo</Input>
                        <PrimaryButton onClick={() => {
                            alert("Actualizar");
                        }} tamano={"mini"} estilo={"secondary"} width={"w-full"}>Actualizar</PrimaryButton>
                    </div>

                    <div className={"flex flex-col p-8 w-2/3 gap-6"} style={{ display: activeSection === "MetodosPago" ? "block" : "none" }}>
                        <h4 className={"text-p-600"}>Métodos de Pago</h4>
                        <div className={"flex flex-col gap-4"}>
                            {listaMet}
                        </div>
                        <PrimaryButton onClick={() => {
                            alert("Agregar");
                        }} tamano={"mini"} estilo={"primary"} width={"w-full"}>Agregar</PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}
