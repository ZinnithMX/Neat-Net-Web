import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import Input from "../../components/Input/Input.jsx";
import PropTypes from "prop-types";


export default function Perfil(props) {
    return (
        <>
            <header className="flex justify-center text-p-600 h-14 items-center p-8">
                <h4>Neat-Net</h4>
            </header>
            <div className="flex flex-col text-xl px-12 py-16 w-full">
                <h2 className="text-p-600">Tu cuenta</h2>
                <div className={"flex flex-row gap-8 w-full"}>
                    <div className={"flex flex-col bg-g-200 rounded-lg w-1/3 h-fit p-4"}>
                        <div className={"p-4"}>Perfil</div>
                        <div className={"p-4"}>Seguridad</div>
                        <div className={"p-4"}>Métodos de Pago</div>
                        <div className={"p-4"}>Administar</div>
                        <div className={"p-4"}>Cerrar Sesión</div>

                    </div>

                    <div className={"flex flex-col p-8 w-2/3 gap-6"}>
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
                        <PrimaryButton onClick={() => {alert("Actualizar");}} tamano={"mini"} estilo={"secondary"} width={"w-full"}>Actualizar</PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}

Perfil.defaultTypes={
    nombre: "Nombre",
    apellidoP: "ApellidoP",
    apellidoM: "ApellidoM"
}

Perfil.propTypes = {
    nombre: PropTypes.string.isRequired,
    apellidoP: PropTypes.string.isRequired,
    apellidoM: PropTypes.string.isRequired,
}