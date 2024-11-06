import Rating from "../Rating/Rating.jsx";
import NumerInput from "../Input/NumberInput/NumberInput.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import Producto from "./Producto.jsx";

export default function ProductoVen(props){
    const funcion = () => {};
    const isGrid = props.layout === "Cuadricula";

    return (
        <div className={`flex ${isGrid ? "flex-col h-[434px] w-[380px]" : "flex-row h-60 w-[700px]"} rounded-[8px] overflow-hidden flex-none`}>
            <img
                className={`${isGrid ? "w-[380px] h-[214px]" : "size-60"} img-fluid`}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s"
                alt="Producto imagen"
            />
            <div className="flex flex-col py-4 px-6 flex-1 gap-4 justify-center bg-g-100">
                <div className="gap-2">
                    <div className="col-12 font-bold">{props.nombre}</div>
                    <div className="col-12 text-xs text-justify line-clamp-3">{props.detalles}</div>
                </div>
                <div className="flex align-middle justify-between">
                    <div className="flex justify-items-start gap-2">
                        {props.descuento !== 0 ? (
                            <div className="text-p-600 font-bold">-{props.descuento}%</div>
                        ) : null}
                        <div className="font-bold">${props.precio}</div>
                    </div>
                    <Rating rating={props.rating} />
                </div>
                <div className="flex gap-2 w-full">
                    <PrimaryButton width={"flex-1"} tamano="pequeno" estilo="primary" onClick={() => alert("Editado")}>
                        Editar
                    </PrimaryButton>
                    <PrimaryButton width={"w-min"} tamano="pequeno" estilo="secondary" onClick={() => alert("Feedback")}>
                        <span className={"material-symbols-rounded icon text-lg"}>feedback</span>
                    </PrimaryButton>
                    <PrimaryButton width={"w-min"} tamano="pequeno" estilo="neutro" onClick={() => alert("Estadísticas")}>
                        <span className={"material-symbols-rounded icon text-lg"}>bar_chart</span>
                    </PrimaryButton>
                    <PrimaryButton width={"w-min"} tamano="pequeno" estilo="error" onClick={() => alert("Eliminado")}>
                        <span className={"material-symbols-rounded icon text-lg"}>delete</span>
                    </PrimaryButton>

                </div>
            </div>
        </div>
    );
}

ProductoVen.defaultProps = {
    nombre: "Producto",
    detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ex lorem. Nunc molestie, urna sed euismod dapibus, magna sapien fringilla nisi, ornare egestas justo mi non quam. Aenean vehicula purus vitae varius facilisis.",
    precio: 999.99,
    descuento: 20,
    layout: "Lista",
    rating: 3,
};

ProductoVen.propTypes = {
    nombre: PropTypes.string.isRequired,
    detalles: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descuento: PropTypes.number.isRequired,
    layout: PropTypes.oneOf(["Lista", "Cuadricula"]),
    rating: PropTypes.number
};