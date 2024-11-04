import Input from "../../components/Input/Input.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";

export default function Seguridad() {
    return(
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


                        <h4 className={"text-p-600"}>Seguridad</h4>
                            <Input required={false} deshabilitado={true} label={"Nombre"}>Nombre completo</Input>
                            <PrimaryButton onClick={() => {
                                alert("Actualizar");
                            }} tamano={"mini"} estilo={"secondary"} width={"w-full"}>Actualizar</PrimaryButton>


                    </div>
                </div>
            </div>
        </>
    );
}