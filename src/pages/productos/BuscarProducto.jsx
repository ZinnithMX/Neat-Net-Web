import Header from "../../components/Header/Header.jsx";
import Input from "../../components/Input/Input.jsx";
import {useEffect, useState} from "react";


export default function BuscarProducto(){

    const [busqueda, setBusqueda] = useState({
        value: "",
        error: false
    });

    return(
        <>
            <Header/>
            <div className={"flex flex-col gap-8 px-8 py-6"}>

                <Input label={""} showLabel={false} response={setBusqueda} width={"w-full"} validate={false} maxLength={"100"}>
                    Ingrese el nombre del producto
                </Input>
                <div className={"flex gap-4"}>
                    <h3 className={"text-n-700"}> Resultados para </h3> <h3 className={"text-s-600"}>"{busqueda.value}"</h3>
                </div>
            </div>
        </>
    )
}