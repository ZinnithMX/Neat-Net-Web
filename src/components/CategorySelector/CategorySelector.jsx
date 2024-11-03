import PropTypes from "prop-types";
import {useEffect, useState} from "react";


export default function CategorySelector(props) {
    const [icon, setIcon] = useState("arrow_drop_down");
    const [padding, setPadding] = useState("p-3");
    const [textSize, setTextSize] = useState("text-lg");
    const [tamano, setTamano] = useState("h-12");
    const [marginIcon, setMarginIcon] = useState("36px");

    function handleFocus() {
        setIcon("arrow_drop_up");
    }

    function handleBlur() {
        setIcon("arrow_drop_down");
    }

    function handleChange(e){

        const value = e.target.value;

        props.response({
            value: value,
            error: false
        })

    }

    useEffect(() => {
        switch (props.tamano) {
            case "normal": {
                setPadding("p-3");
                setTextSize("text-lg");
                setTamano("h-12");
                setMarginIcon("bottom-[36px]");
                break;
            }
            default: {
                setPadding("p-3");
                setTextSize("text-lg");
                setTamano("h-12");
                setMarginIcon("bottom-[36px]");
                break;
            }
            case "pequeno":{
                setPadding("py-3 px-3");
                setTextSize("text-xs");
                setTamano("h-10");
                setMarginIcon("bottom-[30px]");
                break;
            }

        }
    }, [props.tamano]);

    return (
        <div className={"flex flex-col items-end " + tamano}>
            <select
                className={"w-full rounded-lg bg-g-300 appearance-none font-light " + padding + " " + textSize + " "}
                title={props.title}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            >
                {props.children}
            </select>
            <span className={"material-symbols-rounded relative right-3 text-n-200 " +  marginIcon}>{icon}</span>
        </div>
    );
}

CategorySelector.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    response: PropTypes.func.isRequired,
    tamano: PropTypes.string.isRequired
}