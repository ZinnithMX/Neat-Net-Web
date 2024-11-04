import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Producto from "../../components/Producto/Producto.jsx";
import {useEffect, useState} from "react";

export default function Productos(){
    const [productos, setProductos] = useState(null);

    useEffect(() => {
        setProductos([
            { nombre: "Tennis", descripcion: "Son de muy buena calidad (créeme)", descuento: 20, precio: 200 , rating:3},
            { nombre: "Botas", descripcion: "Son de muy buena calidad (créeme)", descuento: 0, precio: 350, rating: 4 },
            { nombre: "Zapatos", descripcion: "Son de muy buena calidad (créeme)", descuento: 20, precio: 500, rating:5 },
        ]);
    }, []);

    const listaProd = productos?.map((producto) => (
        <Producto
            layout="Cuadricula"
            nombre={producto.nombre}
            detalles={producto.descripcion}
            descuento={producto.descuento}
            precio={producto.precio}
            rating={producto.rating}
        />
    ));

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
                    {listaProd}
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