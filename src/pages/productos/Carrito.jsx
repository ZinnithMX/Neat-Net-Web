import Header from "../../components/Header/Header";
import ProductoCarrito from "../../components/Producto/ProductoCarrito";
import {useContext, useEffect, useState} from "react";
import {Cookies, useCookies} from "react-cookie";
import {DomainContext} from "../../App.jsx";


export default function Carrito() {

    const[subtotal, setSubtotal] = useState(0);
    const[adicionales, setAdicionales] = useState(0);
    const[total, setTotal] = useState(0);
    const[enviado, setEnviado] = useState(0);
    const[productosChanged, setProductosChanged] = useState(0);
    const userCookies = new Cookies();


    const handleImage= (caracteristicas) => {
        let valor = null;
        caracteristicas.forEach((item) => {
            if(item.tipoCaracteristica === "IMAGEN") {
                valor = item.valor;
            }
        });

        return valor;
    }

    const importarProductos = () => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU");

        const requestOptions = {
            method: "GET",
            headers: headers
        }
        const finalDomain = `${domain}:8080/producto/obtenerCarrito?` + new URLSearchParams({
            idUsuario: userCookie.get("idUsuario")
        })

        fetch(finalDomain, requestOptions)
            .then(response => response.json())
            .then((data) => {
                // console.log(data);
                let productos = [];
                let sumaSubtotal = 0;
                data.map((item) => {

                    let productoActual = item.producto;
                    productoActual.cantidad = item.cantidad;
                    productoActual.sub = productoActual.precio * productoActual.cantidad;
                    sumaSubtotal += productoActual.sub;
                    productos.push(productoActual);
                })
                setProductos(productos);
                setSubtotal(sumaSubtotal);
                setAdicionales(sumaSubtotal*0.16);
                setTotal(sumaSubtotal + adicionales);
            });

    }
    const userCookie = new Cookies();
    const domain = useContext(DomainContext);

    const [productos, setProductos] = useState([]);
    useEffect(() => {
        importarProductos();

    }, [productos.length, productosChanged]);


    return<>
        <Header/>
        <h3 className={"m-6"}> Tu carrito de compras</h3>
        {
            productos.length !== 0 && <div className={"flex"}>
                    <div className={"w-[70vw]"}>


                        {productos.map((producto) => <div className={"mb-5"} key={producto.id}>

                            <ProductoCarrito
                                producto={producto}
                                changed={setProductosChanged}
                                idProducto={producto.idProducto}
                                idUsuario={userCookie.get("idUsuario")}
                                vendedor={producto.vendedor.nombreEmpresa}
                                imagen={handleImage(producto.caracteristicas)}
                                importarProducto={importarProductos}/>
                            </div>)}


                    </div>

                    <div className="ml-[3vw] w-[25vw] h-fit bg-g-200 p-8 rounded-xl">
                        <h4>Resumen de importe</h4>
                        <h5 className={"my-5"}>Productos: </h5>
                        {
                            productos.map((producto) => <>
                                    <div className={"grid grid-cols-2 gap-4"}>
                                        <span className={"text-lg"}>{producto.titulo}</span>
                                        <span
                                            className={"text-lg justify-end text-right"}>$ {producto.precio * producto.cantidad}</span>
                                    </div>
                                </>)
                        }

                        <h5 className={"mt-8"}> Subtotal: $ {subtotal}</h5>

                        <h5 className={"mt-8"}> Adicionales: </h5>

                        <div className={"grid grid-cols-2 mt-3"}>
                            <span className={"text-lg"}>IVA:</span>
                            <span className={"text-lg justify-end text-right"}>$ {adicionales} </span>
                            <span className={"text-lg"}>Costo de envio: </span>
                            <span className={"text-lg justify-end text-right"}>$ {0}</span>
                        </div>


                        <h4 className={"mt-5"}>Total: $ {subtotal + adicionales}</h4>
                    </div>


                </div>

        }

        {
            productos.length === 0 && <>
                    <div className="text-center mt-[20vh]">
                        <span className={"material-symbols-rounded text-[20rem] text-p-500"}>shopping_cart_off</span>
                        <h3>No tienes productos en tu carrito de compras</h3>
                    </div>

                </>
        }
    </>
}