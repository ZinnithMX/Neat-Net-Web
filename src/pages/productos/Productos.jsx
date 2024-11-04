import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function Productos(){
    return(
        <>
            <Header />
            <div className="w-full h-[480px]">
                <img src="https://cdn.pixabay.com/photo/2017/08/30/17/26/please-2697951_1280.jpg" alt="Descripción de la imagen" className="object-cover w-full h-full"
                />
            </div>
            <Footer/>
        </>
    )
}