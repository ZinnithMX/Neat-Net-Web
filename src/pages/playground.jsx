import CategorySelector from "../components/CategorySelector/CategorySelector.jsx";
import {useEffect, useState} from "react";
import NumerInput from "../components/Input/NumberInput/NumberInput.jsx";
import Rating from "../components/Rating/Rating.jsx";
import Header from "../components/Header/Header.jsx";
import Producto from "../components/Producto/Producto.jsx";
import Producto2 from "../components/Producto/Producto2.jsx";
import PrimaryButton from "../components/Button/PrimaryButton.jsx";


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
            <div className="flex flex-row h-dvh">
                <div className="w-full h-full p-10 gap-4 flex flex-row">
                    <Producto></Producto>
                    <Producto2></Producto2>

                </div>
            </div>

        </>
    )
}