import PrimaryButton from "../Button/PrimaryButton.jsx";
import PropTypes from "prop-types";
import MetodosPago from "../../pages/ajustes/MetodosPago.jsx";



export default function MetodoP(props){
    return(
        <div className={"flex flex-row rounded-[8px] overflow-hidden px-6 py-4 bg-g-200 "+props.size+ " gap-6"} >
            <img src={"https://r-charts.com/es/miscelanea/procesamiento-imagenes-magick_files/figure-html/color-fondo-imagen-r.png"} className={"size-24 rounded-2xl"}/>
            <div className={"flex-1"}>
                <h5>{props.nombre}</h5>
                <p>Titular</p>
                <p>NIP</p>
            </div>
            <div className={"flex flex-col gap-[9px]"}>
                <PrimaryButton onClick={() => {
                    alert("Editado");
                }} tamano={"pequeno"} estilo={"primary"} width={"w-full"}><span className={"material-symbols-rounded icon"}>edit</span>Editar</PrimaryButton>

                <PrimaryButton onClick={() => {
                    alert("Eliminado");
                }} tamano={"pequeno"} estilo={"error"} width={"w-full"}><span className={"material-symbols-rounded icon text-"}>delete</span>Eliminar</PrimaryButton>
            </div>
        </div>
    );
}


MetodoP.defaultProps={
    nombre: "Metodo de pago",
    size: "w-full",
}

MetodoP.propTypes={
    nombre: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    titular: PropTypes.string.isRequired,
    digitos: PropTypes.number.isRequired
}