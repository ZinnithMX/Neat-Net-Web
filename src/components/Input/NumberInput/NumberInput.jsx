import {useEffect, useState} from "react";
import PropTypes from "prop-types";


export default function NumerInput(props){

    const [value, setValue] = useState(0);

    function add(){
        setValue(value+1);
    }

    function less(){
        setValue(value-1);
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
                   value={value}/>
            <span className={"material-symbols-rounded py-3 px-2 cursor-pointer text-n-200 icon hover:text-p-700 hover:bg-g-400"} onClick={add}>arrow_drop_up</span>
        </div>
    )
}

NumerInput.propTypes = {
    response: PropTypes.func.isRequired
}