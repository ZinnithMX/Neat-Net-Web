import { useState} from "react"
import Input from "../../../components/Input/input"
import ButtonPrimary from "../../../components/Button/ButtonPrimary";

export default function LoginComprador(){
    const [errorState, setErrorState] = useState(false);
    const{email, setEmail} = useState("");
    const{password, setPassword} = useState("");

    let handleEmail = (email) => {
        setEmail(email);
    }
    
    let handlePassword = (password) => {
        setPassword(password);
    }
    
    return(
        <div className="h-screen flex flex-start">
            <div className={"w-1/2 h-full bg-g-300"}>
                <img src=""/>
            </div>
            <div className={"w-1/2 h-full px-12 flex flex-col gap-8 justify-center items-center"}>
                <h2 className="text-p-600">
                    Bienvenido de vuelta!
                </h2>
                <form className="flex flex-col gap-8 justify-center items-center w-full">
                    <div className="flex flex-col items-start gap-4 w-full">
                        <Input type="email" label={"Correo"} required={true} validacion={true} 
                            contenido={handleEmail} regex={new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)}>
                            ejemplo@dominio.com
                        </Input>
                        <Input type="password" label={"Contraseña"} required={true} validacion={true}
                            contenido={handlePassword}>
                            Ingresa tu contraseña
                        </Input>
                    </div>
                    <ButtonPrimary formAction={""}>Iniciar Sesión</ButtonPrimary>
                    <p>¿No tienes cuenta? <a href="">Crea una</a></p>
                    </form>
            </div>

        </div>
    )

}