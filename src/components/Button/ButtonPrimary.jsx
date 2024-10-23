
export default function ButtonPrimary({children}, props) {
    return (
        <button className='p-3 bg-p-600 rounded-md text-g-50 h-10 justify-center items-center flex font-semibold text-xs gap-2'
        formAction={props.formAction}
        onClick={props.function}>
            {children}
        </button>
    )
}

