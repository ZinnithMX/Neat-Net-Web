import {useEffect, useState} from "react";
import PropTypes from "prop-types";


export default function NumerInput(props){

    const [value, setValue] = useState(0);
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
        setValue(value+1);
    }

    function less(){
        if(value > 0){
            setValue(value-1);
        }
    }

    function onChange(e){
        if(e.target.value === ""){
            setValue(0);
        }
        else{
            setValue(e.target.value);
        }
    }

    function handleClick(e) {
        e.target.select();
    }

    useEffect(() => {
        returnValue();
    }, [value]);

    function returnValue(){
        props.response({
            value: value,
            error: false
        })
    }

    return (
        <div className={"w-full bg-g-300 flex flex-row rounded-lg overflow-clip " + tamano}>
            <span className={"material-symbols-rounded  cursor-pointer text-n-200 icon " + padding + " " +
                "hover:text-p-700 hover:bg-g-400"} onClick={less}>arrow_drop_down</span>
            <input type="number"
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
    tamano: PropTypes.string.isRequired
}