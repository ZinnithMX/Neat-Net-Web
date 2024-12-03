import PropTypes from "prop-types";
import NumerInput from "../Input/NumberInput/NumberInput.jsx";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import {useContext, useEffect, useState} from "react";
import Rating from "../Rating/Rating.jsx";
import {Navigate, NavLink} from "react-router-dom";
import {DomainContext} from "../../App.jsx";
import {Cookies} from "react-cookie";

export default function Producto(props) {
    const funcion = () => {};
    const isGrid = props.layout === "Cuadricula";
    const [image, setImage] = useState(null);
    const [inPath, setInPath] = useState(props.imagen);
    const domain = useContext(DomainContext);
    const userCookies = new Cookies();

    useEffect(() => {
        const fetchImage = async (pathIn) => {
            if(pathIn === undefined){
                console.log("Imagen indefinida")
                setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s");
            } else {
                const headers = new Headers();
                headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");
                headers.append("Content-Type", "application/json");

                const newFormData = {
                    path: pathIn
                }
                const requestOptions = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(newFormData),
                    redirect: "follow"
                }
                    const response = await fetch(`${domain}:8080/producto/getByPath`, requestOptions);
                if(response.ok) {
                    const blob = await response.blob();
                    await new Promise((resolve, reject) => setTimeout(resolve, 150));
                    setImage(URL.createObjectURL(blob));
                } else {
                    setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s")
                }
            }
        }
        fetchImage(inPath)
    },[inPath])

    return (
        <div className={`flex ${isGrid ? "flex-col h-[434px] w-[380px]" : "flex-row h-60 w-[700px]"} rounded-[8px] overflow-hidden flex-none `}>
            <NavLink to={`/productos/${props.id}/`}>
                <img

                    className={`${isGrid ? "w-[380px] h-[214px]" : "size-60"} img-fluid hover:cursor-pointer`}
                    src={image}
                    alt="Producto imagen"
                    onClick={() => {
                    }}
                />
            </NavLink>

            <div className="flex flex-col py-4 px-6 flex-1 gap-4 justify-center bg-g-100">
                <div className="gap-2">
                    <div className="col-12 font-bold">{props.nombre}</div>
                    <div className="col-12 text-xs text-justify line-clamp-3">{props.detalles}</div>
                </div>
                <div className="flex align-middle justify-between">
                    <div className="flex justify-items-start gap-2">
                        {props.descuento !== 0 && (
                            <>
                                <div className="text-p-600 font-bold">-{props.descuento}%</div>
                            </>
                        )}
                        <div className="font-bold">${props.precio}</div>
                    </div>
                    <Rating rating={props.rating} />
                </div>
                <div className="flex gap-2 w-full">
                    <NumerInput response={funcion} tamano="pequeno" width={"w-28"} />
                    <PrimaryButton width={"flex-1"} tamano="pequeno" estilo="primary" onClick={() => alert("Comprado")}>
                        Comprar
                    </PrimaryButton>
                    <PrimaryButton width={"w-min"} tamano="pequeno" estilo="primary" onClick={() => {
                        const headers = new Headers();
                        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");
                        headers.append("Content-Type", "application/json");
                        const content = {
                            method: "POST",
                            headers: headers,
                        };

                        const url = `${domain}:8080/producto/anadirProductoCarro?` + new URLSearchParams({
                            idProducto: props.id,
                            idUsuario: userCookies.get("idUsuario"),
                            cantidad: 1,
                        });

                        fetch(url, content)
                            .then(response => {response.json()})
                            .then((res) => alert("Producto agregado al carrito"));
                    }}>
                        <span className={"material-symbols-rounded icon text-lg"}>shopping_cart</span>
                    </PrimaryButton>
                    <PrimaryButton width={"w-min"} tamano="pequeno" estilo="primary" onClick={() => alert("WishList")}>
                        <span className={"material-symbols-rounded icon text-lg"}>playlist_add</span>
                    </PrimaryButton>


                </div>
            </div>
        </div>
    );
}

/*
Producto.defaultProps = {
    nombre: "Producto",
    detalles: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ex lorem. Nunc molestie, urna sed euismod dapibus, magna sapien fringilla nisi, ornare egestas justo mi non quam. Aenean vehicula purus vitae varius facilisis.",
    precio: 999.99,
    descuento: 20,
    layout: "Lista"
};*/

Producto.propTypes = {
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    detalles: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descuento: PropTypes.number.isRequired,
    layout: PropTypes.oneOf(["Lista", "Cuadricula"]),
    rating: PropTypes.number,
    imagen: PropTypes.string.isRequired,
};
