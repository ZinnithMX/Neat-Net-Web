import PropTypes from "prop-types";
import {useCallback, useState} from "react";


export default function TextArea(props){

    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const handleInput = useCallback((e) => {

        const value = e.target.value;

        if(props.required){
            if(value.trim() === ""){
                setShowMsg(true);
                setMsg("Este campo es obligatorio");
                props.response({
                    error: true,
                    value: value
                });
            }else{
                props.response({
                    error: false,
                    value: value
                });
            }
        }else{
            props.response({
                error: false,
                value: value
            });
        }

    },[props]);

    return (
        <div className={"flex flex-col gap-2 " + props.width}>
            {props.showLabel &&
                <div className={"flex flex-row justify-between"}>
                    <label className={"text-xl text-n-700"}>{props.label}</label>
                    {props.required && <span className={"material-symbols-rounded text-er-600 text-xl"}>asterisk</span>}
                </div>
            }
            <textarea
                placeholder={props.children}
                maxLength={props.maxLength}
                disabled={props.deshabilitado}
                onChange={handleInput}
                className={"p-3 rounded-lg text-lg bg-g-300 placeholder:text-n-200 focus:outline-n-200 text-n-600"}
            />
            {showMsg && <p className={"text-sm font-light text-er-700"}>{msg}</p>}
        </div>
    )
}

TextArea.propTypes = {
    response: PropTypes.func.isRequired,
    width: PropTypes.string,
    children: PropTypes.string.isRequired,
    deshabilitado: PropTypes.bool,
    label: PropTypes.string,
    showLabel: PropTypes.bool,
    required: PropTypes.bool,
    maxLength: PropTypes.number,
}