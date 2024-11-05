import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Producto from "../../components/Producto/Producto.jsx";
import {useEffect, useState} from "react";

export default function Productos(){

    const[productos, setProducto] = useState([]);

    useEffect(() => {
        const headers = new Headers();
        headers.append("Accept", "application/json");
        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU");

        const requestOptions = {
            method: "GET",
            headers: headers,
            redirect: "follow"
        }
        fetch("http://localhost:8080/producto/vistosReciente?userId=1", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const resultado = JSON.parse(result);
                console.log(resultado);
                setProducto(resultado.producto)
            })
            .catch((error) => console.error(error));
    }, []);
    const handleDetalle = (array) => {
        let retorno = "No existe descripcion para este producto"
        array.forEach((item) => {
            if(item.tipoCaracteristica === 'DESCRIPCION') {
                retorno = item.valor;
            }
        })
        return retorno;
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
                <h4>Vistos recientemenete</h4>
                <div className="flex flex-row w-[100%-3rem] gap-2 overflow-scroll">
                    {
                        productos.map(producto => (
                            <Producto nombre={producto.titulo}
                                      descuento={producto.descuento}
                                      precio={producto.precio}
                                      detalles={handleDetalle(producto.caracteristicas)}/>
                        ))
                    }
                </div>
            </div>

            <div className="w-full px-6 py-8 gap-8">
                <h4>Productos Populares</h4>
            </div>
            <div className="w-full px-6 py-8 gap-8">
                <h4>Productos recién agregados</h4>
            </div>
            <div className="w-full px-6 py-8 gap-8">
                <h4>Descuentos de la semana</h4></div>
            <div className="w-full px-6 py-8 gap-8">
                <h4>Descubre algo nuevo</h4>
            </div>
            </div>
            <Footer/>
        </>
    )
}