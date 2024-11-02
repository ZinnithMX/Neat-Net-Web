import PropTypes from "prop-types";
import {useState} from "react";


export default function CategorySelector(props) {
    const [icon, setIcon] = useState("arrow_drop_down");

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

    return (
        <div className={"flex flex-col items-end h-[52px]"}>
            <select
                className={"w-full rounded-lg bg-g-300 appearance-none text-lg font-light p-3"}
                title={props.title}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            >
                {props.children}
            </select>
            <span className={"material-symbols-rounded relative right-3 bottom-[36px]"}>{icon}</span>
        </div>
    );
}

CategorySelector.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    response: PropTypes.func.isRequired
}