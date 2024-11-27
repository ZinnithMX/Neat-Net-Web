import {Link} from "react-router-dom";
import CategorySelector from "../CategorySelector/CategorySelector.jsx";
import NumerInput from "../Input/NumberInput/NumberInput.jsx";
import {useState} from "react";
import PrimaryButton from "../Button/PrimaryButton.jsx";
import PropTypes from "prop-types";


export default function ProductoCarrito(props) {

    const [cantidad, setCantidad] = useState({error: true, value: 0});


    return(
        <div className={"flex items-center gap-6 p-4 rounded-xl bg-g-200"}>
            <img
                src={props.image}
                className={"size-40 rounded-xl"}/>
            <div className={"flex gap-4 flex-1"}>
                <div className={"flex flex-col gap-3 flex-1"}>
                    <div className={"flex flex-col gap-1 flex-1"}>
                        <h5>{props.nombre}</h5>
                        <div className={"flex gap-1"}>
                            <p>
                                Vendedor
                            </p>
                            <p>
                                <Link to={""} className={"link"}>
                                    {props.vendedor}
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className={"flex gap-2 items-center flex-1 overflow-x-auto overflow-y-hidden"}>
                        <CategorySelector title={""} response={null} tamano={"pequeno"} width={"w-40"}>
                            <option>Opcion 1</option>
                            <option>Opcion 2</option>
                        </CategorySelector>
                        <CategorySelector title={""} response={null} tamano={"pequeno"} width={"w-40"}>
                            <option>Opcion 1</option>
                            <option>Opcion 2</option>
                        </CategorySelector>
                        <CategorySelector title={""} response={null} tamano={"pequeno"} width={"w-40"}>
                            <option>Opcion 1</option>
                            <option>Opcion 2</option>
                        </CategorySelector>

                    </div>
                </div>
                <div className={"w-40 gap-2 flex flex-col"}>
                    <p className={"text-lg font-bold"}>${props.precio}</p>
                    <NumerInput response={setCantidad} tamano={"pequeno"} width={"w-full"}/>
                    <PrimaryButton onClick={null} tamano={"pequeno"} estilo={"error"} width={"w-full"}>
                        <span className={"material-symbols-rounded icon text-sm"}>delete</span>
                        Eliminar
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}

ProductoCarrito.propTypes = {

    image: PropTypes.string,
    nombre: PropTypes.string,
    vendedor: PropTypes.string,
    precio: PropTypes.decimal

}