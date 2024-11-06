import {Link, useParams} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import Rating from "../../components/Rating/Rating.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Input from "../../components/Input/Input.jsx";


export default function VerProducto() {

    const {id} = useParams();
    const [encontrado, setEncontrado] = useState(false);
    const [producto, setProducto] = useState({});
    const [descripcion, setDescripcion] = useState("");
    const [image, setImage] = useState(null);
    const [pregunta, setPregunta] = useState("");

    async function enviarPregunta(){

    }


    useEffect(() => {
        console.log("Ingreso al useEffectt")
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
                    alert("Imagen exitosaaa")
                    setImage(URL.createObjectURL(blob));
                } else {
                    setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS08JbeYZ8ccPOp4Su1QuQ6xJueP1D-0XFYgA&s")
                }
            }
        }

         try{
             let url = `http://localhost:8080/producto/obtenerPorId?idProducto=${id}`
             fetch(url, {
                 method: "GET",
                 headers: {}
             }).then(res => res.json()).then(data => {
                 setProducto(data.producto);
                 setDescripcion(data.producto.caracteristicas[0].valor)
                 fetchImage(producto.caracteristicas[1].valor)
             })
         }
         catch (e) {
             if(e.response.status === 400){
                 setEncontrado(false);
             }
         }
        setEncontrado(true);
        setProducto({
            titulo: "Productito",
            precio: 200.30,
            disponibilidad: true,
            puntuacion: 0.1,
            descuento: 0.20,
            vendedor: {
                NombreEmpresa: "Vendedorazo",
                id: "empresita"
            },
            caracteristicas: {
                descripcion: "Lorem ipsum odor amet, consectetuer adipiscing elit. Mus cubilia quam malesuada tortor lacinia cras. Rutrum purus vitae non aenean conubia leo aliquet ante. Habitant ac tristique, molestie varius sollicitudin quam ad interdum. Sociosqu aliquam libero lacus porttitor suspendisse. Suspendisse finibus nunc faucibus, fermentum conubia vestibulum. In ante sodales nulla fermentum, venenatis luctus mi sociosqu. Faucibus pharetra hac ut porttitor suspendisse. Bibendum fames mi congue etiam at porttitor.\n" +
                    "\n" +
                    "Erat tincidunt inceptos maximus fusce ut tortor. Natoque potenti ultrices amet; bibendum ac morbi nascetur. Maximus porttitor dignissim taciti ligula rhoncus vestibulum. Diam magnis etiam feugiat efficitur dui facilisi enim netus. Convallis vel hendrerit mi mauris ridiculus. Felis sed consectetur phasellus facilisi dui varius mi. Phasellus rutrum tempus montes imperdiet habitant. Eros duis suspendisse pellentesque sed, donec semper efficitur. Aliquet donec augue facilisis iaculis etiam parturient?\n" +
                    "\n" +
                    "Molestie est nibh gravida rutrum nisl. Euismod parturient natoque primis vivamus elit nam ante ad. Aodio mollis porta luctus inceptos etiam. Ante habitant sagittis bibendum quis elit venenatis. Nec sodales inceptos fames volutpat mus efficitur magnis. Dis netus enim efficitur vestibulum pulvinar tincidunt nullam pharetra magna.\n" +
                    "\n" +
                    "Odio malesuada cras posuere justo parturient congue scelerisque rutrum netus. Turpis torquent sem per varius; taciti scelerisque fermentum nec. Diam porttitor duis, natoque egestas facilisi mauris gravida maecenas sagittis. Pharetra litora quisque fermentum; efficitur mollis blandit vel libero dolor. Fringilla magnis inceptos ridiculus curabitur porttitor semper; scelerisque congue. Ullamcorper cursus consectetur arcu conubia ornare litora.\n" +
                    "\n" +
                    "Senectus mus mauris justo nisl maecenas torquent. Euismod in aliquam placerat cursus ut semper mollis enim. Lacus nec neque vel fames inceptos. Efficitur ut mauris lacus senectus mattis commodo efficitur eget. Rutrum laoreet dapibus lectus malesuada suscipit condimentum feugiat metus. Ultrices sed nostra nisi scelerisque fermentum amet faucibus. Nisi euismod maximus fringilla ante; tellus posuere ultrices. Odio maecenas sed viverra; tempus primis ex scelerisque.",
                caracteristicas: {
                    categoria: "",
                    caracteristicas: {
                        color: "rojo",
                        peso: 200
                    }
                }
            }

        })
    }, []);

    return(
        <>
            <Header/>
            {encontrado ?
                <div className={"flex flex-col"}>
                    <div className={"flex py-8 px-6 items-center gap-8"}>
                        <div className={"w-full flex flex-col py-8 px-6 gap-16"}>
                            <img src={image} className={"rounded-2xl"} />
                        </div>
                        <div className={"w-full flex py-2 px-4 flex-col gap-4"}>
                            <h3>{producto.titulo}</h3>
                            <div className={"flex justify-between items-center w-full"}>
                                <Rating rating={producto.puntuacion}/>
                                {
                                //    <p>Vendido por: <Link className={"link-secondary"}
                                //                       to={""}>{producto.vendedor.NombreEmpresa}</Link></p>
                                }
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
                                <PrimaryButton onClick={null} tamano={"pequeno"} estilo={"neutro"} width={"w-min"}>
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