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
            </p>
            <div className={"flex flex-row gap-2"}>
                {
                    Array.from({ length: 5 }, (_, i) => {
                        if (rate - i >= 0.5 && rate - i < 1) {
                            return (
                                <span key={i} className={"material-symbols-rounded icon text-s-700"}>star_half</span>
                            );
                        }
                        if (i < rate) {
                            return (
                                <span key={i} className={"material-symbols-rounded icon text-s-700"}>star</span>
                            );
                        }
                        else {
                            return (
                                <span key={i} className={"material-symbols-rounded icon-outline text-s-700"}>star</span>
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
