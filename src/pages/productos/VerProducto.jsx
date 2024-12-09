import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import Rating from "../../components/Rating/Rating.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import {Cookies} from "react-cookie";
import Input from "../../components/Input/Input.jsx";
import {DomainContext} from "../../App.jsx";


export default function VerProducto() {

    const {id} = useParams();
    const [encontrado, setEncontrado] = useState(false);
    const [producto, setProducto] = useState({});
    const [descripcion, setDescripcion] = useState("");
    const [image, setImage] = useState(null);
    const [idVendedor, setIdVendedor] = useState("");
    const [nombreVendedor, setNombreVendedor] = useState("");
    const userCookie = new Cookies();


    const domainContext = useContext(DomainContext)



    const fetchImage = async (pathIn) => {
        if(pathIn === undefined){
            console.log("Imagen indefinida")
            setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s");
        } else {
            const headers = new Headers();
            headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");
            headers.append("Content-Type", "application/json");

            const newFormData = {
                path: pathIn
            }
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(newFormData),
                redirect: "follow"
            }

            const response = await fetch("http://localhost:8080/producto/getByPath", requestOptions);
            if(response.ok) {
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            } else {
                setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s")
                const headers = new Headers();
                headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");
                headers.append("Content-Type", "application/json");

                const newFormData = {
                    path: pathIn
                }
                const requestOptions = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(newFormData),
                    redirect: "follow"
                }

                const response = await fetch(`${domainContext}:8080/producto/getByPath`, requestOptions);
                if(response.ok) {
                    const blob = await response.blob();
                    setImage(URL.createObjectURL(blob));
                } else {
                    setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s")
                }
            }
        }
    }

    useEffect(() => {
        console.log("Ingreso al useEffect")
        let url = `${domainContext}:8080/producto/obtenerPorId?idProducto=${id}`

         try{     
             fetch(url, {
                 method: "GET",
                 headers: {}
             }).then(res => res.json()).then(data => {
                 setProducto(data.producto);
                 let imagen, descripcion;
                 data.producto.caracteristicas.forEach((car) => {
                     if (car.tipoCaracteristica === "IMAGEN") {
                         imagen = car.valor;
                     } else if (car.tipoCaracteristica === "DESCRIPCION") {
                         descripcion = car.valor
                     }
                 });
                 setDescripcion(descripcion);
                 fetchImage(imagen);
                 setEncontrado(true);
                 setIdVendedor(data.producto.vendedor.idVendedor);
                 setNombreVendedor(data.producto.vendedor.nombreEmpresa);
             })
         }
         catch (e) {
             if(e.response.status === 400){
                 setEncontrado(false);
             }
         }

         try {
            const headers = new Headers();
            const encodedCredentials = btoa(`${"Ingreso"}:${"visitante"}`);
            headers.append("Authorization", `Basic ${encodedCredentials}`);
            headers.append("Content-Type", `application/json`);

            const otraUrl = domainContext + ":8080/producto/agregarReciente?" + new URLSearchParams({
                idProducto: id,
                idUsuario: userCookie.get("idUsuario")
            })
            fetch(otraUrl , {
                method: "PUT",
                headers: headers
            }).then((res) => res.json()).then((data) => console.log(data))
         } catch (e) {
            console.log(e);
         }
    }, []);



    return(
        <>
            <Header/>
            {encontrado ?
                <div className={"flex flex-col"}>
                    <div className={"flex py-8 px-6 items-center gap-8"}>
                        <div className={"w-full flex flex-col py-8 px-6 gap-16"}>
                            <img src={image} className={"rounded-2xl h-[30vw] w-[60vw]"} />
                        </div>
                        <div className={"w-full flex py-2 px-4 flex-col gap-4"}>
                            <h3>{producto.titulo}</h3>
                            <div className={"flex justify-between items-center w-full"}>
                                <Rating rating={producto.puntuacion}/>
                                <p>Vendido por: <Link className={"link-secondary"}
                                                      to={`/vendedor/${idVendedor}/`}>{nombreVendedor}</Link></p>

                            </div>
                            <div className={"flex flex-col justify-center gap-1"}>
                                {<div className={"flex items-center gap-4"}>
                                    <h4 className={"text-n-400"}>${producto.descuento > 0 ? (producto.precio * (1 - producto.descuento)).toFixed(2) : producto.precio.toFixed(2)}</h4>
                                    {producto.descuento > 0 &&
                                        <p className={"text-lg text-p-600 font-bold"}>-{producto.descuento * 100} %</p>}
                                </div>}
                                {producto.descuento > 0 &&
                                    <p className={"text-sm text-n-200 font-light"}>Precio original: {producto.precio.toFixed(2)}</p>
                                }
                            </div>
                            <div className={"flex flex-col gap-2"}>
                                <h5>{descripcion}   </h5>
                                <p className={"line-clamp-6 text-sm text-justify"}>{}</p>
                            </div>
                            <div className={"flex gap-4 "}>
                                <PrimaryButton onClick={null} tamano={"pequeno"} estilo={"primary"} width={"w-full"}>
                                    Comprar
                                </PrimaryButton>
                                <PrimaryButton onClick={() => {
                                    const headers = new Headers();
                                    headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");
                                    headers.append("Content-Type", "application/json");
                                    const content = {
                                        method: "POST",
                                        headers: headers,
                                    };

                                    const url = `${domainContext}:8080/producto/anadirProductoCarro?` + new URLSearchParams({
                                        idProducto: id,
                                        idUsuario: userCookie.get("idUsuario"),
                                        cantidad: 1,
                                    });

                                    fetch(url, content)
                                        .then(response => {response.json()})
                                        .then((res) => alert("Producto agregado al carrito"));
                                }} tamano={"pequeno"} estilo={"neutro"} width={"w-min"}>
                                    <span className={"material-symbols-rounded icon text-sm"}>shopping_cart</span>
                                </PrimaryButton>
                                <PrimaryButton onClick={null} tamano={"pequeno"} estilo={"neutro"} width={"w-min"}>
                                    <span className={"material-symbols-rounded icon text-sm"}>playlist_add</span>
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                    <div className={"flex px-8 py-4 flex-col gap-8"}>
                        <h4>
                            Más de este producto
                        </h4>
                        <div className={"flex gap-8 flex-col w-1/2"}>
                            <h4>
                                Características
                            </h4>
                            <div className={"grid grid-cols-2 gap-6"}>
                                <div className={"flex bg-g-300 rounded-md flex-col gap-3"}>
                                    <div className={"flex justify-around py-3"}>
                                        <p>DJKAHJDK</p>
                                        <p>sisisiis</p>
                                    </div>
                                    <div className={"flex justify-around py-3"}>
                                        <p>DJKAHJDK</p>
                                        <p>sisisiis</p>
                                    </div>
                                    <div className={"flex justify-around py-3"}>
                                        <p>DJKAHJDK</p>
                                        <p>sisisiis</p>
                                    </div>
                                    <div className={"flex justify-around py-3"}>
                                        <p>DJKAHJDK</p>
                                        <p>sisisiis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className={"flex flex-col px-8 py-4 gap-4 w-full"}>
                        <h4>
                            Preguntas
                        </h4>
                        <div className={"flex gap-4 w-full items-end"}>
                            <Input width={"w-full"} label={"¿Tienes alguna duda?"} response={setPregunta}
                                   required={false} validate={false} maxLength={"500"}>
                                Realiza una pregunta al vendedor
                            </Input>
                            <PrimaryButton onClick={enviarPregunta} tamano={"normal"} estilo={"primary"} width={"w-min"}>
                                Preguntar
                            </PrimaryButton>
                        </div>
                        <div>
                            <h5>
                                Preguntas realizadas
                            </h5>
                            <div>

                            </div>
                        </div>
                    </div> */ }

                </div>
                :
                <div className={"flex flex-col items-center gap-8 h-full py-64 "}>
                    <h1 className={"text-er-600"}>¡Error 404!</h1>
                    <h2 className={"text-p-600"}>Oooops...</h2>
                    <p className={"text-xl font-semibold"}>Parece que no encontramos tu producto...</p>
                    <p className={"text-xl"}>Intenta <Link to={""} className={"link"}>buscar otro producto</Link></p>
                </div>
        }
    <Footer/>
        </>
    );
}