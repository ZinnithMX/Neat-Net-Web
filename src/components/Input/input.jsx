import React from 'react';
import {useState, useCallback} from 'react';

export default function Input(props, {children}){

    const [cumple, setCumple] = useState(true);
    const [errorcito, setError] = useState("");

    const handleInput = useCallback((event) => {
        const newCampo = event.target.value;

        if(props.validacion) {
            const regex = props.regex;
            if (props.required){
                if (newCampo.trim() === '' && props.required) {
                    setError("El campo no puede estar vacio");
                    setCumple(false);
                    props.setCumple(false)
                    return;
                }
            }
            if (!regex.test(newCampo)) {
                setError("Campo no valido");
                console.log("Campo no valido")
                setCumple(false);
                props.contenido("");
                return;
            } else {
                setError("");
                setCumple(true);
                props.contenido(newCampo.trim());
                return;
            }
        }

        if(props.required && !props.validacion){
            if (newCampo.trim() === '' && props.required) {
                setError("El campo no debe de estar vacio");
                setCumple(false);
                props.setCumple(false)
                return;
            }else{
                setCumple(true);
                props.contenido(newCampo.trim());
                return;
            }
        }

    }, [props.EmailError]);

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex flex-row w-full">
                    <label className="w-full text-xl">{props.label}</label>
                    {props.required &&
                        <span class="material-symbols-rounded text-xl text-er-600">
                            asterisk    
                        </span>
                    }
                </div>
                <input type={props.type} placeholder={children} onChange={handleInput} className="flex p-3 gap-2 text-base bg-g-300 rounded-lg"/>
                {!cumple && <h6 className="text-er-600 font-normal">{errorcito}</h6>}
            </div>
        </>
    )
}