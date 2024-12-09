import HeaderVendedor from "../../components/Header/HeaderVendedor.jsx";
import Input from "../../components/Input/Input.jsx";
import {useContext, useState} from "react";
import NumerInput from "../../components/Input/NumberInput/NumberInput.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";
import FileInput from "../../components/Input/FileInput/FileInput.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";
import {DomainContext} from "../../App.jsx";
import {Cookies} from "react-cookie";
export default function PublicarProducto() {

    const [nombreProducto, setNombreProducto] = useState(null);
    const [precioProducto, setPrecioProducto] = useState(null);
    const [descripcionProducto, setDescripcionProducto] = useState(null);
    const [imagenProducto, setImagenProducto] = useState(null);

    const Domain = useContext(DomainContext);
    const userCookies = new Cookies();

        async function publicarProducto(){
        const myHeaders = new Headers();

        myHeaders.append("Authorization", "Basic SW5ncmVzbzp2aXNpdGFudGU=");

        const formdata = new FormData();

        formdata.append("file", imagenProducto, JSON.stringify({
            "titulo": nombreProducto.value,
            "precio": precioProducto,
            "caracteristicas": [{
                "tipoCaracteristica": "DESCRIPCION",
                "valor": descripcionProducto.value
            }]
        }));

        const requestData = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow",
        }
        fetch(Domain + ":8080/producto/agregar?" + new URLSearchParams({
            idVendedor: userCookies.get("idVendedor"),
        }), requestData).then((res) => {res.json()}).then(
            (data) =>{ 
                console.log(data)
                window.alert("Producto publicado")
            }).catch((err) => console.log(err));
    }

    return (
        <>
            <HeaderVendedor />
            <div className={"py-6 px-8 flex flex-col gap-8"}>
                <h3>
                    Publicar un nuevo producto
                </h3>
                <div className={"flex flex-col gap-6"}>
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
                        <TextArea response={setDescripcionProducto} width={""} label={"Descripción del producto"}
                                  showLabel={true} required={true}>
                            Descripción del producto en general
                        </TextArea>
                        <div className={"flex flex-col gap-2"}>
                            <FileInput fileExtensions={".jpg, .png"} setImage={setImagenProducto} required={true}
                                       label={"Imagen del producto"}/>
                            {imagenProducto && <img src={URL.createObjectURL(imagenProducto)} alt={"Imagen del producto"} className={"w-1/4"}/>}
                        </div>
                    </div>
                    <PrimaryButton onClick={publicarProducto} tamano={"normal"} estilo={"primary"} width={""}>
                        Publicar producto
                    </PrimaryButton>
                </div>
            </div>
        </>
    )
}