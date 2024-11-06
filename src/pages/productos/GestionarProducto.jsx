import Header from "../../components/Header/Header.jsx";
import Input from "../../components/Input/Input.jsx";
import PrimaryButton from "../../components/Button/PrimaryButton.jsx";

export default function GestionarProducto(){
    return(
        <>
            <Header></Header>
            <div className={"px-8 py-12"}>
                <h4 className={"font-bold"}>Tus productos</h4>
                <div className={"flex flex-col"}>
                    <Input label={""} response={null}>Buscar producto</Input>
                </div>
            </div>
        </>
    );
}