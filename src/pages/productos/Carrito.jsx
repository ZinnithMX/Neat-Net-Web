import Header from "../../components/Header/Header";
import ProductoCarrito from "../../components/Producto/ProductoCarrito";
import {useContext, useEffect, useState} from "react";
import {Cookies, useCookies} from "react-cookie";
import {DomainContext} from "../../App.jsx";


export default function Carrito() {

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
                setProductos(data);
            })
    }
    const userCookie = new Cookies();
    const domain = useContext(DomainContext);
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        importarProductos();
    }, []);

    return(
        <>
            <Header/>
            <h3 className={"m-6"}> Tu carrito de compras</h3>
            {
                (productos.length !== 0) && productos.map((producto) => (

                    <ProductoCarrito
                        idProducto={producto.idProducto}
                        nombre={producto.titulo}
                        vendedor={"N/A"}
                        precio={producto.precio}
                        imagen={handleImage(producto.caracteristicas)}
                        importarProducto={importarProductos}/>
                ))

            }

            {
                (productos.length === 0) && (
                    <>
                        <div className="text-center mt-[20vh]">
                            <span className={"material-symbols-rounded text-[20rem] text-p-500"}>shopping_cart_off</span>
                            <h3>No tienes productos en tu carrito de compras</h3>
                        </div>

                    </>
                )
            }
        </>
    )
}