import PropTypes from "prop-types";
import NumerInput from "../Input/NumberInput/NumberInput.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import {useState} from "react";
import Rating from "../Rating/Rating.jsx";

export default function Producto1 (props){
    const funcion = () => {};
    const [layout, setLayout] = useState("Lista");

    return (
        <div className="flex h-60 w-[700px] rounded-[8px] overflow-hidden">
            <img className="img-fluid size-60" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s" alt="Producto1 imagen" />
            <div className="flex flex-col py-4 px-6 flex-1 gap-4 justify-between bg-g-100">
                <div className="gap-2">
                    <div className="col-12 font-bold">{props.nombre}</div>
                    <div className="col-12 text-xs text-justify line-clamp-3 ">{props.detalles}</div>
                </div>
                <div className="flex align-middle justify-between">
                    <div className="flex justify-items-start gap-2">
                        <div className="text-p-600 font-bold">-{props.descuento}%</div>
                        <div className="font-bold">${props.precio}</div>
                    </div>
                    <Rating rating={4}></Rating>
                </div>

                <div className="flex gap-[10px] justify-between">
                    <div className="w-[104px]">
                        <NumerInput response={funcion} tamano={"normal"}></NumerInput>
                    </div>
                    <PrimaryButton tamano={"pequeno"} estilo={"primary"} onClick={() => {
                        alert("Comprado");}}>Comprar </PrimaryButton>
                    <PrimaryButton tamano={"pequeno"} estilo={"primary"} onClick={() => {
                        alert("Carrito");}}>icono </PrimaryButton>
                    <PrimaryButton tamano={"pequeno"} estilo={"primary"} onClick={() => {
                        alert("WishList");}}>icono </PrimaryButton>
                </div>
            </div>
        </div>
    )
}

Producto1.defaultProps = {
    nombre: "Producto1",
    detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ex lorem. Nunc molestie, urna sed euismod dapibus, magna sapien fringilla nisi, ornare egestas justo mi non quam. Aenean vehicula purus vitae varius facilisis.",
    precio: 999.99,
    descuento: 20,
}

Producto1.propTypes = {
    nombre: PropTypes.string.isRequired,
    detalles: PropTypes.string.isRequired,
}