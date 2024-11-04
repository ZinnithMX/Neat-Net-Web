import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Producto from "../../components/Producto/Producto.jsx";

export default function Productos(){
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
                    <Producto layout={"Cuadricula"}></Producto>
                    <Producto layout={"Cuadricula"}></Producto>
                    <Producto layout={"Cuadricula"}></Producto>
                    <Producto layout={"Cuadricula"}></Producto>
                    <Producto layout={"Cuadricula"}></Producto>
                    <Producto layout={"Cuadricula"}></Producto>
                    <Producto layout={"Cuadricula"}></Producto>
                </div>
            </div>

            <div className="w-full">
                <h4>Productos Populares</h4>
            </div>
            <div className="w-full">
                <h4>Productos recién agregados</h4>
            </div>
            <div className="w-full">
                <h4>Descuentos de la semana</h4></div>
            <div className="w-full">
                <h4>Descubre algo nuevo</h4>
            </div>
            </div>
            <Footer/>
        </>
    )
}