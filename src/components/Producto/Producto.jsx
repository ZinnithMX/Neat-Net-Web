import PropTypes from "prop-types";
import NumerInput from "../Input/NumberInput/NumberInput.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import {useState} from "react";
import Rating from "../Rating/Rating.jsx";

export default function Producto(props) {

    const funcion = () => {};
    const isGrid = props.layout === "Cuadricula";

    return (
        <div className={`flex ${isGrid ? "flex-col h-[434px] w-[380px]" : "flex-row h-60 w-[700px]"} rounded-[8px] overflow-hidden`}>
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
                        <div className="text-p-600 font-bold">-{props.descuento}%</div>
                        <div className="font-bold">${props.precio}</div>
                    </div>
                    <Rating rating={4} />
                </div>
                <div className="flex gap-[10px] justify-between">
                    <div className="w-[104px]">
                        <NumerInput response={funcion} tamano="normal" />
                    </div>
                    <PrimaryButton className="flex-1" tamano="pequeno" estilo="primary" onClick={() => alert("Comprado")}>Comprar</PrimaryButton>
                    <PrimaryButton tamano="pequeno" estilo="primary" onClick={() => alert("Carrito")}><span className={"material-symbols-rounded icon text-a-50"}>shopping_cart</span></PrimaryButton>
                    <PrimaryButton tamano="pequeno" estilo="primary" onClick={() => alert("WishList")}><span className={"material-symbols-rounded icon text-a-50"}>playlist_add</span> </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

Producto.defaultProps = {
    nombre: "Producto",
    detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ex lorem. Nunc molestie, urna sed euismod dapibus, magna sapien fringilla nisi, ornare egestas justo mi non quam. Aenean vehicula purus vitae varius facilisis.",
    precio: 999.99,
    descuento: 20,
    layout: "Lista"
};

Producto.propTypes = {
    nombre: PropTypes.string.isRequired,
    detalles: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descuento: PropTypes.number.isRequired,
    layout: PropTypes.oneOf(["Lista", "Cuadricula"])
};
