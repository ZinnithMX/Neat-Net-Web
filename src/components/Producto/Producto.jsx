import PropTypes from "prop-types";
import NumerInput from "../Input/NumberInput/NumberInput.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import {useState} from "react";
import Rating from "../Rating/Rating.jsx";

export default function Producto (props){

    const funcion = () => {};

    return (
        <div className="flex bg-a-300 h-60 w-[735px]">
            <img className="img-fluid size-60" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s" alt="Producto imagen" />
            <div className="flex flex-col py-4 px-6 w-[495px] gap-4 justify-between">
                <div className="col-12 font-bold">{props.nombre}</div>
                <div className="col-12 text-xs text-justify">{props.detalles}</div>
                <div className="flex align-middle justify-between">
                    <div className="flex justify-items-start gap-2">
                        <div className="text-p-600 font-bold">-{props.descuento}%</div>
                        <div className="font-bold">${props.precio}</div>
                    </div>
                    <Rating rating={4}></Rating>
                </div>

                <div className="flex gap-[10px] justify-between">
                    <div className="w-[104px]">
                        <NumerInput response={funcion}></NumerInput>
                    </div>
                    <PrimaryButton size={"[233px]"} onClick={() => {
                        alert("Comprado");}}>Comprar </PrimaryButton>
                    <PrimaryButton size={"10"} onClick={() => {
                        alert("Carrito");}}>icono </PrimaryButton>
                    <PrimaryButton size={"10"} onClick={() => {
                        alert("WishList");}}>icono </PrimaryButton>
                </div>
            </div>
        </div>
    )
}

Producto.defaultProps = {
    nombre: "Producto",
    detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ex lorem. Nunc molestie, urna sed euismod dapibus, magna sapien fringilla nisi, ornare egestas justo mi non quam. Aenean vehicula purus vitae varius facilisis.",
    precio: 999.99,
    descuento: 20,
}

Producto.propTypes = {
    nombre: PropTypes.string.isRequired,
    detalles: PropTypes.string.isRequired,
}