import Header from "../../components/Header/Header.jsx";
import Input from "../../components/Input/Input.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import Producto from "../../components/Producto/Producto.jsx";
import ProductoVen from "../../components/Producto/ProductoVen.jsx";
import {useEffect, useState} from "react";
import HeaderVendedor from "../../components/Header/HeaderVendedor.jsx";

export default function GestionarProducto(){
    const [productos, setProductos] = useState(null);

    useEffect(() => {
        setProductos([
            { nombre: "Tennis", descripcion: "Son de muy buena calidad (créeme)", descuento: 20, precio: 200 , rating:3},
            { nombre: "Botas", descripcion: "Son de muy buena calidad (créeme)", descuento: 0, precio: 350, rating: 4 },
            { nombre: "Zapatos", descripcion: "Son de muy buena calidad (créeme)", descuento: 20, precio: 500, rating:5 },
        ]);
    }, []);

    const listaProd = productos?.map((producto) => (
        <ProductoVen
            layout="Cuadricula"
            nombre={producto.nombre}
            detalles={producto.descripcion}
            descuento={producto.descuento}
            precio={producto.precio}
            rating={producto.rating}
        />
    ));

    const listaProd2 = productos?.map((producto) => (
        <ProductoVen
            layout="Lista"
            nombre={producto.nombre}
            detalles={producto.descripcion}
            descuento={producto.descuento}
            precio={producto.precio}
            rating={producto.rating}
        />
    ));

    return(
        <>
            <HeaderVendedor/>
            <div className={"flex flex-col px-8 py-12 gap-8 w-full"}>
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
                    }} tamano={""} estilo={"primary"} width={"w-min"}>
                        <span className={"material-symbols-rounded icon"}>filter_alt</span>
                    </PrimaryButton>
                    <PrimaryButton onClick={() => {
                        alert("Guardado");}} tamano={""} estilo={"primary"} width={"w-min"}>
                        <span className={"material-symbols-rounded icon"}>add_circle</span>
                    </PrimaryButton>
                </div>

                    <div className={"flex flex-col"}>
                        <div className={"flex flex-row"}>
                            <h4 className={" font-bold flex-1"}>Sin Stock</h4>
                            <span className={"underline text-p-600"}>Ver más</span>
                        </div>

                        <div className="flex flex-row w-[100%-3rem] gap-6 overflow-scroll">
                            {listaProd}
                        </div>
                    </div>

                    <div className={"flex flex-col"}>
                        <div className={"flex flex-row"}>
                            <h4 className={" font-bold flex-1"}>Con preguntas</h4>
                            <span className={"underline text-p-600"}>Ver más</span>
                        </div>

                        <div className="flex flex-row w-[100%-3rem] gap-6 overflow-scroll">
                            {listaProd}
                        </div>
                    </div>


                    <div className={"flex flex-col gap-4"}>
                        <h4>Todos los productos</h4>
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
                            <PrimaryButton onClick={() => {
                                alert("Guardado");
                            }} tamano={""} estilo={"primary"} width={"w-min"}><span
                                className={"material-symbols-rounded icon"}>add_circle</span></PrimaryButton>
                        </div>

                        <div className={"flex flex-row flex-wrap gap-12"}>
                            {listaProd2}
                        </div>
                    </div>

                </div>
        </>
    );
}