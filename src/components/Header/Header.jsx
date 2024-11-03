import Input from "../Input/Input.jsx";
import {useState} from "react";

export default function Header() {
    return (
        <header className="w-full h-16">
            <div className="flex flex-row w-full items-center justify-between">
                <div className="text-p-600 w-1/4"><h4>Neat Net</h4></div>
                <div className="w-1/2">
                    <Input required={false} deshabilitado={false} validate={false} response={false}>Buscar producto</Input>
                </div>
                <div className="flex justify-end w-1/4">
                    <div>I1</div>
                    <div>I2</div>
                    <div>I3</div>
                    <div>I4</div>
                </div>
            </div>
        </header>
    )
}
