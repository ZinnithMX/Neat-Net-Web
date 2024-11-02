import PropTypes from "prop-types";
import {useEffect, useState} from "react";


export default function Rating(props){

    const [rate,setRate] = useState(0);

    useEffect(() => {
        setRate(props.rating);
    }, [props.rating]);

    return(
        <div className={"flex flex-row gap-3 items-center"}>
            <p className={"m-0 p-0 text-lg"}>
                {props.rating}
                {props.rating%1}
            </p>
            <div className={"flex flex-row gap-2"}>
                {
                    Array.from({ length: 5 }, (_, i) => {
                        if (i < Math.floor(rate)) {
                            return (
                                <span key={i} className={"material-symbols-rounded text-s-700"}>star</span>
                            );
                        } else if (i < rate) {
                            return (
                                <span key={i} className={"material-symbols-rounded text-s-700"}>star_half</span>
                            );
                        } else {
                            return (
                                <span key={i} className={"material-symbols-rounded-outline text-s-700"}>star</span>
                            );
                        }
                    })
                }
            </div>
        </div>
    )
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired
}
