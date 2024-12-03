import CategorySelector from "../components/CategorySelector/CategorySelector.jsx";
import {useEffect, useState} from "react";
import NumerInput from "../components/Input/NumberInput/NumberInput.jsx";
import Rating from "../components/Rating/Rating.jsx";
import Header from "../components/Header/Header.jsx";
import Producto1 from "../components/Producto/Producto1.jsx";
import Producto2 from "../components/Producto/Producto2.jsx";
import PrimaryButton from "../components/Button/PrimaryButton.jsx";
import Producto from "../components/Producto/Producto.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MetodoP from "../components/metodoP/MetodoP.jsx";
import ProductoCarrito from "../components/Producto/ProductoCarrito.jsx";
import FileInput from "../components/Input/FileInput/FileInput.jsx";


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
            <ProductoCarrito />
            <div className="flex flex-row h-dvh">
                <Producto layout={"Cuadricula"}></Producto>
                <div className="w-1/2 h-full p-10 gap-4 flex flex-col">
                    <MetodoP titular={"Juanito"} numTarjeta={"1234567890"}></MetodoP>
                    <CategorySelector title={"Categoria 1"} response={setOpc} tamano={"pequeno"}>
                        <option>Opcion 1</option>
                        <option>Opcion 2</option>
                    </CategorySelector>
                    <NumerInput response={setNumber} tamano={"pequeno"} width={""}/>
                    <Rating rating={3.6} />
                    <PrimaryButton onClick={funcion} disabled={true} tamano={"pequeno"} estilo={"secondary"} width={""}>
                        Hola
                    </PrimaryButton>
                    <FileInput label={"Label"} fileExtensions={".pdf"} fileType={"image/jpeg, image/png"} />
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}