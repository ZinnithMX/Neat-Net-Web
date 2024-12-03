import HeaderVendedor from "../../components/Header/HeaderVendedor.jsx";
import Input from "../../components/Input/Input.jsx";
import {useContext, useState} from "react";
import NumerInput from "../../components/Input/NumberInput/NumberInput.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";
import FileInput from "../../components/Input/FileInput/FileInput.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import {DomainContext} from "../../App.jsx";
import axios from "axios";


export default function PublicarProducto() {

    const [nombreProducto, setNombreProducto] = useState(null);
    const [precioProducto, setPrecioProducto] = useState(null);
    const [descripcionProducto, setDescripcionProducto] = useState(null);
    const [imagenProducto, setImagenProducto] = useState(null);
    const Domain = useContext(DomainContext);

    async function publicarProducto(){
        const myHeaders = new Headers();
        const encodedCredentials = btoa(`${Form.correo}:${Form.contrasenia}`);
        myHeaders.append("Authorization", `Basic ${encodedCredentials}`);
        myHeaders.append("Content-Type", `application/json`);

        axios.post(Domain + "/api/vendedor/productos", {
            "file": imagenProducto,
            "producto": {
                "titulo": nombreProducto,
                "precio": precioProducto,
                "caracteristicas": [{
                    "tipoCaracteristica": "DESCRIPCION",
                    "valor": descripcionProducto
                }]
            }
        }, {headers: myHeaders}).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <HeaderVendedor />
            <div className={"py-6 px-8 flex flex-col gap-8"}>
                <h3>
                    Publicar un nuevo producto
                </h3>
                <form className={"flex flex-col gap-6"}>
                    <h4>
                        Informacion general del producto
                    </h4>
                    <div className={"flex flex-col gap-4"}>
                        <Input label={"Nombre del producto"} required={true} response={setNombreProducto} width={""} maxLength={100}>
                            Nombre que se mostrará
                        </Input>
                        <div className={"flex flex-col gap-2"}>
                            <label className={"text-xl text-n-700"}>Precio del producto</label>
                            <NumerInput response={setPrecioProducto} tamano={"normal"} width={""}/>
                        </div>
                        <TextArea response={descripcionProducto} width={""} label={"Descripción del producto"} showLabel={true} required={true}>
                            Descripción del producto en general
                        </TextArea>
                        <div className={"flex flex-col gap-2"}>
                            <FileInput fileExtensions={".png, .jpeg, .jpg"} setImage={setImagenProducto} required={true}
                                       label={"Imagen del producto"}/>
                            {imagenProducto && <img src={URL.createObjectURL(imagenProducto)} alt={"Imagen del producto"} className={"w-1/4"}/>}
                        </div>
                    </div>
                    <PrimaryButton onClick={publicarProducto} tamano={"normal"} estilo={"primary"} width={""}>
                        Publicar producto
                    </PrimaryButton>
                </form>
            </div>
        </>
    )
}