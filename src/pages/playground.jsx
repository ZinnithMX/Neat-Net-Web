import CategorySelector from "../components/CategorySelector/CategorySelector.jsx";
import {useState} from "react";


export default function Playground(){

    const [opc, setOpc] = useState({error: true, value:""});

    return (
            <div className="flex flex-row h-dvh">
                <div className="w-1/2 h-full p-10">
                    <CategorySelector title={"Categoria 1"} response={setOpc}>
                        <option>Opcion 1</option>
                        <option>Opcion 2</option>
                    </CategorySelector>
                </div>
            </div>
    )
}