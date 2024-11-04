import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import Input from "../../components/Input/Input.jsx";
import PropTypes from "prop-types";
import MetodoP from "../../components/metodoP/MetodoP.jsx";
import { useEffect, useState } from "react";

export default function Perfil(props) {
    const [metodos, setMetodos] = useState(null);
    const [activeSection, setActiveSection] = useState("Perfil");

    useEffect(() => {
        setMetodos([
            { nombre: "Metodo1", titular: "Yo", nip: 3 },
            { nombre: "Metodo2", titular: "Yo", nip: 3 },
            { nombre: "Metodo3", titular: "Yo", nip: 3 },
        ]);
    }, []);

    const listaMet = metodos?.map((metodo) => (
        <MetodoP nombre={metodo.nombre} titular={metodo.titular} nip={999} key={metodo.nombre}></MetodoP>
    ));

    return (
        <>
            <header className="flex justify-center text-p-600 h-14 items-center p-8">
                <h4>Neat-Net</h4>
            </header>
            <div className="flex flex-col text-xl px-12 py-16 w-full">
                <h2 className="text-p-600">Tu cuenta</h2>
                <div className={"flex flex-row gap-8 w-full"}>
                    <div className={"flex flex-col bg-g-200 rounded-lg w-1/3 h-fit p-4"}>
                        <div className={"p-4 cursor-pointer hover:bg-g-400 rounded-lg"} onClick={() => setActiveSection("Perfil")}>Perfil</div>
                        <div className={"p-4 cursor-pointer hover:bg-g-400 rounded-lg"} onClick={() => setActiveSection("Seguridad")}>Seguridad</div>
                        <div className={"p-4 cursor-pointer hover:bg-g-400 rounded-lg"} onClick={() => setActiveSection("MetodosPago")}>Métodos de Pago</div>
                        <div className={"p-4 cursor-pointer hover:bg-g-400 rounded-lg"} onClick={() => setActiveSection("Administar")}>Administar</div>
                        <div className={"p-4 cursor-pointer hover:bg-g-400 rounded-lg"} onClick={() => setActiveSection("CerrarSesion")}>Cerrar Sesión</div>
                    </div>

                    <div className={"flex flex-col p-8 w-2/3 gap-6"} style={{ display: activeSection === "Perfil" ? "block" : "none" }}>
                        <h4 className={"text-p-600"}>Información Básica</h4>
                        <div>
                            <Input required={false} deshabilitado={true} label={"Nombre"}>Nombre completo</Input>
                            <div>
                                <h5>Dirección</h5>
                                <Input required={false} deshabilitado={true} label={"Calle"}>Calle</Input>
                                <div className={"flex-row"}>
                                    <Input required={false} deshabilitado={true} label={"N Ext"}>N ext</Input>
                                    <Input required={false} deshabilitado={true} label={"N Int"}>N int</Input>
                                    <Input required={false} deshabilitado={true} label={"Código Postal"}>Codigo Postal</Input>
                                </div>
                                <Input required={false} deshabilitado={true} label={"Colonia"}>Colonia</Input>
                                <Input required={false} deshabilitado={true} label={"Estado"}>Estado</Input>
                            </div>
                        </div>
                        <PrimaryButton onClick={() => {
                            alert("Actualizar");
                        }} tamano={"mini"} estilo={"secondary"} width={"w-full"}>Actualizar</PrimaryButton>
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
                        <PrimaryButton onClick={() => {
                            alert("Actualizar");
                        }} tamano={"mini"} estilo={"secondary"} width={"w-full"}>Actualizar</PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}

Perfil.defaultTypes = {
    nombre: "Nombre",
    apellidoP: "ApellidoP",
    apellidoM: "ApellidoM"
}

Perfil.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellidoP: PropTypes.string.isRequired,
    apellidoM: PropTypes.string.isRequired,
}