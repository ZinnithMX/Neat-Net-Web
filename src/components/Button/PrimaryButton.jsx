import PropTypes from "prop-types";
import {useEffect, useState} from "react";


export default function PrimaryButton(props){

    const [bgColor, setBgColor] = useState("p-600");
    const [padding, setPadding] = useState("px-4 py-3.5");
    const [textSize, setTextSize] = useState("text-lg");
    const [tamano, setTamano] = useState("h-12");
    const [bgActive, setBgActive] = useState("p-700");
    const [estilo, setEstilo] = useState(props.estilo);
    const [desabilitado, setDesabilitado] = useState(props.disabled);

    useEffect(() => {
        switch (props.tamano) {
            case "normal": {
                setPadding("px-4 py-3.5");
                setTextSize("text-lg");
                setTamano("h-12");
                break;
            }
            default: {
                setPadding("px-4 py-3.5");
                setTextSize("text-lg");
                setTamano("h-12");
                break;
            }
            case "pequeno":{
                setPadding("p-3");
                setTextSize("text-xs");
                setTamano("h-10");
                break;
            }
            case "mini": {
                setPadding("px-3 py-2");
                setTextSize("text-xs");
                setTamano("h-8");
                break;
            }

        }
    }, [props.tamano]);

    useEffect(() => {
        if(desabilitado){
            console.log("Deshabilitado1");
            setEstilo("deshabilitado");
        }
        else{
            setEstilo(props.estilo);
        }
    }, [desabilitado]);

    useEffect(() => {
        setDesabilitado(props.disabled);
    }, [props.disabled]);

    useEffect(() => {
        switch (estilo){
            default:{
                setBgColor("p-600");
                setBgActive("p-700");
                break;
            }
            case "primary":{
                setBgColor("p-600");
                setBgActive("p-700");
                break;
            }
            case "secondary":{
                setBgColor("s-600");
                setBgActive("s-700");
                break;
            }
            case "neutro":{
                setBgColor("n-400");
                setBgActive("n-600")
                break;
            }
            case "error":{
                setBgColor("er-600");
                setBgActive("er-700");
                break;
            }
            case "deshabilitado":{
                setBgColor("n-100");
                setBgActive("n-100");
                break;
            }
            case "advertencia":{
                setBgColor("a-600");
                setBgActive("a-700");
                break;
            }
        }
    }, [estilo]);

    useEffect(() => {
        setEstilo(props.estilo)
    }, [props.estilo]);

    return(
      <>
        <button className={"bg-" +  bgColor + " " + padding + " " + textSize + " " + tamano + " " + "flex gap-2 " +
            "rounded-md font-semibold text-g-50 items-center justify-between flex-row cursor-pointer "+
            "active:bg-" + bgActive + " active:shadow-none hover:shadow-lg hover:shadow-" + bgColor + "/40" }
            onClick={props.onClick}
            type={"button"}
            disabled={props.disabled}>
            {props.children}
        </button>
      </>
    );
}

PrimaryButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    tamano: PropTypes.string.isRequired,
    estilo: PropTypes.string.isRequired,
}