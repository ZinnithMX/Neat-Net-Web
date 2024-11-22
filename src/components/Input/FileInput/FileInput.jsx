import PropTypes from "prop-types";


export default function FileInput(props){

    return(
        <div className={""}>
            {props.showLabel && <div>
                <label>
                    {props.label}
                </label>
                <span className={"material-symbols-rounded "}>
                    Asterisk
                </span>
            </div>}
            <div>
                <div>
                    <span>

                    </span>
                    <p>
                        
                    </p>
                </div>
                <input type={"file"} className={"hidden"}/>
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