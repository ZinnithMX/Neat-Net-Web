import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Producto from "../../components/Producto/Producto.jsx";
import {useEffect, useState} from "react";

export default function Productos(){
    const [productos, setProductos] = useState(null);
    const [logueado, setLogueado] = useState(false);

    useEffect(() => {
        setLogueado(Login());
    }, []);

    async function Login(){
        if(localStorage.getItem("sesionId") === null){
            return false;
        }
        else{

            const url = "http://localhost:8080/login/sessionId?" + new URLSearchParams({
                sessionId: localStorage.getItem("sesionId")
            });

            const headers = new Headers();
            const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);
            headers.append("Authorization", `Basic ${encodedCredentials}`);
            headers.append("Content-Type", `application/json`);

            fetch(url, {
                method: 'GET',
                headers: headers
            }).then(res =>{
                if(res.ok) {
                    const resultado = JSON.parse(res);
                    localStorage.setItem("idUsuario", resultado.idUsuario);
                    return true;
                }else{
                    return false;
                }
            }).catch(err =>{
                console.log(err);
                return false;
            })

        }
    }


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
                setProductos(resultado.producto)
            })
            .catch((error) => console.error(error));
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
        {logueado && (
            <>
            <div className="w-full h-[480px]">
                <img src="https://cdn.pixabay.com/photo/2017/08/30/17/26/please-2697951_1280.jpg" alt="Descripción de la imagen" className="object-cover w-full h-full"
                />
            </div>

            <div>
            <div className="w-full px-6 py-8 gap-8">
                <h4 className={"mb-8"}>Vistos recientemenete</h4>
                <div className="flex flex-row w-[100%-3rem] gap-2 overflow-scroll">

                    {
                        productos.map(producto => (
                            <Producto
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
            </div>

            </div>
            </>
            )}
            <Footer/>
        </>
    )
}