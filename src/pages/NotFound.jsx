import {Link} from "react-router-dom";


export default function NotFound() {

    return (
        <div className={"flex flex-col items-center gap-8 h-full py-64 "}>
            <h1 className={"text-er-600"}>¡Error 404!</h1>
            <h2 className={"text-p-600"}>Oooops...</h2>
            <p className={"text-xl font-semibold"}>Parece que no encontramos tu pagina...</p>
            <p className={"text-xl"}>Intenta <Link to={"/"} className={"link"}>regresar al inicio</Link></p>
        </div>
    )
}