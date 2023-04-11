import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const MeetIcon = (props: SvgProps) => (
    <Svg
        width={props.width || 18}
        height={props.height || 14}
        viewBox="0 0 18 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M10.4583 0.75C11.9541 0.75 13.1667 1.96256 13.1667 3.45833V3.6025L16.3866 1.67083C16.8032 1.42072 17.3333 1.72078 17.3333 2.20667V11.7917C17.3333 12.2775 16.8033 12.5776 16.3867 12.3276L13.1667 10.3958V10.5417C13.1667 12.0374 11.9541 13.25 10.4583 13.25H3.37499C1.87921 13.25 0.666656 12.0374 0.666656 10.5417V3.45833C0.666656 1.96256 1.87921 0.75 3.37499 0.75H10.4583ZM10.4583 2H3.37499C2.56957 2 1.91666 2.65292 1.91666 3.45833V10.5417C1.91666 11.3471 2.56957 12 3.37499 12H10.4583C11.2637 12 11.9167 11.3471 11.9167 10.5417V3.45833C11.9167 2.65292 11.2637 2 10.4583 2ZM16.0833 3.31092L13.1667 5.06208V8.93783L16.0833 10.6878V3.31092Z"
            fill={props.hover ? "white" :  "#606A80"}
        />
    </Svg>
);

export default MeetIcon;