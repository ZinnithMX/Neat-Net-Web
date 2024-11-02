import PropTypes from "prop-types";
import {useCallback, useEffect, useState} from "react";

export default function Password(props){

    const [estiloInput, setEstiloInput] = useState("");
    const [estiloMsg, setEstiloMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");
    const [estado, setEstado] = useState("");
    const [icono, setIcono] = useState("visibility")
    const [inputType, setInputType] = useState("password");
    const mayusExp = new RegExp(/(?=.*[a-z])+(?=.*[A-Z].*[A-Z])/);
    const simbolosExp = new RegExp(/(?=.*[!@#$%^&*].*[!@#$%^&*])/);
    const numExp = new RegExp(/(?=.*[1-9].*[1-9])/)

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
                if(props.tipo === "registro"){
                    if(value.length >= 8){
                        if(mayusExp.test(value)){
                            if(simbolosExp.test(value)){
                                if(numExp.test(value)){
                                    setShowMsg(false);
                                    setMsg("");
                                    setEstado("default");
                                    props.response({
                                        error: false,
                                        value: value
                                    });
                                }
                                else{
                                    setShowMsg(true);
                                    setMsg("Debe tener al menos dos números");
                                    setEstado("error");
                                    props.response({
                                        error: true,
                                        value: value
                                    });
                                }
                            }
                            else{
                                setShowMsg(true);
                                setMsg("Debe tener al menos dos de los siguientes simbolos: !@#$%^&*");
                                setEstado("error");
                                props.response({
                                    error: true,
                                    value: value
                                });
                            }
                        }
                        else{
                            setShowMsg(true);
                            setMsg("Debe de haber al menos dos mayúsculas y una minúscula");
                            setEstado("error");
                            props.response({
                                error: true,
                                value: value
                            });
                        }
                    }else{
                        setShowMsg(true);
                        setMsg("La contraseña debe tener al menos 8 caracteres");
                        setEstado("error");
                        props.response({
                            error: true,
                            value: value
                        });
                    }
                }
                else if(props.tipo === "confirmacion"){
                    if(value === props.verificar) {
                        setShowMsg(false);
                        setMsg("");
                        setEstado("default");
                        props.response({
                            error: false,
                            value: value
                        });
                    }
                    else{
                        setShowMsg(true);
                        setMsg("Las contraseñas no coinciden");
                        setEstado("error");
                        props.response({
                            error: false,
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

    }, [props.required, props.tipo, props.verificar]);


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

    async function changeIcon() {
        if (icono === "visibility") {
            setIcono("visibility_off");
            setInputType("text");
        } else {
            setIcono("visibility");
            setInputType("password");
        }
    }

    return(
        <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row justify-between"}>
                <label className={"text-xl text-n-700"}>{props.label}</label>
                {props.required && <span className={"material-symbols-rounded text-er-600 text-xl"}>asterisk</span>}
            </div>
            <div className={"flex flex-col items-end h-[52px]"}>
                <input
                    type={inputType}
                    placeholder={props.children}
                    maxLength={20}
                    disabled={props.deshabilitado}
                    onChange={handleInput}
                    className={estiloInput}
                />
                <span className={"text-n-200 material-symbols-rounded cursor-pointer relative overflow-visible right-3 text-lg bottom-10"}
                      onClick={changeIcon}>{icono}</span>
            </div>
            {showMsg && <p className={estiloMsg}>{msg}</p>}
        </div>
    )
}

Password.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    required: PropTypes.bool.isRequired,
    deshabilitado: PropTypes.bool.isRequired,
    tipo: PropTypes.string.isRequired,
    response: PropTypes.func.isRequired,
    verificar: PropTypes.string
}