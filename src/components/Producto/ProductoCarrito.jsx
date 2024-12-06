import {Link} from "react-router-dom";
import CategorySelector from "../CategorySelector/CategorySelector.jsx";
import NumerInput from "../Input/NumberInput/NumberInput.jsx";
import {useContext, useEffect, useState} from "react";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import PropTypes from "prop-types";
import {DomainContext} from "../../App.jsx";
import {Cookies} from "react-cookie";


export default function ProductoCarrito(props) {

    const [cantidad, setCantidad] = useState(props.producto.cantidad);
    const [image, setImage] = useState(null);
    const domainContext = useContext(DomainContext);
    const userCookies = new Cookies();



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

            const response = await fetch(domainContext + ":8080/producto/getByPath", requestOptions).catch(console.error("Imagen no encontrada"));
            if(response.ok) {
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            } else {
                setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s")
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

                const response = await fetch(`${domainContext}:8080/producto/getByPath`, requestOptions).catch(console.error("Imagen no encontrada"));
                if(response.ok) {
                    const blob = await response.blob();
                    setImage(URL.createObjectURL(blob));
                } else {
                    setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s")
                }
            }
        }
    }


    useEffect(() => {
        fetchImage(props.imagen)



    }, []);


    useEffect(() => {


        const headers = new Headers();
        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");
        headers.append("Content-Type", "application/json");


        fetch(domainContext + ":8080/producto/obtenerCantidadCarrito?" + new URLSearchParams({
            idUsuario: props.idUsuario,
            cantidad: cantidad
        }), {
            method: "POST",
            headers: headers,
        }).then(res => {props.importarProducto()});

    }, [cantidad])

    return(
        <div className={"flex items-center gap-6 p-4 rounded-xl bg-g-200"}>
            <img
                src={image}
                className={"h-[8rem] rounded-xl"}/>
            <div className={"flex gap-4 flex-1"}>
                <div className={"flex flex-col gap-3 flex-1"}>
                    <div className={"flex flex-col gap-1 flex-1"}>
                        <h5>{props.producto.titulo}</h5>
                        <div className={"flex gap-1"}>
                            <p>
                                Vendedor
                            </p>
                            <p>
                                <Link to={""} className={"link"}>
                                    {props.vendedor}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className={"flex gap-2 items-center flex-1 overflow-x-auto overflow-y-hidden"}>
                        <CategorySelector title={""} response={null} tamano={"pequeno"} width={"w-40"}>
                            <option>Opcion 1</option>
                            <option>Opcion 2</option>
                        </CategorySelector>
                        <CategorySelector title={""} response={null} tamano={"pequeno"} width={"w-40"}>
                            <option>Opcion 1</option>
                            <option>Opcion 2</option>
                        </CategorySelector>
                        <CategorySelector title={""} response={null} tamano={"pequeno"} width={"w-40"}>
                            <option>Opcion 1</option>
                            <option>Opcion 2</option>
                        </CategorySelector>

                    </div>
                </div>
                <div className={"w-40 gap-2 flex flex-col"}>
                    <p className={"text-lg font-bold"}>${props.producto.precio}</p>
                    <NumerInput valor={cantidad} response={setCantidad} tamano={"pequeno"} width={"w-full"}/>
                    <PrimaryButton onClick={() => {

                        const headers = new Headers();
                        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");
                        headers.append("Content-Type", "application/json");

                        const contentTypes = {
                            method: "DELETE",
                            headers: headers,
                        }

                        const url = `${domainContext}:8080/producto/eliminarProductoCarro?` + new URLSearchParams({
                            idProducto: props.producto.idProducto,
                            idUsuario: userCookies.get("idUsuario"),
                        })

                        fetch(url, contentTypes).then(response => {response.json()}).then((res) => {
                            props.importarProducto();
                        });
                    }} tamano={"pequeno"} estilo={"error"} width={"w-full"}>
                        <span className={"material-symbols-rounded icon text-sm"}>delete</span>
                        Eliminar
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}

ProductoCarrito.propTypes = {

    changed: PropTypes.func.isRequired,
    idUsuario: PropTypes.number,
    imagen: PropTypes.string,
    vendedor: PropTypes.string,
    importarProducto: PropTypes.func,
    handlePrecio: PropTypes.func,
    producto: PropTypes.object,
}