import PropTypes from "prop-types";


export default function PrimaryButton(props){

    return(
      <>
        <button className={"bg-p-600 flex p-3 gap-2 text-xs " +
            "rounded-md font-semibold text-g-50 items-center justify-center flex-row w-" +
            props.size + " " +
            "active:bg-p-700 active:shadow-none hover:shadow-lg hover:shadow-p-600/40 " }
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
    size: PropTypes.string.isRequired,
    disabled: PropTypes.bool
}