import CategorySelector from "../components/CategorySelector/CategorySelector.jsx";
import {useEffect, useState} from "react";
import NumerInput from "../components/Input/NumberInput/NumberInput.jsx";
import Rating from "../components/Rating/Rating.jsx";
import Header from "../components/Header/Header.jsx";
import Producto1 from "../components/Producto/Producto1.jsx";
import Producto2 from "../components/Producto/Producto2.jsx";
import PrimaryButton from "../components/Button/PrimaryButton.jsx";
import Producto from "../components/Producto/Producto.jsx";


export default function Playground(){

    const [opc, setOpc] = useState({error: true, value:""});
    const [number, setNumber] = useState({error: true, value:0});

    useEffect(() => {
        console.log(opc);
        console.log(number);
    }, [opc, number]);

    function funcion(){
        console.log("Click");
    }

    return (<>
            <Header></Header>
            <div className="flex flex-row h-dvh">
                <Producto layout={"Cuadricula"}></Producto>
            </div>
        </>
    )
}