import PropTypes from "prop-types";
import {useCallback, useEffect, useState} from "react";

export default function Input(props){

    const [estiloInput, setEstiloInput] = useState("");
    const [estiloMsg, setEstiloMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [estado, setEstado] = useState(props.estado);
    const [inputValue, setInputValue] = useState("");

    const handleInput = useCallback((e) => {
        setInputValue(e.target.value);

        if(props.required){
            if(e.target.value.trim() === ""){
                setShowMsg(true);
                setMsg("Este campo es obligatorio");
                setEstado("error");
                console.log("Input vacio");
            }else{
                setShowMsg(false);
                setMsg("");
                setEstado("default");
            }
        }

    }, [props.required]);


    useEffect(() => {
        switch (estado) {
            default:
                setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-200 text-n-600 focus:outline-p-600 text-lg");
                break;
            case "default":
                setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-200 text-n-600 focus:outline-p-600 text-lg");
                break;
            case "error":
                setEstiloInput("w-full p-3 rounded-lg bg-er-50 placeholder:text-er-700 text-er-700 focus:outline-er-600 text-lg");
                break;
            case "advertencia":
                setEstiloInput("w-full p-3 rounded-lg bg-a-50 placeholder:text-a-700 text-a-700 focus:outline-a-700 text-lg");
                break;
            case "deshabilitado":
                setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-100 text-n-100 focus:outline-g-700 text-lg cursor-not-allowed");
                break;
        }
    }, [estado]);

    useEffect(() => {
        if(props.deshabilitado){
            setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-100 text-n-100 focus:outline-g-700 text-lg cursor-not-allowed");
        }else{
            setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-200 text-n-600 focus:outline-p-600 text-lg");
        }
    }, [props.deshabilitado]);



    return(
        <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row justify-between"}>
                <label className={"text-xl text-n-700"}>{props.label}</label>
                {props.required && <span className={"material-symbols-rounded text-er-600 text-xl"}>asterisk</span>}
            </div>
            <input
                type={"text"}
                placeholder={props.children}
                maxLength={props.maxLength}
                disabled={props.deshabilitado}
                onChange={handleInput}
                value={inputValue}
                className={estiloInput}
            />
            {showMsg && <p className={estiloMsg}>{msg}</p>}
        </div>
    )
}

Input.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    estado: PropTypes.string,
    maxLength: PropTypes.number,
    deshabilitado: PropTypes.bool.isRequired
}