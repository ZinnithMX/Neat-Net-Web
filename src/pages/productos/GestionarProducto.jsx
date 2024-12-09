import Header from "../../components/Header/Header.jsx";
import Input from "../../components/Input/Input.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import Producto from "../../components/Producto/Producto.jsx";
import ProductoVen from "../../components/Producto/ProductoVen.jsx";
import {useContext, useEffect, useState} from "react";
import HeaderVendedor from "../../components/Header/HeaderVendedor.jsx";
import {DomainContext} from "../../App.jsx";
import {Cookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export default function GestionarProducto(){
    const [productos, setProductos] = useState(null);
    const Domain = useContext(DomainContext);
    const userCookie = new Cookies();
    const navigate = useNavigate();

    const handleDetalle = (array) => {
        let retorno = "No existe una descripcion para este producto"
        array.forEach((item) => {
            if(item.tipoCaracteristica === 'DESCRIPCION') {
                retorno = item.valor;
            }
        })
        return retorno;
    }

    const handleImagen =  (array) => {
        for (const item of array) {
            if(item.tipoCaracteristica === 'IMAGEN') {
                return item.valor;
            }
        }
    }

    useEffect(() => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU");

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        }
        const url = Domain + "/producto/obtenerProductosVendedor?" + new URLSearchParams({
            idVendedor: userCookie.get("idVendedor")
        });


        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const resultado = JSON.parse(result);
                setProductos(resultado.productos)
            })
            .catch((error) => console.error(error));
    }, []);


    return(
        <>
            <HeaderVendedor/>
            <div className={"flex flex-col px-8 py-12 gap-8 w-full"}>
                    <div className={"flex flex-col gap-4"}>
                        <h3 className={"font-bold"}>Tus productos</h3>
                        <div className={"flex flex-row items-center gap-4 w-full"}>
                            <Input label={null} response={null} width={"flex-1"}>Buscar producto</Input>
                            <PrimaryButton onClick={() => {
                                alert("Filtar");
                            }} tamano={""} estilo={"primary"} width={"w-min"}>
                                <span className={"material-symbols-rounded icon"}>search</span>
                            </PrimaryButton>
                            <PrimaryButton onClick={() => {
                                alert("Filtar");
                            }} tamano={""} estilo={"primary"} width={"w-min"}><span
                                className={"material-symbols-rounded icon"}>filter_alt</span></PrimaryButton>
                            <PrimaryButton onClick={() => { navigate("/vendedor/publicar") }}
                                tamano={""} estilo={"primary"} width={"w-min"}><span
                                className={"material-symbols-rounded icon"}>add_circle</span></PrimaryButton>
                        </div>

                        <div className={"flex flex-row flex-wrap gap-12"}>
                            {
                                productos !== null && productos.map(producto => (
                                    <ProductoVen
                                        id={producto.idProducto}
                                        layout={"Cuadricula"}
                                        nombre={producto.titulo}
                                        imagen={handleImagen(producto.caracteristicas)}
                                        descuento={producto.descuento}
                                        precio={producto.precio}
                                        detalles={handleDetalle(producto.caracteristicas)}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
        </>
    );
}
