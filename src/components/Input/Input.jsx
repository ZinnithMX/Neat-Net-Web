import PropTypes from "prop-types";
import {useCallback, useEffect, useState} from "react";

export default function Input(props){

    const [estiloInput, setEstiloInput] = useState("");
    const [estiloMsg, setEstiloMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [estado, setEstado] = useState(props.estado);

    const handleInput = useCallback((e) => {

        const value = e.target.value;

        if(props.required){
            if(value.trim() === ""){
                setShowMsg(true);
                setMsg("Este campo es obligatorio");
                setEstado("error");
                props.response({
                    error: true,
                    value: value
                });
            }else{
                if(props.validate){
                    if(props.regex.test(value)){
                        setShowMsg(false);
                        setMsg("");
                        setEstado("default");
                        props.response({
                            error: false,
                            value: value
                        });
                    }else{
                        setShowMsg(true);
                        setMsg("El formato no es correcto");
                        setEstado("error");
                        props.response({
                            error: true,
                            value: value
                        });
                    }
                }
                else{
                    setShowMsg(false);
                    setMsg("");
                    setEstado("default");
                    props.response({
                        error: false,
                        value: value
                    });
                }
            }
        }else{
            setShowMsg(false);
            setMsg("");
            setEstado("default");
            props.response({
                error: false,
                value: value
            });
        }

    }, [props.required, props.validate, props.regex]);


    useEffect(() => {
        switch (estado) {
            default:
                setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-200 text-n-600 focus:outline-n-200 text-lg");
                setEstiloMsg("text-sm font-light text-n-700")
                break;
            case "default":
                setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-200 text-n-600 focus:outline-n-200 text-lg");
                setEstiloMsg("text-sm font-light text-n-700")
                break;
            case "error":
                setEstiloInput("w-full p-3 rounded-lg bg-er-50 placeholder:text-er-700 text-er-700 focus:outline-er-600 text-lg");
                setEstiloMsg("text-sm font-light text-er-700")
                break;
            case "advertencia":
                setEstiloInput("w-full p-3 rounded-lg bg-a-50 placeholder:text-a-700 text-a-700 focus:outline-a-700 text-lg");
                setEstiloMsg("text-sm font-light text-a-700")
                break;
            case "deshabilitado":
                setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-100 text-n-100 focus:outline-g-700 text-lg cursor-not-allowed");
                setEstiloMsg("text-sm font-light text-ex-700")
                break;
        }
    }, [estado]);

    useEffect(() => {
        if(props.deshabilitado){
            setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-100 text-n-100 focus:outline-g-700 text-lg cursor-not-allowed");
        }else{
            setEstiloInput("w-full p-3 rounded-lg bg-g-300 placeholder:text-n-200 text-n-600 focus:outline-n-200 text-lg");
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
    deshabilitado: PropTypes.bool.isRequired,
    regex: PropTypes.shape(RegExp),
    validate: PropTypes.bool.isRequired,
    response: PropTypes.func.isRequired
}