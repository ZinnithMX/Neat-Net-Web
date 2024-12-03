import PropTypes from "prop-types";
import {useEffect, useRef, useState, ChangeEvent} from "react";


export default function FileInput(props){

    const fileInput = useRef(null);
    const [text, setText] = useState("Adjuntar archivo");

    useEffect(() => {
        setText("Adjuntar archivo (" + props.fileExtensions + ")");
    }, [props.fileExtensions]);

    const handleClick = () => {
        fileInput.current.click();
    }

    const onChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            props.setImage(file);
        }
    };

    return(
        <div className={"flex flex-col gap-2"}>
            {props.showLabel && <div className={"flex flex-row justify-between items-center"}>
                <label className={"w-full text-n-700 text-xl"}>
                    {props.label}
                </label>
                { props.required &&
                    <span className={"material-symbols-rounded text-er-700"}>
                        asterisk
                    </span>
                }
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
                <input type={"file"} className={"hidden"} ref={fileInput} required={props.required} accept={props.fileType}
                     onChange={onChange}/>
            </div>
        </div>
    )
}

FileInput.defaultProps = {
    showLabel: true,
    required: false
}

FileInput.propTypes = {

    showLabel: PropTypes.bool,
    label: PropTypes.string,
    required: PropTypes.bool,
    fileExtensions: PropTypes.string.isRequired,
    fileType: PropTypes.string.isRequired,
    setImage: PropTypes.func.isRequired

}
