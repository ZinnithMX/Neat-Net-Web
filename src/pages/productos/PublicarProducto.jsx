import HeaderVendedor from "../../components/Header/HeaderVendedor.jsx";
import Input from "../../components/Input/Input.jsx";
import {useState} from "react";
import NumerInput from "../../components/Input/NumberInput/NumberInput.jsx";
import TextArea from "../../components/TextArea/TextArea.jsx";


export default function PublicarProducto() {

    const [nombreProducto, setNombreProducto] = useState(null);
    const [precioProducto, setPrecioProducto] = useState(null);
    const [descripcionProducto, setDescripcionProducto] = useState(null);

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
                        <TextArea response={descripcionProducto} width={""} label={"Descripción del producto"} showLabel={true} required={true}>
                            Descripción del producto en general
                        </TextArea>
                        <div className={"flex flex-col gap-2"}>
                            <label className={"text-xl text-n-700"}>Imagen del producto</label>
                            <input type={"file"} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}