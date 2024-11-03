import {useEffect, useState} from "react";
import PropTypes from "prop-types";


export default function NumerInput(props){

    const [value, setValue] = useState(0);
    const [padding, setPadding] = useState("p-3");
    const [textSize, setTextSize] = useState("text-lg");
    const [tamano, setTamano] = useState("h-12");

    useEffect(() => {
        switch (props.tamano) {
            case "normal": {
                setPadding("p-3");
                setTextSize("text-lg");
                setTamano("h-10");
                break;
            }
            default: {
                setPadding("p-3");
                setTextSize("text-lg");
                setTamano("h-12");
                break;
            }
            case "pequeno":{
                setPadding("px-3 py-2");
                setTextSize("text-xs");
                setTamano("h-10");
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
        <div className="w-full bg-g-300 flex flex-row rounded-lg overflow-clip">
            <span className={"material-symbols-rounded py-3 px-2 cursor-pointer text-n-200 icon hover:text-p-700 hover:bg-g-400"} onClick={less}>arrow_drop_down</span>
            <input type="number"
                   className="w-full apperance-none bg-g-300 text-sm text-center"
                   onChange={onChange}
                   onClick={handleClick}
                   min={0}
                   value={value}/>
            <span className={"material-symbols-rounded py-3 px-2 cursor-pointer text-n-200 icon hover:text-p-700 hover:bg-g-400"} onClick={add}>arrow_drop_up</span>
        </div>
    )
}

NumerInput.propTypes = {
    response: PropTypes.func.isRequired,
    tamano: PropTypes.string.isRequired
}