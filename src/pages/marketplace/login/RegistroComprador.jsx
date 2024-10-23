import { useState} from "react"
import Input from "../../../components/Input/input"

export default function RegistroComprador(){
    const [errorState, setErrorState] = useState(false);
    
    
    return(
        <div className="h-screen flex flex-start">
            <div className={"w-1/2 h-full"}>
                <img src=""/>
            </div>
            <div className={"w-1/2 h-full px-12 flex flex-col gap-8 justify-center items-center"}>
                <h2 className="text-p-600">
                    Bienvenido de vuelta!
                </h2>
                <form className="flex flex-col items-start gap-4 w-full">
                    <Input type="text" label={"Nombre"} required={true}  validacion={false} >
                        ¿Cómo quieres que te llamemos?
                    </Input>
                    <Input type="email" label={"Correo"} required={true}  validacion={false}>
                        ejemplo@dominio.com
                    </Input>
                    <Input type="password" label={"Contraseña"} required={true}  validacion={false}>
                        Ingresa tu contraseña
                    </Input>
                    <Input type="password" label={"Contraseña"} required={true}  validacion={false}>
                        Confirma tu contraseña
                    </Input>
                    <Input type="number" label={"Código Postal"} required={true}  validacion={false}>
                        Ingresa tu codigo postal    
                    </Input>
                </form>
            </div>

        </div>
    )

}