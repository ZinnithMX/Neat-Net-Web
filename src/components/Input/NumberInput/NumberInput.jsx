import {useEffect, useState} from "react";
import PropTypes from "prop-types";


export default function NumerInput(props){

    const [value, setValue] = useState((props.valor !== undefined ? props.valor : 0));
    const [padding, setPadding] = useState("py-3 px-2");
    const [textSize, setTextSize] = useState("text-lg");
    const [tamano, setTamano] = useState("h-12");
    const [marginIcon, setMarginIcon] = useState("36px");

    useEffect(() => {

        switch (props.tamano) {
            case "normal": {
                setPadding("py-3 px-2");
                setTextSize("text-lg");
                setTamano("h-12");
                setMarginIcon("bottom-[36px]");
                break;
            }
            default: {
                setPadding("py-3 px-2");
                setTextSize("text-lg");
                setTamano("h-12");
                setMarginIcon("bottom-[36px]");
                break;
            }
            case "pequeno":{
                setPadding("py-2 px-2");
                setTextSize("text-xs");
                setTamano("h-10");
                setMarginIcon("bottom-[36px]");
                break;
            }

        }
    }, [props.tamano]);

    function add(){
        if(value < 2147483647){
            setValue(parseInt(value) + 1);
        }
    }

    function less(){
        if(value > 0){
            setValue(parseInt(value) - 1);
        }
    }

    function onChange(e){
        if(e.target.value === ""){
            setValue(0);
        }
        else{
            if(e.target.value > 2147483647){
                setValue(2147483647);
                return;
            }
            setValue(parseInt(e.target.value));
        }
    }

    function handleClick(e) {
        e.target.select();
    }

    useEffect(() => {
        props.response(value);
    }, [value]);



    return (
        <div className={"w-full bg-g-300 flex flex-row rounded-lg overflow-clip " + tamano + " " + props.width}>
            <span className={"material-symbols-rounded  cursor-pointer text-n-200 icon " + padding + " " +
                "hover:text-p-700 hover:bg-g-400"} onClick={less}>arrow_drop_down</span>
            <input type="number"
                   max={2147483647}
                   inputMode={"numeric"}
                   className={"w-full apperance-none bg-g-300 text-center " + textSize + " " + tamano}
                   onChange={onChange}
                   onClick={handleClick}
                   min={0}
                   value={value}/>
            <span className={"material-symbols-rounded  cursor-pointer text-n-200 icon " + padding + " " +
                "hover:text-p-700 hover:bg-g-400"} onClick={add}>arrow_drop_up</span>
        </div>
    )
}

NumerInput.propTypes = {
    response: PropTypes.func.isRequired,
    tamano: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    valor: PropTypes.number,
}