import Input from "../Input/Input.jsx";
import {useState} from "react";

export default function Header() {
    return (
        <header className="w-full h-16">
            <div className="flex flex-row w-full items-center justify-between pl-6 pr-6">
                <div className="text-p-600 w-1/4"><h4>Neat Net</h4></div>
                <div className="w-1/2">
                    <Input required={false} deshabilitado={false} validate={false} response={false}>Buscar
                        producto</Input>
                </div>
                <div className="flex justify-end w-1/4 gap-4">
                    <span className={"material-symbols-rounded icon text-n-200"}>shopping_cart</span>
                    <span className={"material-symbols-rounded icon text-n-200"}>list</span>
                    <span className={"material-symbols-rounded icon text-n-200"}>notifications</span>
                    <span className={"material-symbols-rounded icon text-n-200"}>account_circle</span>
                </div>
            </div>
        </header>
    )
}
