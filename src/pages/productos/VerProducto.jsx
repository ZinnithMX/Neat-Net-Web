import {useParams} from "react-router-dom";


export default function VerProducto() {

    const {id} = useParams();

    return(
        <>

            <h1>Ver Productos {id}</h1>
        </>
    );
}