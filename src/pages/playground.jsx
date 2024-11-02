import CategorySelector from "../components/CategorySelector/CategorySelector.jsx";
import {useEffect, useState} from "react";
import NumerInput from "../components/Input/NumberInput/NumberInput.jsx";


export default function Playground(){

    const [opc, setOpc] = useState({error: true, value:""});
    const [number, setNumber] = useState({error: true, value:0});

    useEffect(() => {
        console.log(opc);
        console.log(number);
    }, [opc, number]);

    return (
            <div className="flex flex-row h-dvh">
                <div className="w-1/2 h-full p-10 gap-4 flex flex-col">
                    <CategorySelector title={"Categoria 1"} response={setOpc}>
                        <option>Opcion 1</option>
                        <option>Opcion 2</option>
                    </CategorySelector>
                    <NumerInput response={setNumber}/>
                </div>
            </div>
    )
}