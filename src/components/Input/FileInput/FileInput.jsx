import PropTypes from "prop-types";
import {useRef, useState} from "react";


export default function FileInput(props){

    const fileInput = useRef(null);
    const text = useState("Adjuntar archivo")

    const handleClick = () => {
        fileInput.current.click();
    }

    return(
        <div className={"flex flex-col gap-2"}>
            {props.showLabel && <div className={"flex flex-row justify-between items-center"}>
                <label className={"w-full text-n-700 text-xl"}>
                    {props.label}
                </label>
                <span className={"material-symbols-rounded text-er-700"}>
                    asterisk
                </span>
            </div>}
            <div>
                <div className={"flex px-3 py-4 items-center gap-4 bg-g-300 rounded-lg cursor-pointer"} onClick={handleClick}>
                    <span className={"material-symbols-rounded "}>
                        upload
                    </span>
                    <p>
                        {text}
                    </p>
                </div>
                <input type={"file"} className={"hidden"} ref={fileInput} />
            </div>
        </div>
    )
}

FileInput.defaultProps = {
    showLabel: true,
    label: "Label"
}


FileInput.PropTypes = {

    showLabel: PropTypes.bool,
    label: PropTypes.string,

}