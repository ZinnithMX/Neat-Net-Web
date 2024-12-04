import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Producto from "../../components/Producto/Producto.jsx";
import {useContext, useEffect, useState} from "react";
import {Cookies} from "react-cookie";
import {DomainContext} from "../../App.jsx";

export default function Productos(){
    const [productos, setProductos] = useState(null);
    const [agregados, setAgregados] = useState(null);
    const userCookie = new Cookies();

    const Domain = useContext(DomainContext);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU");

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        }
        const url = Domain + ":8080/producto/vistosReciente?" + new URLSearchParams({
            userId: userCookie.get("idUsuario")
        });


        fetch(url, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const resultado = JSON.parse(result);
                setProductos(resultado.producto)
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU");

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        }

        fetch(Domain + ":8080/producto/obtenerProductos", requestOptions)
        .then((response) => response.text())
            .then((result) => {
                const resultado = JSON.parse(result);
                setAgregados(resultado.productos);
            })
    }, []);



    const handleDetalle = (array) => {
        let retorno = "No existe una q descripcion para este producto"
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
    return(
        <>
        <Header />
            <div className="w-full h-[480px]">
                <img src="https://cdn.pixabay.com/photo/2017/08/30/17/26/please-2697951_1280.jpg" alt="Descripción de la imagen" className="object-cover w-full h-full"
                />
            </div>

            <div>
            <div className="w-full px-6 py-8 gap-8">
                <h4 className={"mb-8"}>Vistos recientemenete</h4>
                <div className="flex flex-row w-[100%-3rem] gap-2 overflow-scroll">

                    {
                        productos !== null && productos.map(producto => (
                            <Producto
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

            <div className="w-full px-6 py-8 gap-8">
                <h4>Productos agregados recientemente</h4>
                <div className="flex flex-row w-[100%-3rem] gap-2 overflow-scroll mt-8">
                    {
                        agregados !== null && agregados.map(producto => (
                            // eslint-disable-next-line react/jsx-key
                            <Producto
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

            <Footer/>
        </>
    )
}