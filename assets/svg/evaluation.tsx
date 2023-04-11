import * as React from "react";
import Svg, { Path } from "react-native-svg";

const EvaluationIcon = (props:any) => (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M19.125 9.54169C18.8708 9.54169 18.6271 9.64265 18.4473 9.82238C18.2676 10.0021 18.1667 10.2459 18.1667 10.5C18.1781 12.295 17.5632 14.0378 16.4279 15.4282C15.2926 16.8186 13.708 17.7696 11.947 18.1174C10.186 18.4652 8.35886 18.1881 6.78022 17.3337C5.20158 16.4793 3.9703 15.1011 3.29843 13.4366C2.62656 11.7721 2.55617 9.92532 3.09938 8.21447C3.64259 6.50361 4.76539 5.03573 6.27442 4.06364C7.78344 3.09155 9.5842 2.6761 11.3666 2.88885C13.1489 3.1016 14.8013 3.92923 16.0392 5.22919H13.7392C13.485 5.22919 13.2412 5.33015 13.0615 5.50988C12.8818 5.6896 12.7808 5.93335 12.7808 6.18752C12.7808 6.44169 12.8818 6.68544 13.0615 6.86516C13.2412 7.04489 13.485 7.14585 13.7392 7.14585H18.0804C18.3346 7.14585 18.5783 7.04489 18.7581 6.86516C18.9378 6.68544 19.0387 6.44169 19.0387 6.18752V1.87502C19.0387 1.62085 18.9378 1.3771 18.7581 1.19738C18.5783 1.01765 18.3346 0.916687 18.0804 0.916687C17.8262 0.916687 17.5825 1.01765 17.4028 1.19738C17.223 1.3771 17.1221 1.62085 17.1221 1.87502V3.57127C15.5261 2.04566 13.4524 1.11789 11.2513 0.944794C9.05031 0.771696 6.85701 1.36389 5.04221 2.62126C3.2274 3.87864 1.90241 5.72408 1.2912 7.84562C0.679997 9.96716 0.820069 12.2347 1.68774 14.2649C2.55542 16.295 4.09747 17.9634 6.05323 18.9878C8.00899 20.0123 10.2585 20.33 12.4215 19.8874C14.5845 19.4447 16.5283 18.2687 17.9243 16.5583C19.3204 14.8479 20.083 12.7078 20.0833 10.5C20.0833 10.2459 19.9824 10.0021 19.8026 9.82238C19.6229 9.64265 19.3792 9.54169 19.125 9.54169Z"
            fill={props.fill}
        />
    </Svg>
);

export default EvaluationIcon;