import PropTypes from "prop-types";


export default function PrimaryButton(props){

    return(
      <>
        <button className={"bg-p-600 flex px-4 py-3.5 gap-2 text-lg " +
            "rounded-md font-semibold text-g-50 items-center justify-between flex-row h-[48px] cursor-pointer "+
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
    disabled: PropTypes.bool
}