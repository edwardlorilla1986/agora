import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ActivitySidebar = (props: SvgProps) => (
    <Svg
        width={props.width || 24}
        height={props.height || 25}
        viewBox={`0 0 24 25`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        {props.focused ? <Path
            d="M8.30216 21.7537H15.6979C15.3995 23.5264 13.8575 24.8769 12 24.8769C10.1425 24.8769 8.60046 23.5264 8.30216 21.7537ZM12 0.50489C17.1776 0.50489 21.375 4.70221 21.375 9.87989V14.878L23.1479 18.8281C23.2165 18.981 23.252 19.1467 23.252 19.3144C23.252 19.9702 22.7204 20.5019 22.0645 20.5019H1.94024C1.773 20.5019 1.60766 20.4666 1.45502 20.3982C0.856437 20.1302 0.588412 19.4277 0.856387 18.8291L2.62501 14.8785L2.62514 9.86374L2.63066 9.55134C2.8045 4.51294 6.94485 0.50489 12 0.50489Z"
            fill={props.fill || "#113196"}
        /> : <Path
            d="M11.8437 0.125C6.71792 0.125 2.56251 4.28036 2.56251 9.40625V14.3591L0.573641 19.3361C0.446673 19.6538 0.485551 20.0138 0.677405 20.2971C0.869259 20.5804 1.18912 20.75 1.53125 20.75H7.71875C7.71875 23.036 9.55778 24.875 11.8437 24.875C14.1297 24.875 15.9687 23.036 15.9687 20.75H22.1562C22.4984 20.75 22.8182 20.5804 23.0101 20.2971C23.2019 20.0138 23.2408 19.6538 23.1139 19.3361L21.125 14.3591V9.40625C21.125 4.28036 16.9697 0.125 11.8437 0.125ZM13.9062 20.75C13.9062 21.8969 12.9906 22.8125 11.8437 22.8125C10.6969 22.8125 9.78125 21.8969 9.78125 20.75H13.9062ZM4.62501 9.40625C4.62501 5.41945 7.85694 2.1875 11.8437 2.1875C15.8306 2.1875 19.0625 5.41945 19.0625 9.40625V14.5575C19.0625 14.6886 19.0875 14.8186 19.1361 14.9402L20.6336 18.6875H3.0539L4.55138 14.9402C4.60002 14.8186 4.62501 14.6886 4.62501 14.5575V9.40625Z"
            fill="#808196"
        />}
    </Svg>
);

export default ActivitySidebar;